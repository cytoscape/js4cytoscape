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
    
    // This is a radical approach - convert all TypeDoc files to plain text
    // to eliminate ALL MDX parsing issues
    
    // Extract code blocks first
    const codeBlocks = [];
    let codeBlockIndex = 0;
    content = content.replace(/```[\s\S]*?```/g, (match) => {
      const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
      codeBlocks[codeBlockIndex] = match;
      codeBlockIndex++;
      return placeholder;
    });
    
    // Completely sanitize everything else
    content = content
      // Remove ALL special characters that cause MDX issues
      .replace(/[`{}[\]<>\\|]/g, '')
      // Replace problematic punctuation
      .replace(/:/g, ' - ')
      .replace(/;/g, ', ')
      // Clean up excessive whitespace
      .replace(/\s+/g, ' ')
      .replace(/^\s+/gm, '')
      .replace(/\s+$/gm, '')
      // Fix line breaks
      .replace(/ - \s*/g, '\n\n**')
      .replace(/\*\*\s*\*\*/g, '**')
      // Add proper paragraph breaks
      .replace(/(\w)\s+([A-Z][a-z])/g, '$1\n\n$2')
      // Clean up markdown formatting
      .replace(/\*\*\*+/g, '**')
      .replace(/\*\* \*\*/g, '**')
      // Make headers more readable
      .replace(/^([A-Z][A-Za-z\s]+)$/gm, '## $1')
      .replace(/^## ## /gm, '## ');
    
    // Restore code blocks
    codeBlocks.forEach((block, index) => {
      content = content.replace(`__CODE_BLOCK_${index}__`, '\n\n' + block + '\n\n');
    });
    
    // Add frontmatter
    if (!content.startsWith('---\n')) {
      content = '---\nsidebar_position: 1\n---\n\n' + content;
    }
    
    // Ensure proper line endings
    content = content.replace(/\n\n\n+/g, '\n\n').trim() + '\n';

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