// object describing game state
var gameStatus = { isPlaying: false, selectedWord: "", emptyWord: "",wrongLetterWord: "", selectedWordArray: [], emptyWordArray: [], wrongLetterArray: [], testValue: 0, numberWins: 0, numberLosses: 0, lives: 0 };

//words available for hangman game
var wordArray = ["mozart","haydn","handel","brahms","mahler","beethoven","schumann","schubert","britten","copland","debussy","ravel","chopin","purcell","liszt","bach","mendelssohn","tchaikovsky","vivaldi","bernstein","dvorak","stravinsky","wagner"];

$(document).ready(function () {
    initialization();
});

function initialization(){
    if (!gameStatus.isPlaying){
        //selects a random word from array, determines length of word, and assigns a selected word to a variable (selectedWord). 
        var randomWord = Math.floor(Math.random()*wordArray.length);
        var selectedWord = wordArray[randomWord];
        gameStatus.selectedWord = wordArray[randomWord];
        gameStatus.selectedWordArray = [];
        gameStatus.emptyWordArray = [];
        gameStatus.emptyWord = "";
        gameStatus.wrongLetterWord = "-";
        gameStatus.lives = 6;
        gameStatus.wrongLetterArray = [];
        
        for (i = 0; i < gameStatus.selectedWord.length; i++){
            gameStatus.selectedWordArray[i] = gameStatus.selectedWord.substr(i,1);
            gameStatus.emptyWordArray[i] = "-";
        }

        // creates an initial empty word to display on window
        var initialEmptyWord = gameStatus.emptyWordArray.join("");
        $("#emptyWord").text("Right Guess: " + initialEmptyWord);
        $("#wrongLetterWord").text("Wrong Guess " + gameStatus.wrongLetterWord);
          
        // display initialization state on window
        $("#instructions").html("press spacebar to start");
        $("#lives").html("lives: " + gameStatus.lives);
        $("#wins").html("wins: " + gameStatus.numberWins);
        $("#losses").html("losses: " + gameStatus.numberLosses);
        $("#hangmanImage img").attr("src","assets/images/h-" + gameStatus.lives + ".png");
    };
};

// keypress functions
$(document).keypress(function startGameKeyPress(event) {
    // if gamestatus hasn't started (false) we wait for the user to press the spacebarr (/ /). when user presses the spacebar we call gameKeyPress()
    if (!gameStatus.isPlaying){
        var eventPress = String.fromCharCode(event.keyCode);
        if (/ /.test(eventPress)){
            $("#instructions").text("press any letter (a-z) key to guess");
            gameKeyPress();
        } else{$("#instructions").text("that's not the spacebar....")}
    } 
    // if gamestatus has started (true), then we wait for the user to keypress a letter from a-z or A-Z.  when user presses a letter we call gameLogic()
    else if (gameStatus.isPlaying) { 
                var eventPress = String.fromCharCode(event.keyCode);
                if (/[a-zA-Z]/.test(eventPress)) {
                    gameLogic(event, gameStatus.selectedWord, gameStatus.selectedWordArray, gameStatus.emptyWord, gameStatus.emptyWordArray, gameStatus.wrongLetterArray);
                } else { $("#instructions").text("key needs to be a letter from a-z") };
    };
});

// gameKeyPress changes the gamestatus to true.  this helps us get out of the initial state on to the actual game.
function gameKeyPress(){
    gameStatus.isPlaying = true;
};

// gameLogic() compares the user input with the initally selected word.  if the input is part of the selected word then the empty word shows the input at the correct position.  if the input is incorrect then it is saved in a wrong word array.  this array is also displayed to the user.  at the end of gameLogic() we call checkGameStatus
function gameLogic(event, selectedWord, selectedWordArray, emptyWord, emptyWordArray, wrongLetterArray, wrongLetterWord){    
    // console.log("this is my logic") 

    var userInput = String.fromCharCode(event.keyCode).toLowerCase();    
    var isUserGuessValid = false;
   

    for (i = 0; i < selectedWord.length; i++){
        if (selectedWordArray[i] == userInput){
            emptyWordArray[i] = userInput;
            isUserGuessValid = true;
        }
        // emptyWordDisplay = emptyWordDisplay + " " + emptyWordArray[i];
        emptyWord = emptyWord + emptyWordArray[i];
    };

    if (!isUserGuessValid && wrongLetterArray.indexOf(userInput) == -1){
        gameStatus.lives--;
        wrongLetterArray.push(userInput);
        // wrongLetterWord = wrongLetterWord + " " + userInput;
        wrongLetterWord = wrongLetterArray.join("");
        $("#hangmanImage img").attr("src","assets/images/h-" + gameStatus.lives + ".png");
        $("#wrongLetterWord").html("Wrong Guess: " + wrongLetterWord);
        // console.log(wrongLetterArray);
        $("#lives").html("lives: " + gameStatus.lives)
    };
    // console.log(emptyWordArray);
    $("#emptyWord").html("Right Guess: " + emptyWord);
    checkGameStatus(emptyWord, selectedWord);    
};

// checkGameStatus checks if the game is done (empty word is the same as the selected word or you're out of lives.  if one of these two conditions is met then we set a timer to restart the game by calling initialization()
function checkGameStatus(emptyWord, selectedWord) {
    if (gameStatus.lives > 0 && emptyWord == selectedWord) {
        gameStatus.isPlaying = false;
        gameStatus.numberWins++;
        $("#hangmanImage img").attr("src","assets/images/win.png");
        setTimeout(initialization,2*1000);
        
    }
    else if (gameStatus.lives <= 0) {
        gameStatus.isPlaying = false;
        gameStatus.numberLosses++;
        $("#losses").html("losses: " + gameStatus.numberLosses);
        $("#emptyWord").html("Right Word: " + selectedWord);
        setTimeout(initialization,2*1000);
    }
};