let playersArray = [{
    player: "Bojack",
    playerImg: "images/bojack.png",
    healthPoints: 200,
    attackPower: 20,
    counterAttackPower: 10
  },
  {
    player: "Diane",
    playerImg: "images/diane.png",
    healthPoints: 100,
    attackPower: 40,
    counterAttackPower: 40
  },
  {
    player: "Princess Carolyn",
    playerImg: "images/princesscarolyn.png",
    healthPoints: 150,
    attackPower: 80,
    counterAttackPower: 50
  },
  {
    player: "Todd",
    playerImg: "images/todd.png",
    healthPoints: 125,
    attackPower: 50,
    counterAttackPower: 70
  },
  {
    player: "Mr. Peanutbutter",
    playerImg: "images/peanutbutter.png",
    healthPoints: 175,
    attackPower: 25,
    counterAttackPower: 100
  },
]


function resetGame() {

  $(".playerCharacter", ".remainingEnemies", ".currentOpponent").empty();

  for (i = 0; i < playersArray.length; i++) {
    $(".player" + i).prepend("<img src=" + playersArray[i].playerImg + " >");
    $(".player" + i).prepend(playersArray[i].player);
    $(".player" + i).append("<p>HP: " + playersArray[i].healthPoints)
  }

  $(".player").on("click", function () {
    if (isEmpty($(".playerCharacter"))) {
      playTheme();
      $(this).appendTo(".playerCharacter");
      $(".playerBox").appendTo(".remainingEnemies");
    } else if ($(this).parents(".remainingEnemies").length) {
      $(".player").on("click", function () {
        if (isEmpty($(".currentOpponent"))) {
          $(this).appendTo(".currentOpponent");
        }
      })
    }
  })
}
//more consistent method of checking if player character has been chosen since :empty selector wasn't really working
function isEmpty(element) {
  return !$.trim(element.html());
}

//theme song
function playTheme() {
  let audio = new Audio("./themesong.mp3");
  audio.play();
}

function attackButton() {

}






//running the game
resetGame();