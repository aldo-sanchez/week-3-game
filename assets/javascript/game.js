console.log("test");

//words available for hangman game
//var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];
var wordArray = ["luisana"];
//selects random word from array, determines length of word, and displays empty slots for selected word
var randomWord = Math.floor(Math.random()*wordArray.length);
var lengthWord = wordArray[randomWord].length;

//may not use this bottom stuff
// var emptyWord = "";
// for (i = 0; i < lengthWord; i++){
//   emptyWord = emptyWord + "_ ";
// };

console.log(wordArray[randomWord]);
console.log(lengthWord);
// console.log(emptyWord);


var selectedWordArray = [];
var emptyWord = [];
for (i = 0; i < lengthWord; i++){
  selectedWordArray[i] = wordArray[randomWord].substr(i,1);
  emptyWord[i] = "_"
};
console.log(selectedWordArray);
console.log(emptyWord);

var userInput = "a";

//Compare selected word with user inputs.  If user input = selected word then the input replaces the empty slot in emptyWord.
for (i = 0; i < selectedWordArray.length; i++){
  if (selectedWordArray[i] == userInput){
    emptyWord[i] = userInput;
  };
};
console.log(emptyWord);
