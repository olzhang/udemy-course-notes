'use strict';


// add ; incase the code above doesn't have ;
; (function(global, $) {

	// generates an object
	// G$(fn, ln, lang)
	
	var Greetr = function(fn, ln, lang) {

		return new Greetr.init(fn, ln, lang);
	}

	var greetings = {
		'en': 'Hello',
		'es': 'Hola'
	};

	var formalGreetings = {
		'en': 'Greetings',
		'es': 'Salutos'
	};

	var supportedLangs = ['en', 'es'];

	var logMessages = {
		'en': 'Logged in',
		'es': 'Inicio sesion'
	}

	Greetr.init = function(fn, ln, lang) {

		fn = fn || 'default';
		ln = ln || 'default';
		lang = lang || 'en';

		var self = this;

		self.fn = fn;
		self.ln = ln;
		self.lang = lang;
	};

	// remeber that all objects created with Greetr.init will have their proto pointing to Greetr.init.prototype but to sabe some typing we can gete it to point to Greetr.prototype
	
	Greetr.prototype = {

		fullName: function() {
			return this.fn + ' ' + this.ln;
		},

		validateLang: function() {
			if(supportedLangs.indexOf(this.lang) === -1) {
				throw 'language not supported';
			};
		},

		greeting: function() {
			return greetings[this.lang] + ' ' + this.fn;
		},

		formalGreeting: function() {
			return formalGreetings[this.lang] + ' ' + this.fullName();
		},

		greet: function(formal) {
			var msg;

			if(formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			if(console) {
				console.log(msg);
			}

			return this; //makes it chainable
		},

		log: function(msg) {
			if(console)
				console.log(logMessages[this.lang] + ': ' + this.fullName());

			return this;
		},

		setLang: function(lang) {
			this.lang = lang;

			this.validateLang(lang);

			return this;
		}	
	};

	Greetr.init.prototype = Greetr.prototype;

	//adds Greetr to window
	//
	global.Greetr = global.G$ = Greetr;

}(window, $))