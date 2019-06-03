  // holds the player object
  let player;
  //holds the current opponent object
  let opponent;
  //restart button
  let restart = $("#restart")

  //checks if an element is empty. works more consistently than the empty selector
  function isEmpty(element) {
    return !$.trim(element.html());
  }


  //Bojack Horseman theme song
  function playTheme() {
    let audio = new Audio("./themesong.mp3");
    audio.play();
  }

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
    $(".playerCharacter", ".remainingEnemies", ".currentOpponent").empty();

    //loops through and populates each div for the starting character selection with image, name, and HP
    $.each(playersArray, function (index, player) {
      $("#" + index).prepend("<img src=" + player.playerImg + ">");
      $("#" + index).prepend(player.player);
      $("#" + index).append("<span id='HP'> HP: " + player.healthPoints + " </span>");
    })

    //upon clicking one of the 5 player options
    $(".player").on("click", function () {


      //if player charater div is empty (aka they haven't picked their character yet)
      if (isEmpty($(".playerCharacter"))) {
        //hide reset button  and play theme once game starts
        restart.hide();
        playTheme();
        //grab the ID of the parent div and use as index to grab correct object from array and store in variable player
        let playerIndex = parseInt($(this).closest("div").prop("id"));
        player = playersArray[playerIndex];
        //move selected character to player div
        $(this).appendTo(".playerCharacter");
        //if the user clicks on something in the remaining enemies div
      } else if ($(this).parents(".remainingEnemies").length) {
        //and the current opponent div is empty
        if (isEmpty($(".currentOpponent"))) {
          // move to current opponent div
          $(this).appendTo(".currentOpponent");
          //store the object in var opponent
          let opponentId = parseInt($(this).closest("div").prop("id"));
          opponent = playersArray[opponentId];
        }
      }

      //move enemies to remaining enemies div ~I THINK THIS IS THE ISSUE~ MOVE THEM ONE BY ONE USNG A LOOP?
      $(".playerBox").appendTo(".remainingEnemies");
    })
  }

  //when user clicks attack button
  $("#attack").on("click", function () {
    //if opponent has been picked
    if (opponent) {
      //decrease health variables accordingly
      player.healthPoints -= opponent.counterAttackPower;
      opponent.healthPoints -= player.attackPower;
      //update HP and double player attack power
      $(".playerCharacter").find("span").html("HP: " + player.healthPoints);
      $(".currentOpponent").find("span").html("HP: " + opponent.healthPoints);
      player.attackPower = player.attackPower * 2;

      //if player dies
      if (player.healthPoints <= 0) {
        //show restart button and loser text (make a better losing/win screen later)
        restart.show();
        $("#winOrLose").html("YOU LOSE");
        //if opponent dies clear out current opponent div so another player can be picked
      } else if (opponent.healthPoints <= 0) {
        $(".currentOpponent").empty();
        //set opponent to null so player click picks up new object
        opponent = null;
      }
      // if player wins 
      if (isEmpty($(".playerBox"))) {
        //show restart button and loser text (make a better losing/win screen later)
        $("#winOrLose").html("YOU WIN")
        restart.show();
      }
    }
  })


  //RUNNING THE GAME (functions are great)
  initializeGame();
  restart.on("click", function () {
    initializeGame();
  })