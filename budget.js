
// keeps track of all income, expenses, budget and precentages
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description. description;
		this.value = value;
	}

	var Incone = function(id, description, value) {
		this.id = id;
		this.description. description;
		this.value = value;
	}


	var data = {

		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}

	};

})();

// create UI controller module
var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn"
	};

    // make the retrieved input values public
    return {
    	getInput: function() {
	    	return {
	    		// either inc or exp
	    		type: document.querySelector(DOMstrings.inputType).value,
	    		description: $(DOMstrings.inputDescription).val(),
	    		value: $(DOMstrings.inputValue).val()
	    	};
    	},

    	// expose DOMstrings to be public
    	getDOMstrings: function() {
    		return DOMstrings;
    	}
    };

})();

// create this module to enable UIController and budgetController to 
// interact and know about each other
// Global app controller
var controller = (function(budgetCtrl, UICtrl) {

	var setupEventListeners = function() {

		var DOM = UICtrl.getDOMstrings();

		$(document).keypress(function (event) {
    		if (event.key === "Enter" || event.which === 13) {
        	// alert('enter key is pressed');
        		ctrllAddItem();
    		}
		});

		$(DOM.inputBtn).click(ctrllAddItem);

	};

	var ctrllAddItem = function() {
		// get field input data
		var input = UICtrl.getInput();
		console.log("testing for " + input);
		// add the item to the budget controller

		// add the new item to the user interface 

		// calculate the budget

		// displa the budget on the UI
		alert(input.value + " " + input.description + " " + input.type);
	};


	return {
		init: function() {
			console.log("Application has started");
			setupEventListeners();
		}
	};

})(budgetController, UIController);

controller.init();






















// var controller = (function(budgetCtrl, UICtrl){

// 	var test = budgetCtrl.publicTest(5);

// 	// returns an object so we can use the data inside
// 	return {
// 		publicTest2: function() {
// 			console.log(test);
// 			return test;
// 		}
// 	}

// })(budgetController, UIController);




