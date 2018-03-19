var enteredFood = document.getElementById("foodInput");
var enteredAmount = document.getElementById("foodAmount");
var debug = document.getElementById("debug");

var foods = ["Hamburger", "Fries", "Steak and eggs", "Meat Loaf", "Salad", "Fried Chicken", "Lasagna"];

function addItem() {

  var dinnerItem = new DinnerItem(enteredFood.value,enteredAmount.value);
  createItem(dinnerItem);
  enteredFood.value = foods[Math.floor(Math.random()*(foods.length))];
  enteredAmount.value = Math.floor(Math.random()*3)+1;

}

function createItem(dinnerItem) {
    // if no food is entered, create a mystery ? item
    if (dinnerItem.name == ""){
      dinnerItem.name = "????";
    }

    //var existingItems = document.querySelectorAll("div#item");
    //debug.innerHTML = existingItems.length;

    // create item parent
    var newItem = document.createElement("DIV");
    newItem.setAttribute("id","item");
    document.getElementsByClassName("dinner")[0].appendChild(newItem);

    // analyzes the content of the string to determine the size of the DIV
    var enteredString = getLargestString(dinnerItem.name);
    newItem.style.width = enteredString[0] * 5 + "vw";
    newItem.style.height = (dinnerItem.name.length / enteredString[0]) * 10 + "vw";


    // create item child front
    var newItemFront = document.createElement("FIGURE");
    var itemNumber = document.createTextNode(dinnerItem.name);
    newItemFront.setAttribute("class","front");
    newItemFront.appendChild(itemNumber);

    // create item child back
    var newItemBack = document.createElement("FIGURE");
    var itemText = document.createTextNode("x" + dinnerItem.amount);
    newItemBack.setAttribute("class","back");
    newItemBack.appendChild(itemText);

    // add front and back children to item parent
    newItem.appendChild(newItemFront);
    newItem.appendChild(newItemBack);

    // add click even to item and toggle its class to flipped if clicked.
    newItem.addEventListener('click', function(){
      newItem.toggleClassName('flipped');
    }, false);

}

//adds a method to Elements to determine which method to execute next; add or remove the specified class
Element.prototype.toggleClassName = function (a) {
  this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};

//adds a method to Elements to determine if the Element contains the class passed as argument
Element.prototype.hasClassName = function (a) {
    return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

//adds a method to Elements to add the class passed as argument
Element.prototype.addClassName = function (a) {
    if (!this.hasClassName(a)) {
        this.className = [this.className, a].join(" ");
    }
};

//adds a method to Elements to remove the class passed as argument
Element.prototype.removeClassName = function (b) {
    if (this.hasClassName(b)) {
        var a = this.className;
        this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
    }
};

// function to find the largest string segment. Used to size the DIVs.
function getLargestString (string) {
  var segments = string.split(" ");
  var largestString = 0;
  for (var i = 0; i < segments.length; i++) {
    var temp = segments[i].length;
    if (temp > largestString){
      largestString = temp;
    }
  }
  return [largestString, segments.length];
}

function DinnerItem (name, amount){
  this.name = name;
  this.amount = amount;
}
