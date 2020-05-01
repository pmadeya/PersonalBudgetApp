
// keeps track of all income, expenses, budget and precentages
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
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

	// allow other modules to add an item into our data structure
	return {
		addItem: function(type, des, val) {
			var newItem, id;

			// unique number we want to assign to each new item that
			// we put in either the expense or income arrays for all items
			if (data.allItems[type].length > 0) {
				var lastElement = data.allItems[type].length - 1
				id = data.allItems[type][lastElement].id + 1;
			} else {
				id = 0;
			}

			// create new item based on inc or exp type
			if (type === "exp") {
				newItem = new Expense(id, des, val);
			} else if (type === "inc") {
				newItem = new Income(id, des, val);
			}

			// push into our data structure
			// similar to data.allItems.exp.push(newItem);
			data.allItems[type].push(newItem);
			// return the new item so that the other function that will call this method
			// has direct access to the item created here
			return newItem;
		},

		testing: function () {
			console.log(data.allItems.exp[0].description);
			alert(data.allItems.exp[0].description);
			return data;
		}
	};

})();

///////// ---------------------------------------------------------------- ////////////
// create UI controller module
var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: ".add__description",
		inputValue: ".add__value",
		inputBtn: ".add__btn",
		incomeContainer: ".income__list",
		expensesContainer: ".expenses__list"
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

    	addListItem: function(obj, type) {
    		var html, newHtml, element;
    		// Create HTML string with placeholder text
    		if (type === 'inc') {
    			element = DOMstrings.incomeContainer;
    			html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
    		} else if (type === 'exp') {
    			element = DOMstrings.expensesContainer;
    			html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
    		}
    		
    		// replace placeholder text with some actual data
    		newHtml = html.replace('%id%', obj.id);
    		newHtml = newHtml.replace('%description%', obj.description);
    		newHtml = newHtml.replace('%value%', obj.value);

    		// insert the HTML into the DOM
    		document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    	},

    	// expose DOMstrings to be public
    	getDOMstrings: function() {
    		return DOMstrings;
    	}
    };

})();

///////// ---------------------------------------------------------------- ////////////
// create this module to enable UIController and budgetController to 
// interact and know about each other
// Global app controller
var controller = (function(budgetCtrl, UICtrl) {



	var setupEventListeners = function() {

		var DOM = UICtrl.getDOMstrings();

		$(document).keypress(function (event) {
    		if (event.key === "Enter" || event.which === 13) {
        	// alert('enter key is pressed');
        		ctrlAddItem();
    		}
		});

		$(DOM.inputBtn).click(ctrlAddItem);

	};

	var ctrlAddItem = function() {
		var value, description, type, newItem, input;
		// get field input data
		input = UICtrl.getInput();
		
		value = input.value;
		description = input.description;
		type = input.type;

		newItem = budgetCtrl.addItem(type, description, value);
		console.log("testing for " + input);
		// add the item to the budget controller

		// add the new item to the user interface 
		UICtrl.addListItem(newItem, type);
		// calculate the budget

		// display the budget on the UI
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




