console.log("test");

//words available for hangman game
var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];
//selects random word from array, determines length of word, and displays empty slots for selected word
var randomWord = Math.floor(Math.random()*wordArray.length);
var lengthWord = wordArray[randomWord].length;
var emptyWord = "";
for (i = 0; i < lengthWord; i++){
  emptyWord = emptyWord + " _";
};

console.log(wordArray[randomWord]);
console.log(lengthWord);
console.log(emptyWord);