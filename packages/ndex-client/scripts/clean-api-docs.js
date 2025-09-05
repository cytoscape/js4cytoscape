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
    
    // Split content into lines for easier processing
    let lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockDelimiter = '';
    
    lines = lines.map((line, index) => {
      // Track code block state
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockDelimiter = line;
        } else if (line === '```' || line.startsWith('```')) {
          inCodeBlock = false;
          codeBlockDelimiter = '';
        }
        return line;
      }
      
      // Skip processing inside code blocks
      if (inCodeBlock) {
        return line;
      }
      
      // Process non-code lines
      let processedLine = line;
      
      // Handle inline code first - protect it
      const codeSegments = [];
      let codeIndex = 0;
      
      // Extract inline code to protect it
      processedLine = processedLine.replace(/`([^`]+)`/g, (match, code) => {
        const placeholder = `__CODE_SEGMENT_${codeIndex}__`;
        codeSegments[codeIndex] = '`' + code + '`';
        codeIndex++;
        return placeholder;
      });
      
      // Now safely process the rest of the line
      processedLine = processedLine
        // Escape curly braces that might be JSX expressions
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        // Escape angle brackets  
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Escape apostrophes
        .replace(/'/g, "\\'")
        // Fix common TypeScript/JSDoc patterns
        .replace(/\\\{([^}]*)\\\}/g, '\\{$1\\}'); // Keep already escaped
      
      // Restore inline code segments
      codeSegments.forEach((segment, idx) => {
        processedLine = processedLine.replace(`__CODE_SEGMENT_${idx}__`, segment);
      });
      
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