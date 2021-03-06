//Creat the module pattern

//Budget Controller
var budgetController = (function(){
    
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type){
        var sum = 0;
        
        data.allItemes[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    var data = {
        allItemes: {
            exp: [],
            inc: []
        },
        totals:{
            exp: 0,
            inc: 0
        },
        budget: 0,
        percetage: -1
    };
    
    return{
        addItem: function(type, des, val){
            var newItem, ID;
            
            //[0, 2, 3, 5, 8] next ID = last item ID +1
            
            //Creat new item ID
            if(data.allItemes[type].length > 0){
                ID = data.allItemes[type][data.allItemes[type].length - 1].id + 1;
            }else {
                ID = 0;
            }
            
            //Creat a new item based on 'inc' or 'exp' type
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            
            //push it in our data structure
            data.allItemes[type].push(newItem);
            
            //Return the new element
            return newItem;
        },
        calculateBudget: function(){
            
            //calculate income and expenses
            calculateTotal('inc');
            calculateTotal('exp');
            
            //calculate the budget
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the percentage
            if(data.totals.inc > 0){
                data.percetage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percetage = -1;
            }
            
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percetage
            };
        },
        testing: function(){
            return data;
        }
    };
    
})();


//UI Controller
var UIController = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLable: '.budget__value',
        incomeLable: '.budget__income--value',
        expensesLable: '.budget__expenses--value',
        percentageLable: '.budget__expenses--percentage'
    };
    
    return{
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,               //either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            
            //creat an HTML placeholder
            if(type === 'inc'){
                element = document.querySelector(DOMstrings.incomeContainer);
                
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = document.querySelector(DOMstrings.expensesContainer);
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            //replace the placeholder
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //insert the new item
            element.insertAdjacentHTML('beforeend', newHtml);
            
        },
        clearFields: function(){
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });
            fieldsArr[0].focus();
            
        },
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLable).textContent = obj.budget;
            document.querySelector(DOMstrings.expensesLable).textContent = obj.totalExp;
            document.querySelector(DOMstrings.incomeLable).textContent = obj.totalInc;
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLable).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageLable).textContent = '---';
            }
            
        },
        
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
    
})();


//Global app controller
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListener = function(){
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };
    
    var updateBudget = function(){
        
        //1. calculate the Budget
        budgetCtrl.calculateBudget();
        
        //2. return the Budget
        var budget = budgetCtrl.getBudget();
        
        //3. display the Budget on the UI
        UICtrl.displayBudget(budget);
        
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        //1. get the field input Data
        input = UICtrl.getInput();
        
        //Check the fields before add the item into the UI.
        if(input.description !== '' && !isNaN(input.value) && input.value > 0){
            //2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            
            //3.1 clear all fields after input
            UICtrl.clearFields();
            
        }
        
        //4. calculate and update budget
        updateBudget();
        
    };
    
    
    return {
        init: function(){
            console.log('the Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListener();
        }
    };
    
    
})(budgetController, UIController);

controller.init();























