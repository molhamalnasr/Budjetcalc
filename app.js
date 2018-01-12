//Creat the module pattern

//Budget Controller
var budgetController = (function(){
    
    //some code
    
})();


//UI Controller
var UIController = (function(){
    
    //Some Code
    
})();


//Global app controller
var controller = (function(budgetCtrl, UICtrl){
    
    var ctrlAddItem = function(){
        //1. get the field input Data
        
        //2. add the item to the budget controller
        
        //3. add the item to the UI
        
        //4. calculate the budget
        
        //5. Display the budget on the UI
        
        console.log('it\'s work');
        
    };
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    
    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    })
    
    
    
})(budgetController, UIController);

























