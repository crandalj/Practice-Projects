// BUDGET CONTROLLER
var budgetController = (function(){
    // Code
})();

// UI CONTROLLER
var UIController = (function(){
    // Code
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    document.querySelector('.add_btn').addEventListener('click', function(){
        console.log("Button was clicked!");
    });

})(budgetController, UIController);