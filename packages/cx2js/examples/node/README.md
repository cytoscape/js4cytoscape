To run, first install the necessary modules:
```
$ npm install fs
$ npm link ../../../../.
```

If the ```results``` directory doesn't exists, create it first and then run the following:

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
