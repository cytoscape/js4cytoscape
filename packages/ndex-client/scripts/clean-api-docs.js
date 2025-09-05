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
    
    // First, do global fixes for the most problematic patterns
    content = content
      // Convert complex TypeScript types in tables to simpler format
      .replace(/\|([^|]*)`([^`]*``[^`]*)`([^|]*)\|/g, '|$1**$2**$3|')
      // Fix double backticks that cause parsing issues
      .replace(/``([^`]+)``/g, '"$1"')
      // Remove backslashes that are causing issues
      .replace(/\\(\{|\})/g, '$1')
      // Convert problematic inline code in table cells to bold text
      .replace(/\|([^|]*)`([^`]*[\{\}\\|&][^`]*)`([^|]*)\|/g, '|$1**$2**$3|')
      // Clean up remaining backslashes in tables
      .replace(/\|([^|]*)\\([^|]*)\|/g, '|$1$2|');
    
    // Split content into lines for easier processing
    let lines = content.split('\n');
    let inCodeBlock = false;
    let inTable = false;
    
    lines = lines.map((line, index) => {
      // Track code block state
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
        } else {
          inCodeBlock = false;
        }
        return line;
      }
      
      // Skip processing inside code blocks
      if (inCodeBlock) {
        return line;
      }
      
      // Detect table lines
      inTable = line.includes('|') && (line.includes(':------') || line.trim().startsWith('|'));
      
      let processedLine = line;
      
      // For table lines, be extra aggressive about cleaning
      if (inTable) {
        processedLine = processedLine
          // Remove all remaining backticks in table cells
          .replace(/\|([^|]*)`([^`]*)`([^|]*)\|/g, '|$1**$2**$3|')
          // Clean up any remaining complex characters
          .replace(/[\{\}]/g, '')
          .replace(/\\/g, '')
          .replace(/&lt;|&gt;/g, '');
      } else {
        // For non-table lines, do gentler processing
        processedLine = processedLine
          // Escape curly braces that might be JSX expressions
          .replace(/\{/g, '\\{')
          .replace(/\}/g, '\\}')
          // Convert angle brackets to entities
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      
      return processedLine;
    });
    
    content = lines.join('\n');
    
    // Add frontmatter if missing
    if (!content.startsWith('---\n')) {
      content = '---\nsidebar_position: 1\n---\n\n' + content;
    }

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