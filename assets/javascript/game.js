console.log("test");

//words available for hangman game
 var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];
// var wordArray = ["luisana"];

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

//create two arrays of the same size (length of selectedWord). Each letter of selectedWord will occupy a space in the selectedWordArray.  e.g. selectedWord = test; selectedWordArray = [t,e,s,t];  each space in emptyWordArray is occupied by "_". e.g. selectedWord = test emptyWordArray = [-,-,-,-]
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


$(document).ready(function() {
    if (!gameStatus.isPlaying){
        $("#testId").html("press space bar to start playing");
    }

    $(document).keypress(function(event){
        var eventPress = String.fromCharCode(event.keyCode);
        if (!gameStatus.isPlaying && / /.test(eventPress)){
            gameStatus.isPlaying = true;
            $("#testId").html("we are playing!");
            $("#lives").html(gameStatus.lives);
            $("#emptyWord").html(emptyWordArray);
            gamePlaying();
        } else if(!gameStatus.isPlaying & !/ /.test(eventPress)){
            console.log("wrong key... you don't want to play :(")
        }
    });     
});


function gamePlaying(){
    console.log("let's play!")
        $(document).keypress(function(event){
        var eventPress = String.fromCharCode(event.keyCode);
        if (/[a-zA-Z]/.test(eventPress)){
            console.log("yes!!!!")
            userGuess(event)
        } else{console.log("no....")}
    });

    };



function userGuess(event) {
    
    if (gameStatus.lives >0 && emptyWordArray != selectedWord){
        
        var userInput = String.fromCharCode(event.keyCode).toLowerCase();
        console.log(userInput);
        var emptyWordDisplay = "";
        emptyWord = "";
        var isUserGuessValid = false;
    
        //Compare selected word with user inputs.  If user input = selected word then the input replaces the empty slot in emptyWord.
        for (i = 0; i < wordLength; i++) {
            if (selectedWordArray[i] == userInput) {
                emptyWordArray[i] = userInput;
                isUserGuessValid = true;
            }
            emptyWordDisplay = emptyWordDisplay + " " + emptyWordArray[i];
            emptyWord = emptyWord + emptyWordArray[i];
            
        };
        //will only enter if it isnot valid and doesnt already exist. 
        if (!isUserGuessValid && wrongLetterArray.indexOf(userInput) == -1) {
            gameStatus.lives--;
            wrongLetterArray.push(userInput);
            wrongLetterWord = wrongLetterWord + " " + userInput;
            $("#wrongLetterWord").html(wrongLetterWord);
            console.log(wrongLetterArray);
            $("#lives").html(gameStatus.lives)
            
        } 

        console.log(emptyWordArray);
        console.log(wrongLetterArray);
        console.log(gameStatus.lives);
        console.log(emptyWord);
        $("#emptyWord").html(emptyWordDisplay);
        console.log(selectedWord);
        console.log("still playin");

    } 
    game(emptyWord);
}

function game(word) {
    if (gameStatus.lives > 0 && emptyWord == selectedWord) {
        console.log("you win :)");
        gameStatus.isPlaying = false;
        gameStatus.numberWins++;
    }
    else if (gameStatus.lives <= 0) {
        console.log("you lose :(")
        gameStatus.isPlaying = false;
        gameStatus.numberLosses++;
    };
};



