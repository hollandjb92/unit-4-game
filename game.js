// holds the player object
let player;
//holds the current opponent object
let opponent;
//restart button
let restart = $("#restart");
//endgame status
let status = $("#winOrLose");
//audio var for pausing later
let audio;

//checks if an element is empty. works more consistently than the empty selector
function isEmpty(element) {
  return !$.trim(element.html());
}

//Bojack Horseman theme song
function playTheme() {
  audio = new Audio("./themesong.mp3");
  audio.play();
}

function initializeGame() {
  //array of player objects
  let playersArray = [
    (bojack = {
      player: "Bojack",
      playerImg: "images/bojack.png",
      healthPoints: 200,
      attackPower: 5,
      counterAttackPower: 10
    }),
    (diane = {
      player: "Diane",
      playerImg: "images/diane.png",
      healthPoints: 100,
      attackPower: 25,
      counterAttackPower: 25
    }),
    (carolyn = {
      player: "Princess Carolyn",
      playerImg: "images/princesscarolyn.png",
      healthPoints: 150,
      attackPower: 8,
      counterAttackPower: 16
    }),
    (todd = {
      player: "Todd",
      playerImg: "images/todd.png",
      healthPoints: 125,
      attackPower: 14,
      counterAttackPower: 21
    }),
    (peanutbutter = {
      player: "Mr. Peanutbutter",
      playerImg: "images/peanutbutter.png",
      healthPoints: 175,
      attackPower: 11,
      counterAttackPower: 22
    })
  ];

  //empty vars/divs/show playerBox/hide winLose status
  player = null;
  opponent = null;
  $(".playerBox").empty();
  $(".playerBox").show();
  $(".remainingEnemies").empty();
  $(".currentOpponent").empty();
  $(".playerCharacter").empty();
  status.hide();

  //loops through and populates each div for the starting character selection with image, name, and HP
  $.each(playersArray, function(index, player) {
    //creates a div with the class Player and ID of whatever the current index is
    let characterDiv = $("<div>")
      .addClass("player")
      .attr("id", index);
    //appends this div to the playerBox div
    $(".playerBox").append(characterDiv);
    //add img/text/HP to the div created above
    $("#" + index).prepend("<img src=" + player.playerImg + ">");
    $("#" + index).prepend(player.player);
    $("#" + index).append(
      "<span id='HP'> HP: " + player.healthPoints + " </span>"
    );
  });

  //upon clicking one of the 5 player options
  $(".player").on("click", function() {
    //if player charater div is empty (aka they haven't picked their character yet)
    if (isEmpty($(".playerCharacter"))) {
      //hide reset button  and play theme once game starts
      restart.hide();
      playTheme();
      //grab the ID of the parent div and use as index to grab correct object from array and store in variable player
      let playerIndex = parseInt(
        $(this)
          .closest("div")
          .prop("id")
      );
      player = playersArray[playerIndex];
      //move selected character to player div
      $(this).appendTo(".playerCharacter");
      //loops through players array
      $.each(playersArray, function(index, player) {
        //creates var to find the ID of each unpicked character
        let characterIndex = parseInt(
          $(".playerBox")
            .children("div")
            .prop("id")
        );
        //this ID will never match the playerIndex ID from above
        if (playerIndex != characterIndex) {
          // move them to remainingEnemies div and hide the playerBox
          $("#" + characterIndex).appendTo(".remainingEnemies");
          $(".playerBox").hide();
        }
      });

      //if the user clicks on something in the remaining enemies div
    } else if ($(this).parents(".remainingEnemies").length) {
      //and the current opponent div is empty
      if (isEmpty($(".currentOpponent"))) {
        // move to current opponent div
        $(this).appendTo(".currentOpponent");
        //store the object in var opponent
        let opponentId = parseInt(
          $(this)
            .closest("div")
            .prop("id")
        );
        opponent = playersArray[opponentId];
      }
    }
  });
}

initializeGame();

//when user clicks attack button
$("#attack").on("click", function() {
  //if opponent has been picked
  if (opponent) {
    //decrease health variables accordingly
    player.healthPoints -= opponent.counterAttackPower;
    opponent.healthPoints -= player.attackPower;
    //update HP text and increase player attack power
    $(".playerCharacter")
      .find("span")
      .html("HP: " + player.healthPoints);
    $(".currentOpponent")
      .find("span")
      .html("HP: " + opponent.healthPoints);
    player.attackPower += player.attackPower;

    //if player dies
    if (player.healthPoints <= 0) {
      //show restart button and loser text. Pause Audio
      restart.show();
      status.show();
      $("#winOrLose").html("YOU LOSE");
      audio.pause();
      //if opponent dies clear out current opponent div so another player can be picked
    } else if (opponent.healthPoints <= 0) {
      $(".currentOpponent").empty();
      //set opponent to null so player click picks up new object
      opponent = null;
      //if both players dies at the same time - player still loses
    } else if (opponent.healthPoints <= 0 && player.healthPoints <= 0) {
      //show restart button and loser text. Pause Audio
      restart.show();
      status.show();
      $("#winOrLose").html("YOU LOSE");
      audio.pause();
    }
    // if player wins
    if (isEmpty($(".remainingEnemies")) && player.healthPoints > 0) {
      //show restart button and loser text. Pause Audio
      restart.show();
      status.show();
      $("#winOrLose").html("YOU WIN");
      audio.pause();
    }
  }
});

//RUNNING THE GAME (functions are great)

restart.on("click", function() {
  initializeGame();
});
