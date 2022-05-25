# js4cytoscape
A JavaScript library for calling Cytoscape Automation via CyREST

## Notebooks
This [collection of JS notebooks](https://cytoscape.org/javascript-notebooks/) allows you to interact and control your local instance of Cytoscape Desktop. It facilitates the use of the js4cytoscape library for Cytoscape automation via CyREST. Explore the collection or deploy your own JS notebooks.

## Web developers
In order to use js4cytoscape, you can implement notebooks in the collection above by making pull requests to the [javascript-notebooks repo](https://github.com/cytoscape/javascript-notebooks), or add the following to the `<head>` of your own web page:
```
<link rel="stylesheet" href="https://cytoscape.org/javascript-notebooks/js4cytoscape-style.css">
<script src="https://unpkg.com/js4cytoscape/dist/main.js"></script>
<script src="https://unpkg.com/cytoscape@3.6.0/dist/cytoscape.min.js"></script>  
```
  
These resources grant access to a [custom style sheet](https://cytoscape.org/javascript-notebooks/js4cytoscape-style.css) designed for js4cytoscape, plus the js library (this repo) as well as [cytoscape.js](https://js.cytoscape.org/) for embedding an interactive network widget into your site.
  
If you want your webpage to work in Cytoscape's built-in browser, CyBrowser, then you will also want to add this `cyBrowserCheck()` function and call it with either `window.onload` or `$(document).ready()`:
  
```
  var inCyBrowser = false;
  
  function cyBrowserCheck() {
    if(!window.navigator.userAgent.includes('CyBrowser')){
		var divs = document.getElementsByClassName("cybrowser")
		for (var i=0;i<divs.length;i++){
			divs[i].style.display = "none";
		}
	} else {
        inCyBrowser = true;
		var divs = document.getElementsByClassName("not-cybrowser")
		for (var i=0;i<divs.length;i++){
			divs[i].style.display = "none";
		}
	}
}
```
This code sets a global variable `inCyBrowser` that js4cytoscape will respond to when executing commands. *Note that CyBrowser only support CyCommands and not CyREST calls, so only a subset of js4cytoscape functions are available.*
  
## Library developers
This library follows the conventions established by the RCy3 package, please refer to it when naming functions, paramaters and files.

If you add or rename src files, be sure to update [webpack.config.js](https://github.com/cytoscape/js4cytoscape/blob/main/packages/js4cytoscape/webpack.config.js#L14).


