// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Subscribe to input with id "Input_StudentNumber" onkeydown event.
var studentNumberElement = document.getElementById("Input_StudentNumber")
if (studentNumberElement)
    studentNumberElement.onkeydown = function(event) {
        onNumberInputKeyDown(event);
    };

// Prevent user from using '-' character or incrementing or decrementing value using arrow keys.
function onNumberInputKeyDown(event) {
    var x = event.which || event.keyCode;
    if (x == 38 || x == 40 || x == 189) event.preventDefault();
}

// // Subscribe to input with id "Input_StudentNumber" onpaste event.
// document.getElementById("Input_StudentNumber").onpaste = function(event) {
//     onNumberInputPaste(event);
// };

// // Prevent user from pasing '-' character.
// function onNumberInputPaste(event) {
//     // event.target.value=event.clipboardData.getData("Text").replace('-','');
//     console.log(event.target);
// }
