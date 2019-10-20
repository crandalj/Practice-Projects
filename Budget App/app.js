// BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

   

    return{
        addItem: function(type, desc, val){
            var newItem, ID;

            // Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, desc, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, desc, val);
            }

            // Return the new item
            data.allItems[type].push(newItem);
            return newItem;
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
    var DOMstrings = {
        inputType: '.inputType',
        inputDesc: '.inputDesc',
        inputValue: '.inputValue',
        incomeValue: '.incomeValue',
        expensesValue: '.expensesValue',
        budgetValue: '.bugetTotal',
        expenseList: '.expenseList',
        incomeList: '.incomeList'
    }
    var incomeUI = document.querySelector(DOMstrings.incomeValue);
    var expenseUI = document.querySelector(DOMstrings.expensesValue);
    var budgetUI = document.querySelector(DOMstrings.budgetValue);
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                desc: document.querySelector(DOMstrings.inputDesc).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            // Create HTML string w/ placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">X</i></button></div></div></div>';
            } else if(type === 'exp'){
                element = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">X</i></button></div></div></div>';
            }
            
            // Replace placeholder text with actual data from obj
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the updated placeholder text into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        getDOMstring: function(){
            return DOMstrings;
        }
    }
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    var setupEventListeners = function(){
        document.querySelector('.btn_add').addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var DOM = UICtrl.getDOMstring();

    var ctrlAddItem = function() {
        var input, newItem;

        // Get input data
        input = UICtrl.getInput();
        
        console.log(input.desc);
        // add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.desc, input.value);

        // add item to UI
        UICtrl.addListItem(newItem, input.type);

        // calculate new budget total

        // display budget on UI
    };

    return {
        init: function(){
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();