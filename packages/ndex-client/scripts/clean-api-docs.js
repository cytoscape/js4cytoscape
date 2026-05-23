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
    
    // Extract and protect code blocks and code fences first
    const codeBlocks = [];
    let codeBlockIndex = 0;
    
    // Protect multi-line code fences first
    content = content.replace(/```[\s\S]*?```/g, (match) => {
      const placeholder = `__CODE_FENCE_${codeBlockIndex}__`;
      codeBlocks[codeBlockIndex] = match;
      codeBlockIndex++;
      return placeholder;
    });
    
    // Then protect inline code blocks
    content = content.replace(/`([^`\n]+)`/g, (match) => {
      const placeholder = `__CODE_BLOCK_${codeBlockIndex}__`;
      codeBlocks[codeBlockIndex] = match;
      codeBlockIndex++;
      return placeholder;
    });
    
    // Minimal cleaning approach - preserve markdown syntax and avoid over-escaping
    content = content
      // Fix the specific problematic lines that are causing MDX parsing errors
      .replace(/Filtering operation: '>' \\?\| '<' \\?\| '=' \\?\| '!='\s*\|/g, 'Filtering operation: `>`, `<`, `=`, `!=` |')
      .replace(/: 'asc' \\?\| 'desc'/g, ': `asc`, `desc`')
      .replace(/: 'PUBLIC' \\?\| 'PRIVATE'/g, ': `PUBLIC`, `PRIVATE`')
      .replace(/: 'cx' \\?\| 'cx2'/g, ': `cx`, `cx2`')
      // Fix template literal expressions that break JSX parsing
      .replace(/\$\{([^}]*)\}/g, '\\$\\{$1\\}')
      // Fix problematic curly braces that break JSX parsing in non-code contexts  
      .replace(/(\bwith \{[^}]*\} parameter)/g, (match) => match.replace(/{([^}]*)}/g, '\\{$1\\}'))
      // Clean up excessive whitespace
      .replace(/\n\n\n+/g, '\n\n')
      .replace(/^\s+$/gm, '')
      // Fix broken links format
      .replace(/\]\(\s*([^)]+)\s*\)/g, ']($1)')
      // Ensure proper spacing around headers
      .replace(/^(#+)\s*/gm, '$1 ')
      .replace(/^(#{1,6})\s+(.+)$/gm, '$1 $2');
    
    // Restore code blocks
    codeBlocks.forEach((block, index) => {
      content = content.replace(`__CODE_FENCE_${index}__`, block);
      content = content.replace(`__CODE_BLOCK_${index}__`, block);
    });
    
    // Add frontmatter if not present
    if (!content.startsWith('---\n')) {
      // Set sidebar_position to 999 for index.md to put it at the bottom
      const sidebarPosition = path.basename(filePath) === 'index.md' ? 999 : 1;
      content = `---\nsidebar_position: ${sidebarPosition}\n---\n\n` + content;
    } else {
      // Update existing frontmatter for index.md
      if (path.basename(filePath) === 'index.md') {
        content = content.replace(/^sidebar_position:\s*\d+$/m, 'sidebar_position: 999');
      }
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