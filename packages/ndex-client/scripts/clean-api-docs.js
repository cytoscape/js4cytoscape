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
      // Escape problematic apostrophes in code blocks and inline code
      .replace(/`([^`]*)'([^`]*)`/g, '`$1\\\'$2`')
      // Fix JSX-like syntax that might conflict with MDX
      .replace(/<([a-zA-Z]+)([^>]*?)\/>/g, '\\<$1$2/\\>')
      // Escape unmatched angle brackets
      .replace(/(<)(?![a-zA-Z\/])/g, '\\<')
      .replace(/(?<![a-zA-Z\/])(>)/g, '\\>')
      // Fix table formatting issues
      .replace(/\|(\s*)<([^>]+)>(\s*)\|/g, '|$1\\<$2\\>$3|')
      // Escape curly braces that might be interpreted as JSX expressions
      .replace(/\{([^}]*)\}/g, '\\{$1\\}')
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