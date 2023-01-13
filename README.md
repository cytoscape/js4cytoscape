# js4cytoscape
js4cytoscape is a collection of JavaScript / TypeScript libraries for processing [CX](), accessing [NDEx API](), and calling [Cytoscape Desktop]() Automation via CyREST. These libraries are maintained by the Cytoscape Core Developer team.

## Project List
This monorepo was derived from the following repositories:

- [js4cytoscape](https://github.com/cytoscape/js4cytoscape/tree/main/packages/js4cytoscape)
- [cx-viz-converter](https://github.com/cytoscape/js4cytoscape/tree/main/packages/cx-viz-converter)
- [ndex-client](https://github.com/cytoscape/js4cytoscape/tree/main/packages/ndex-client)
- [cx2js](https://github.com/cytoscape/js4cytoscape/tree/main/packages/cx2js)
- [cyannotation-cx2js](https://github.com/cytoscape/js4cytoscape/tree/main/packages/cyannotation-cx2js)

All of the above are now in archived and all new features and bug fixes will be available from here.

## How to use
The latest versions of these libraries are available in the following npm repository:

https://www.npmjs.com/org/js4cytoscape

For html users, add this to the `<head>` of your page (specify version `@#.#.#` or remove to get latest):

```<script src="https://unpkg.com/@js4cytoscape/js4cytoscape@#.#.#/dist/main.js"></script>```

For npm users:

```npm install @js4cytoscape/PACKAGE-NAME```

For yarn users:

```yarn add @js4cytoscape/PACKAGE-NAME```

Please read the documents in each package directory (TBD)

## Quick Start Guide for Developers

This repository uses NPM and its [Workspace](https://docs.npmjs.com/cli/v8/using-npm/workspaces) and you need to follow these rules to avoid accidentally add unnecessary dependencies and _package-lock.json_ files.


## Build the entire 
To build the latest versions, please run the following commands:

```
git@github.com:cytoscape/js4cytoscape.git
cd js4cytoscape
git checkout develop
npm install
npm run build --workspaces
```

This creates new builds of all packages in your local directory.  To use these builds for development, please link those using ```npm link``` command.

### Adding a new dependency

#### Dev Dependencies

All dev-dependencies should be added to the project root. To add a new dev-dependency, run the following command **in the root directory**:

```npm install PACKAGE-NAME --save-dev```

#### Dependencies for a specific sub-project

If you need to add a new dependency to a specific sub-project, you should run:

```npm install PACKAGE-NAME -w packages/SUBPROJECT-NAME```

