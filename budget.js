var budgetController = (function() {

	var x = 25;

	var add = function(a) {
		return x + a;
	}

	return {
		publicTest: function(b) {
			console.log(add(b));
			return add(b)
		}
	}

})();

// create UI controller module
var UIController = (function() {

})();

// create this module to enable UIController and budgetController to 
// interact and know about each other
var controller = (function(budgetCtrl, UICtrl){

	var test = budgetCtrl.publicTest(5);

	// returns an object so we can use the data inside
	return {
		publicTest2: function() {
			console.log(test);
			return test;
		}
	}

})(budgetController, UIController);















