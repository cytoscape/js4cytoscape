#!/usr/bin/env node

/**
 * Post-process TypeDoc generated markdown files to make them compatible with Docusaurus MDX
 */

const fs = require('fs');
const path = require('path');

const API_DOCS_DIR = path.join(__dirname, '..', 'docs-site', 'docs', 'api');

function cleanMarkdownFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix common MDX parsing issues
    content = content
      // First, wrap the entire content in a code-friendly way
      // Convert code blocks to safer format
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const cleanCode = code
          .replace(/'/g, "\\'")
          .replace(/\{/g, "\\{")
          .replace(/\}/g, "\\}")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return '```' + (lang || '') + '\n' + cleanCode + '```';
      })
      // Fix inline code with problematic characters
      .replace(/`([^`]*['{}<>][^`]*)`/g, (match, code) => {
        const cleanCode = code
          .replace(/'/g, "\\'")
          .replace(/\{/g, "\\{")
          .replace(/\}/g, "\\}")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        return '`' + cleanCode + '`';
      })
      // Escape standalone curly braces outside of code blocks
      .replace(/(?<!`[^`]*)\{(?![^`]*`)/g, '\\{')
      .replace(/(?<!`[^`]*)\}(?![^`]*`)/g, '\\}')
      // Escape standalone angle brackets outside of code blocks  
      .replace(/(?<!`[^`]*)<(?![^`]*`)/g, '&lt;')
      .replace(/(?<!`[^`]*)(>)(?![^`]*`)/g, '&gt;')
      // Fix table cells with angle brackets
      .replace(/\|([^|]*)<([^|>]*)>([^|]*)\|/g, '|$1&lt;$2&gt;$3|')
      // Escape apostrophes in plain text (not in code)
      .replace(/(?<!`[^`]*)'(?![^`]*`)/g, "\\'")
      // Add frontmatter if missing
      .replace(/^(?!---\n)/, '---\nsidebar_position: 1\n---\n\n');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Cleaned ${path.relative(API_DOCS_DIR, filePath)}`);
  } catch (error) {
    console.error(`✗ Failed to clean ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.isFile() && file.name.endsWith('.md')) {
      cleanMarkdownFile(fullPath);
    }
  }
}

// Main execution
if (fs.existsSync(API_DOCS_DIR)) {
  console.log('Cleaning API documentation files for Docusaurus compatibility...');
  processDirectory(API_DOCS_DIR);
  console.log('✓ API documentation cleanup complete!');
} else {
  console.log('API documentation directory not found. Skipping cleanup.');
}