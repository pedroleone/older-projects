'use strict';
$(function () {
    var display = [];
    $(document).keypress(function(k) {
        console.log(k.key);
        var keyPressed = k.key;
        switch (k.key) {
            case "*":
                keyPressed = "mult";
                break;
            case "+":
                keyPressed = "plus";
                break;
            case "-":
                keyPressed = "minus";
                break;
            case ",":
                keyPressed = "point";
                break;
            case ".":
                keyPressed = "point";
                break;                                
            case "/":
                keyPressed = "division";
                break;  
            case "=":
                keyPressed = "eq";
                break;
            case "Enter":
                keyPressed = "eq";
                break;            
        }
        var POSSIBLE_KEYS = ["1","2","3","4","5","6","7",
                             "8","9","0", "point", "eq","plus", 
                             "minus","division","mult","ac","ce"];
        if (POSSIBLE_KEYS.indexOf(keyPressed) >= 0) {
            $("#"+keyPressed).trigger("click");
        }
        
    });
    $(".calc").click(function () {
        var id = "";
        switch ($(this).attr("id")) {
            case 'plus':
                id = "+";
                break;
            case 'point':
                id = ".";
                break;
            case 'minus':
                id = "-";
                break;
            case 'division':
                id = '/';
                break;
            case 'mult':
                id = '*';
                break;
            case 'eq':
                id = '=';
                break;
            default:
                id = $(this).attr("id");
        }
        pushButton(id);
    });
    /*
        function displayNumbers() {
            $(".calc-result").text(displayArray.join(""));
        }
    */
    function displayNumbers(val) {
        if ((!isNaN(val) && !isFinite(val)) || val !== val) {
            $(".calc-result").html('erro!');
        } else {
            $(".calc-result").html(val);
            /*if (!isNaN(val)) {
                $(".calc-result").html(_.round(val,5));
            } else {
                $(".calc-result").html(val);
            }*/
            
        }


        $("#fst").text(firstNumber);
        $("#snd").text(secondNumber);
        $("#op").text(operator);
        $("#arr").text(numberArray);
    }

    var displayArray = [];
    var numberArray = [];
    var operator, firstNumber, secondNumber;
    var valueForChain;
    var isFirstNumberEntered = false;


    function pushButton(id) {
        
        if (operator && firstNumber) {
            isFirstNumberEntered = true;
        }

        if (!isNaN(id) || id === ".") { // it's a number or point
            valueForChain = null;
            if (id === ".") {
                if (numberArray.indexOf(id) === -1) {
                    if (numberArray.length === 0) {
                        numberArray.push('0');
                    }

                    numberArray.push(id);
                    displayNumbers(numberArray.join(""));
                    return;
                } else {
                    return;
                }
            }

            if (numberArray.length === 1 && numberArray[0] === "0" && id === "0") {
                return; // don't allow multiple zeroes at front
            }
            if (numberArray.length === 1 && numberArray[0] === "0" && id !== "0") {
                numberArray.pop();
            }
            numberArray.push(id);


            if (!isFirstNumberEntered) {
                firstNumber = parseFloat(numberArray.join(""));
            } else {
                secondNumber = parseFloat(numberArray.join(""));
            }
            displayNumbers(numberArray.join(""));
            return;
        } else {
            if (id == "ce") {
                numberArray = [];
                
                if (!isFirstNumberEntered) {
                    firstNumber = null;
                } else {
                    secondNumber = null;
                }
                displayNumbers("0");
                return;
            }
            if (id == "ac") {
                numberArray = [];
                firstNumber = null;
                secondNumber = null;
                operator = null;
                displayNumbers("0");
                return;
            }
            if (isNaN(id) && !firstNumber && !secondNumber && id !== "=" && valueForChain) {
                // chain command
                operator = id;
                firstNumber = valueForChain;
                valueForChain = null;
                if (operator === "*") {
                    displayNumbers("x");    
                } else if (operator === "/") {
                    displayNumbers("&#247;")
                } else {
                    displayNumbers(operator);
                }
                
                isFirstNumberEntered = true;
                numberArray = [];
                                
                return;
            }


            if (operator && isFirstNumberEntered && id === "=") {
                var result = calculate(firstNumber, secondNumber, operator);
                valueForChain = result;
                firstNumber = null;
                secondNumber = null;
                operator = null;
                numberArray = [];
                displayNumbers(_.round(result,10));
                isFirstNumberEntered = false;
                return;
            }
            if (!operator && id !== "=" && !valueForChain) {
                operator = id;
                if (operator === "*") {
                    displayNumbers("x");    
                } else if (operator === "/") {
                    displayNumbers("&#247;")
                } else {
                    displayNumbers(operator);
                }
                
                isFirstNumberEntered = true;
                numberArray = [];
                return;
            }
            if (isNaN(id) && id !== "." && firstNumber && operator && secondNumber) {
                // chain command without equal
                var result = calculate(firstNumber, secondNumber, operator);
                firstNumber = result;
                secondNumber = null;
                operator = id;
                numberArray = [];
                displayNumbers(_.round(result,10));
                isFirstNumberEntered = false;
                return;
                
            }

        }




    }

    function calculate(fst, snd, op) {
        switch (op) {
            case "+":
                return fst + snd;
            case "-":
                return fst - snd;
            case "*":
                return fst * snd;
            case "/":
                return fst / snd;

        }
    }

});