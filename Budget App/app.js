// BUDGET CONTROLLER
var budgetController = (function(){
    var incomeList = [];
    var expenseList = [];
    var totalValue = 0;

    var budgetAddItem = function(item){
        console.log(item.type);
        console.log(item.desc);
        console.log(item.value);
    };
})();

// UI CONTROLLER
var UIController = (function(){
    return {
        getInput: function(){
            return{
                type: document.querySelector('.inputType').value,
                desc: document.querySelector('.inputDesc').textContent,
                value: document.querySelector('.inputValue').value
            }
        }
    }
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function() {
        console.log("Button was clicked!");

        // Get input data
        var data = UICtrl.getInput();
        
        // add item to budget controller
        
        budgetCtrl.budgetAddItem(data);
        // add item to UI

        // calculate new budget total

        // display budget on UI
    };
    document.querySelector('.btn_add').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);