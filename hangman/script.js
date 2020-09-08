var word = "";
var xArr = []
var unknownString = ""
var firstLoad = true
var wrongLetters = []
var strikes = 0
var bodyCount = 0
var bodyList = ["headImage","torsoImage","rightArmImage","leftArmImage","rightLegImage","leftLegImage"]
document.getElementById("header").innerHTML = "Enter a word or phrase"

//function to show the image
function showImage(id){
  var img = document.getElementById(id)
  img.style.visibility = 'visible'
}
//function to show hidden buttons
function showButton(id){
  var button = document.getElementById(id)
  button.style.visibility = 'visible'
}
//receives word from user
function add(){
    var input = document.getElementById('userinput').value;
    word = input.split("")
    console.log(word);

    for (i=0; i < word.length; i++){
      if(word[i] == ' '){
        xArr.push(" ")
      }else{
      xArr.push("X")
    }
    }
    console.log(xArr)
    unknownString = xArr.join("")
    document.getElementById("censored").innerHTML = unknownString
    document.getElementById("form").reset()
    document.getElementById("header").innerHTML = "Enter a letter"
    document.getElementById("userinput").placeholder = "Enter a letter"
    firstLoad = false
}
function resetGame(){
    window.location.reload()
}
function guessWord(){
      var input = document.getElementById("userinput").value
      var answer = word.join('')
      if(input == answer){
        document.getElementById("header").innerHTML = "You win!"
        showButton("resetButton")
        var resButton = document.getElementById("resetButton")
        resButton.addEventListener("click", resetGame)
      }
      else{
        document.getElementById("header").innerHTML = "You lose!"
        showButton("resetButton")
        var resButton = document.getElementById("resetButton")
        resButton.addEventListener("click", resetGame)
        for(i=0;i<bodyList.length;i++){
          showImage(bodyList[i])
        }
      }
}
//guess individual letters
function game(){
  //variable to check if a letter is not in the word/phrase
  var contain = 0
  var input = document.getElementById("userinput").value
  for (i = 0; i < word.length; i++){
    if(word[i] == input){
      xArr[i] = input
      contain += 1
    }

    }
  if(contain == 0){
      wrongLetters.push(input)
      strikes += 1
      if(strikes == 6){
        showImage(bodyList[strikes-1])
        document.getElementById("header").innerHTML = "You lost!"
        showButton("resetButton")
        var resButton = document.getElementById("resetButton")
        resButton.addEventListener("click", resetGame)
        //alert("You lose!(out of guesses)")
      }else{
      //alert("Wrong!")
      console.log(bodyList[strikes-1])
      showImage(bodyList[strikes-1])
      }

  }
  unknownString = xArr.join("")
  document.getElementById("censored").innerHTML = unknownString
  document.getElementById("form").reset()
  document.getElementById("wrongGuesses").innerHTML = "Guessed letters: " + wrongLetters
  if(xArr.toString() == word.toString()){
        document.getElementById("header").innerHTML = "You win!"
  }
}

function gameControl(){
  if(firstLoad){
    add()
  }else{
    game()
  }
}
var button = document.getElementById("button")
button.addEventListener("click", gameControl)
var wButton = document.getElementById("wordButton")
wButton.addEventListener("click", guessWord)
