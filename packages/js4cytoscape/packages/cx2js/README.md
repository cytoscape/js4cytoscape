# cytoscape-cx2js

Convert CX JSON to cytoscape.js.
Does not handle conversion of Cytoscape Desktop Annotations. To convert Cytoscape Desktop Annotations to cytoscape.js, see [cyannotation-cx2js](https://github.com/cytoscape/cyannotation-cx2js).

For CX2 support, see [cx-viz-converter](https://github.com/cytoscape/cx-viz-converter).

## Run targets

- `npm run build` : build project
- `npm run build-prod` : build the project for production
- `npm run clean` : clean the project
- `npm run watch` : watch mode (debug mode enabled, autorebuild, autoreload)
- `npm test` : run tests
- `npm run lint` : lint the project

## Testing

All files `/test` will be run by [Mocha](https://mochajs.org/). You can `npm test` to run all tests, or you can run `mocha -g specific-test-name` (prerequisite: `npm install -g mocha`) to run specific tests.

[Chai](http://chaijs.com/) is included to make the tests easier to read and write.

## Publishing a release

1. Make sure the tests are passing: `npm test`
1. Make sure the linting is passing: `npm run lint`
1. Bump the version number with `npm version`, in accordance with [semver](http://semver.org/). The `version` command in `npm` updates both `package.json` and git tags, but note that it uses a `v` prefix on the tags (e.g. `v1.2.3`).
1. For a bug fix / patch release, run `npm version patch`.
1. For a new feature release, run `npm version minor`.
1. For a breaking API change, run `npm version major.`
1. For a specific version number (e.g. 1.2.3), run `npm version 1.2.3`.
1. Push the release: `git push origin --tags`
1. Publish to npm: `npm publish .`
