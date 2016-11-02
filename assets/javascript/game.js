console.log("test");

//words available for hangman game
 var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];
//var wordArray = ["luisana"];

//selects a random word from array, determines length of word, and assigns a selected word to a variable (selectedWord).  
var randomWord = Math.floor(Math.random()*wordArray.length);
var wordLength = wordArray[randomWord].length;
var selectedWord = wordArray[randomWord];

// initialize an emptyWord that will be compared to  selectedWord
var emptyWord = "";

// gameStatus object will keep track of game and is initialized here.
var gameStatus = {isPlaying:false, numberWins:0, numberLosses:0, lives:6}
console.log(wordArray[randomWord]);
console.log(wordLength);

// we crate two arrays of the same size (length of selectedWord). Each letter of selectedWord will occupy a space in the selectedWordArray.  e.g. selectedWord = test; selectedWordArray = [t,e,s,t];  each space in emptyWordArray is occupied by "_"
var selectedWordArray = [];
var emptyWordArray = [];
var wrongLetterArray = [];
var wrongLetterWord = "";

for (i = 0; i < wordLength; i++){
  selectedWordArray[i] = selectedWord.substr(i,1);
  emptyWordArray[i] = "_";
};
console.log(selectedWordArray);
console.log(emptyWord);

console.log(gameStatus.isPlaying);
$(document).ready(function () {

    if (gameStatus.isPlaying = false) {
        $(document).keypress(function startGame(event) {
            userInput = event.keyCode
            if (userInput = 32) {
                return gameStatus.isPlaying = true;
                console.log(gameStatus.isPlaying);
            }
        });
    }
    else if (gameStatus.isPlaying = true) {
        $(document).keypress(function userGuess(event) {
            var userInput = String.fromCharCode(event.keyCode).toLowerCase();
            console.log(userInput);
            wrongLetterWord = emptyWord;
            emptyWord = "";
            var isUserGuessValid = false;

            //Compare selected word with user inputs.  If user input = selected word then the input replaces the empty slot in emptyWord.
            for (i = 0; i < wordLength; i++) {
                if (selectedWordArray[i] == userInput) {
                    emptyWordArray[i] = userInput;
                    isUserGuessValid = true;
                }
                emptyWord = emptyWord + emptyWordArray[i];
            };

            //will only enter if it isnot valid and doesnt already exist. 
            if (!isUserGuessValid && wrongLetterArray.indexOf(userInput) == -1) {
                gameStatus.lives--;
                wrongLetterArray.push(userInput);
                console.log(wrongLetterArray);
            }

            console.log(emptyWordArray);
            console.log(wrongLetterArray);
            console.log(gameStatus.lives);

            function game() {
                if (gameStatus.lives > 0 && emptyWord == selectedWord) {
                    alert("you win :)");
                    gameStatus.isPlaying = false;
                    gameStatus.numberWins++;
                }
                else if (gameStatus.lives <= 0) {
                    alert("you lose :(")
                    gameStatus.isPlaying = false;
                    gameStatus.numberLosses++;
                };
            };
            game();

        });

    }
  
  
});




