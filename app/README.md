# y86 simulator

This projects aims to improve the y86 web simulator used at *Université de Bordeaux*. In addition of the [current features](https://dept-info.labri.fr/ENSEIGNEMENT/archi/js-y86/index.html), we would implement :

 * Processor state view
 * HCL management
 * Add / Edit / Remove instructions

 ## Installation

 You can install a part of the dependecnies using 
 
 ```bash
npm install
 ```

You'll also need [TypeScript](https://www.typescriptlang.org/index.html), to build a part of the application, [Jison](https://zaa.ch/jison/docs/) to generate the HCL parser and [Browserify](http://browserify.org/) to bundle the JavaScript files on the client side.

Note that if you do not edit the HCL grammar, the parser will not have to be generated again and then you will not have to use **jison**.

```bash
# TypeScript
npm install typescript -g

# Browserify
npm install browserify -g

# Jison -- if you need to rebuild the parser
npm install jison -g
```

### Build sources

In order to generate js files from typescript files, use :

```bash
tsc -p src
```

Generated files will be located at **js/**

### Bundle sources

In order to use the app on the browser, we'll have to bundle all the js files using :

```bash
browserify js/index.js -o js/app.js
```

The **index.html** will only load the **app.js** script.

### Build the HCL parser

The parser is described in **js/hcl/parser/hcl2jsParser.jison**. To build the js parser, use :

```bash
jison js/hcl/parser/hcl2jsParser.jison -o js/hcl/hcl2jsParser.js
```

The generated HCL parser can be tried as a standalone on the **js/hcl/parser/index.html** webpage.

## Tests

To run unit tests, launch : 

```bash
npm test
```