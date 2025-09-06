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
    
    // Minimal cleaning approach - preserve markdown syntax but fix MDX compatibility issues
    content = content
      // Fix JSX-style tags that might conflict with MDX
      .replace(/<(\w+)>/g, '\\<$1\\>')
      .replace(/<\/(\w+)>/g, '\\</$1\\>')
      // Fix curly braces that might be interpreted as JSX expressions
      .replace(/\{([^}]+)\}/g, '\\{$1\\}')
      // Clean up excessive whitespace
      .replace(/\n\n\n+/g, '\n\n')
      .replace(/^\s+$/gm, '')
      // Fix broken links format
      .replace(/\]\(\s*([^)]+)\s*\)/g, ']($1)')
      // Ensure proper spacing around headers
      .replace(/^(#+)\s*/gm, '$1 ')
      .replace(/^(#{1,6})\s+(.+)$/gm, '$1 $2');
    
    // Add frontmatter if not present
    if (!content.startsWith('---\n')) {
      content = '---\nsidebar_position: 1\n---\n\n' + content;
    }
    
    // Ensure proper line endings
    content = content.trim() + '\n';

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