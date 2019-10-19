// BUDGET CONTROLLER
var budgetController = (function(){
    var income = 0.00;
    var expense = 0.00;
    var budget = 0.00;

    return{
        budgetAddItem: function(item){
            if(item.type == "+"){
                income = parseFloat(Math.round((parseFloat(income) + parseFloat(item.value)) * 100) / 100).toFixed(2);
            } else {
                expense = parseFloat(Math.round((expense - item.value) * 100)/100).toFixed(2);
            }
            budget = parseFloat(Math.round((parseFloat(income) + parseFloat(expense))*100)/100).toFixed(2);
        },
        getBudget: function(){
            return{
                income: income,
                expense: expense,
                budget: budget
            }
        }
    }
})();

// UI CONTROLLER
var UIController = (function(){
    var incomeUI = document.querySelector('.incomeValue');
    var expenseUI = document.querySelector('.expensesValue');
    var budgetUI = document.querySelector('.budgetTotal');
    return {
        getInput: function(){
            return{
                type: document.querySelector('.inputType').value,
                desc: document.querySelector('.inputDesc').textContent,
                value: document.querySelector('.inputValue').value
            }
        },
        updateBudget: function(data){
            incomeUI.textContent = "+ " + data.income;
            expenseUI.textContent = "- " + Math.abs(data.expense);
            if(data.budget >= 0){
                budgetUI.textContent = "+ " + data.budget;
            } else {
                budgetUI.textContent = "- " + Math.abs(data.budget);
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
        UICtrl.updateBudget(budgetCtrl.getBudget());

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