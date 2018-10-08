## JavaScript: Understanding the Weird Parts

### EXECUTION CONTEXTS AND LEXICAL ENVIRONMENTS

#### Conceptual Aside: Syntax Parsers, Execution Contexts, and Lexical Environments
- syntax parser: reads code and tells if the programming is valid
- lexical environment: where you write something 
- execution context: which lexical environment is currently running

#### The Global Environment and The Global Object
- global execution context: global object creates `this` or window in browser 
- global: not inside a function
- global execution context in created in 2 phases:
	1. creation phase: global object, this, outer environment. Parser runs through your code and sets memory aside for variables and functions (i.e. HOISTING). But no assignments are set. 
		- ALL variables in javascript are set to undefined initially and all functions are set in its entirety
	2. execution phase: executes code line by line

#### Conceptual Aside: Javascript and 'undefined'
- undefined: a special value in javascript meaning that the value of something is not set
- not defined: an error that says there is no memory space set for a variable 
- undefined takes up memory space. So, never do this: `var a = undefined`
- so undefined just means i never set this value

#### Conceptual Aside: Single Threaded, Synchronous Execution
what will happen with this:

```javascript
function b() {

}
           
function a() {                    
 b();
}

// 1. global execution will be created in 2 phases:
//	- creation phase: creates this, window, hoisting
//	- execution phase: runs line by line 
// 2. in the execution phase:
//	-  creates another execution context (goes through the two phases) which goes through and puts it  on the execution stack for a()
// 3. in a()'s execution phase, b() will be invoked and that will create another execution context for b() and another execution context will be placed ontop of the execution stack
// 4. when b() is finished, it gets popped off the stack
// 5. where the code gets placed doesn't alter what is actively executed because everything is already setup in the creation phase 
```

#### Functions, Context, and Variable Environments
- variable environment: where the var lives and how they relate to each other in memory
- what is the value of `myVar`?
```javascript
function b() {    // 1. myVar is created in the global execution context and set to 1
    var myVar;    
}                 // 2. myVar is created in a() execution context and is set to 2
function a() {    // 3. myVar is created in b() "   " and set to undefined
    var myVar = 2;
    b();
}
var myVar = 1;      // - scope: where are we able to see the variable
a();
```






