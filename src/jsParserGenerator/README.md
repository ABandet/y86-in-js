# hcl2js compiler

It aims to provide a JavaScript compiler from HCL (Hardware Control Language) to vanilla JS.

# Installation

The compiler uses the node library [jison](https://github.com/zaach/jison).
You can install it using the following command :

```
npm install jison -g
```

# Usage

To create the parser :

```
jison hcl2jsParser.jison
```

It will generate the parser js file, named **hcl2jsParser.js**. An example is provided in **test/index.html**

In order to use it from the web browser, you have to include the parser and an utility script :

```html
<!-- The generated parser -->
<script src="js/hcl2jsParser.js"></script>

<!-- Overlayer on hcl2js parser-->
<script src="js/hcl2jsUtility.js"></script>
```

From this scripts, you'll be able to call the ```hcl2js(hclCode) -> jsCode``` function. If an error occurs during compiltion, an exception with the error is thrown.