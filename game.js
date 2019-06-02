// holds the player object
let player;
//holds the current opponent object
let opponent;
//holds all remaining opponents
let opponents = [];



function initializeGame() {

  //array of player objects
  let playersArray = [
    bojack = {
      player: "Bojack",
      playerImg: "images/bojack.png",
      healthPoints: 200,
      attackPower: 10,
      counterAttackPower: 5
    },
    diane = {
      player: "Diane",
      playerImg: "images/diane.png",
      healthPoints: 100,
      attackPower: 50,
      counterAttackPower: 25
    },
    carolyn = {
      player: "Princess Carolyn",
      playerImg: "images/princesscarolyn.png",
      healthPoints: 150,
      attackPower: 30,
      counterAttackPower: 15
    },
    todd = {
      player: "Todd",
      playerImg: "images/todd.png",
      healthPoints: 125,
      attackPower: 40,
      counterAttackPower: 20
    },
    peanutbutter = {
      player: "Mr. Peanutbutter",
      playerImg: "images/peanutbutter.png",
      healthPoints: 175,
      attackPower: 20,
      counterAttackPower: 10
    }
  ]

  //empty vars/array/divs
  player = null;
  opponent = null;
  opponents = [];
  $(".playerCharacter", ".remainingEnemies", ".currentOpponent").empty();

  //loops through and populates each div for the starting character selection
  $.each(playersArray, function (index, player) {
    $("#" + index).prepend("<img src=" + player.playerImg + ">");
    $("#" + index).prepend(player.player);
    $("#" + index).append("<span id='HP'> HP: " + player.healthPoints + " </span>");
  })

  $(".player").on("click", function () {
    if (!player) {

    }
  })




}




//checks for empty div since :empty selector wasn't working consistently
function isEmpty(element) {
  return !$.trim(element.html());
}

//theme song
function playTheme() {
  let audio = new Audio("./themesong.mp3");
  audio.play();
}



//running game
initializeGame();