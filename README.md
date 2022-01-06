# js4cytoscape
Collection of JavaScript libraries and utilities for calling Cytoscape Automation via CyREST

## Quick Start
To build this repository, please run the following commands:


```
git@github.com:cytoscape/js4cytoscape.git
cd js4cytoscape
git checkout develop
npx lerna bootstrap
```

This creates new builds of all packages in your local repository.  To use it for development, please link those using ```npm link``` command.

## js4cytoscape monoropo
This monorepo was derived from the following repositories:

1. js4cytoscape: https://github.com/cytoscape/js4cytoscape/tree/main/packages/js4cytoscape
2. cx-viz-converter: https://github.com/cytoscape/js4cytoscape/tree/main/packages/cx-viz-converter
3. ndex-js-client: https://github.com/cytoscape/js4cytoscape/tree/main/packages/ndex-js-client
4. cx2js: https://github.com/cytoscape/js4cytoscape/tree/main/packages/cx2js
5. cyannotation-cx2js: https://github.com/cytoscape/js4cytoscape/tree/main/packages/cyannotation-cx2js

Each of these can be installed indivudually by running ```npm install --save``` in the package directory.


### js4cytoscape demo

#### To run this demo ***online***:
1. Make sure Cytoscape is installed and running.
2. Launch index.html via githack: https://raw.githack.com/cytoscape/js4cytoscape/main/packages/js4cytoscape/index.html


### Related Libraries
Cytoscape.js: https://github.com/cytoscape/cytoscape.js


