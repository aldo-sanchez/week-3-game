console.log("test");

//words available for hangman game
//var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];
var wordArray = ["luisana"];
//selects random word from array, determines length of word, and displays empty slots for selected word
var randomWord = Math.floor(Math.random()*wordArray.length);
var wordLength = wordArray[randomWord].length;

//may not use this stuff
// var emptyWord = "";
// for (i = 0; i < lengthWord; i++){
//   emptyWord = emptyWord + "_ ";
// };

console.log(wordArray[randomWord]);
console.log(wordLength);
// console.log(emptyWord);


var selectedWordArray = [];
var emptyWord = [];
for (i = 0; i < wordLength; i++){
  selectedWordArray[i] = wordArray[randomWord].substr(i,1);
  emptyWord[i] = "_"
};
console.log(selectedWordArray);
console.log(emptyWord);

//Compare selected word with user inputs.  If user input = selected word then the input replaces the empty slot in emptyWord.
$(document).ready(function(){
  $(document).keypress(function userGuess(event){
    var userInput = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(userInput);
    for (i = 0; i < wordLength; i++){
      if (selectedWordArray[i] == userInput){
        emptyWord[i] = userInput;
      };
    };
    console.log(emptyWord);
  });
});

