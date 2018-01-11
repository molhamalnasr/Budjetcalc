//Creat the module pattern
var budgetController = (function(){
    //Test
    var x = 26;
    
    var add = function(a){
        return x + a;
    }
    
    return {
        publichTest: function(b){
            console.log(add(b));
        }
    }
    
})();


var UIController = (function(){
    
    //Some Code
    
})();

var controller = (function(budgetCtrl, UICtrl){
    
    
    
})(budgetController, UIController);

























