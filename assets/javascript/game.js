//words available for hangman game
//  var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];

//selects a random word from array, determines length of word, and assigns a selected word to a variable (selectedWord).  
// var randomWord = Math.floor(Math.random()*wordArray.length);
// var wordLength = wordArray[randomWord].length;
// var selectedWord = wordArray[randomWord];

// initialize an emptyWord that will be compared to  selectedWord and emptyDisplayWord.  emtpyDisplayWord is used to display to page in the following format:  if emptyWord = "test" then emtpyDisplayWord = "t e s t" 
// var emptyDisplayWord = "";

// gameStatus object will keep track of game and is initialized here.
var gameStatus = {isPlaying:false, numberWins:0, numberLosses:0, lives:6}

var wordArray = ["luisana","aldo","melquiades","coffee","black","hole","cellphone","test"];
// console.log(wordArray[randomWord]);
// console.log(wordLength);

//create two arrays of the same size (length of selectedWord). Each letter of selectedWord will occupy a space in the selectedWordArray.  e.g. selectedWord = test; selectedWordArray = [t,e,s,t];  each space in emptyWordArray is occupied by "_". e.g. selectedWord = test emptyWordArray = [-,-,-,-]


// for (i = 0; i < wordLength; i++){
//     selectedWordArray[i] = selectedWord.substr(i,1);
//     emptyWordArray[i] = "_";
//     emptyWordDisplayArray[i] = "_ "
    
// };

function initialization(){
    if (!gameStatus.isPlaying){
        var randomWord = Math.floor(Math.random()*wordArray.length);
        var selectedWord = wordArray[randomWord];
        var emptyWord = "";
        var selectedWordArray = [];
        var emptyWordArray = [];
        
        for (i = 0; i < selectedWord.length; i++){
            selectedWordArray[i] = selectedWord.substr(i,1);
            emptyWordArray[i] = "-";
        }

        console.log(selectedWord);

        $("#testId").html("press space bar to start playing");
        $("#lives").html("lives: " + gameStatus.lives);
        $("#wins").html("wins: " + gameStatus.numberWins);
        $("#losses").html("losses: " + gameStatus.numberLosses);
        $("#emptyWord").html();
        $("#wrongKey").html();

        initialObject = {selectedWord: selectedWord, selectedWordArray: selectedWordArray, emptyWordArray: emptyWordArray};
        return initialObject;
    };
};

$(document).keypress(function startGameKeyPress(event){
    if (!gameStatus.isPlaying){
        var eventPress = String.fromCharCode(event.keyCode);
        if (/ /.test(eventPress)){
            gameKeyPress(initialObject.selectedWord, initialObject.selectedWordArray, initialObject.emptyWord, initialObject.emptyWordArray);
            gameStatus.isPlaying = true;
        }else{console.log("wrong key... you don't want to play?")}
    };
});

function gameKeyPress(selectedWord, selectedWordArray, emptyWord, emptyWordArray){
    $(document).keypress(function(event){
        if (gameStatus.isPlaying){
            var eventPress = String.fromCharCode(event.keyCode);
            if (/[a-zA-Z]/.test(eventPress)){
                gameLogic(event, selectedWord, selectedWordArray, emptyWord, emptyWordArray);
            }else{console.log("key needs to be a letter from a-z")}
        }
    });
};


function gameLogic(event, selectedWord, selectedWordArray, emptyWord, emptyWordArray){    
    console.log("this is my logic")
    console.log(selectedWord);
    console.log(selectedWordArray);
    console.log(emptyWordArray);
    console.log(emptyWord);
}
var initialObject = initialization();
console.log(initialObject.selectedWord);
console.log(initialObject.selectedWordArray);


// $(document).ready(function() {
//     startGame();
//     var initialization = startGame();
//     console.log(initialization.selectedWord, initialization.wordLength, initialization.selectedWordArray, initialization.emptyWordArray);

//     firstKeyPress(initialization.selectedWord, initialization.wordLength, initialization.emptyWordArray, initialization.selectedWordArray, initialization.emptyWordArray);
// });

//  function startGame(){
//     var randomWord = Math.floor(Math.random()*wordArray.length);
//     // var wordLength = wordArray[randomWord].length;
//     var selectedWord = wordArray[randomWord];

