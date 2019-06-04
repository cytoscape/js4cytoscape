To run, first install the necessary modules:
```
$ npm install fs
$ npm link ../../.
```

Then run via the following:

```
$ node convertcx2js.js network.cx
```

This will produce several files in the ```results``` directory, containing the nicecx conversion and usable Cytoscape.js json elements, style, and layout.

```
network.elements.json
network.layout.json
network.nicecx.json
network.style.json
```