//         var selectedWordArray = [];
//         var emptyWordArray = [];
//         var wrongLetterArray = [];
//         var emptyWordDisplayArray = [];
//         var wrongLetterWord = "";

//         for (i = 0; i < wordLength; i++){
//             selectedWordArray[i] = selectedWord.substr(i,1);
//             emptyWordArray[i] = "_";
//             emptyWordDisplayArray[i] = "_"
//         };

//         $("#testId").html("press space bar to start playing");
//         $("#lives").html();
//         $("#emptyWord").html();
//         $("#wrongKey").html();

//         return {randomWord: randomWord, wordLength: wordLength, selectedWord: selectedWord, selectedWordArray: selectedWordArray, emptyWordArray: emptyWordArray};          
// };
    
// var firstKeyPress = function(selectedWord, wordLength, emptyWordDisplayArray, selectedWordArray, emptyWordArray){
//     $(document).keypress(function(event){
//         var eventPress = String.fromCharCode(event.keyCode);
//         if (!gameStatus.isPlaying && / /.test(eventPress)){
//             gameStatus.isPlaying = true;
//             console.log("i am in.")
    
//             $("#testId").html(selectedWord);
//             $("#lives").html(gameStatus.lives);
//             $("#emptyWord").html(emptyWordDisplayArray);

//             gamePlaying(selectedWord, wordLength, selectedWordArray);
//         } 
//         else if(!gameStatus.isPlaying & !/ /.test(eventPress)){
//             $("#wrongKey").html("wrong key... you don't want to play :(")
//         }
//     }); 
// };
     
// function gamePlaying(selectedWord, wordLength, selectedWordArray, emptyWordArray){

//     $(document).keypress(function(event){
//         var eventPress = String.fromCharCode(event.keyCode);
//         if (/[a-zA-Z]/.test(eventPress)){
//             //console.log("yes!!!!")
//             userGuess(event,selectedWord,wordLength, selectedWordArray)
//         } 
//         //else{console.log("no....")};
//     });

// };

// function userGuess(event, selectedWord, wordLength, selectedWordArray, emptyWordArray) {
    
//     if (gameStatus.lives >0 && emptyWord != selectedWord){
        
//         var userInput = String.fromCharCode(event.keyCode).toLowerCase();
//         console.log(userInput);
//         emptyWordDisplay = "";
//         var emptyWord = "";
//         var isUserGuessValid = false;
    
//         //Compare selected word with user inputs.  If user input = selected word then the input replaces the empty slot in emptyWord.
//         for (i = 0; i < wordLength; i++) {
//             if (selectedWordArray[i] == userInput) {
//                 emptyWordArray[i] = userInput;
//                 isUserGuessValid = true;
//             }
//             emptyWordDisplay = emptyWordDisplay + " " + emptyWordArray[i];
//             emptyWord = emptyWord + emptyWordArray[i];
//         };
//         //will only enter if it isnot valid and doesnt already exist. 
//         if (!isUserGuessValid && wrongLetterArray.indexOf(userInput) == -1) {
//             gameStatus.lives--;
//             wrongLetterArray.push(userInput);
//             wrongLetterWord = wrongLetterWord + " " + userInput;
//             $("#wrongLetterWord").html(wrongLetterWord);
//             console.log(wrongLetterArray);
//             $("#lives").html(gameStatus.lives)
//         } 
//         //console.log(emptyWordArray);
//         //console.log(wrongLetterArray);
//         //console.log(gameStatus.lives);
//         //console.log(emptyWord);
//         $("#emptyWord").html(emptyWordDisplay);
//         //console.log(selectedWord);
//         console.log("still playin");
//     };
//     game(emptyWord, selectedWord);
// };

// function game(emptyWord, selectedWord) {
//     if (gameStatus.lives > 0 && emptyWord == selectedWord) {
//         gameStatus.isPlaying = false;
//         gameStatus.numberWins++;
//         $("#wins").html("wins: " + gameStatus.numberWins);
//     }
//     else if (gameStatus.lives <= 0) {
//         gameStatus.isPlaying = false;
//         gameStatus.numberLosses++;
//         $("#losses").html("losses: " + gameStatus.numberLosses);
//     };
// };