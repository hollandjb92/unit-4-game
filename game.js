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
    $(".playerCharacter", ".remainingEnemies", ".currentOpponent", "#HP").empty();

    //loops through and populates each div for the starting character selection with image, name, and HP
    $.each(playersArray, function (index, player) {
      $("#" + index).prepend("<img src=" + player.playerImg + ">");
      $("#" + index).prepend(player.player);
      $("#" + index).append("<span id='HP'> HP: " + player.healthPoints + " </span>");
    })

    //upon clicking one of the 5 player options
    $(".player").on("click", function () {

      //if player doesn't exist or is null
      if (isEmpty($(".playerCharacter"))) {
        restart.hide();
        playTheme();
        //grab the ID of the parent div and use as index to grab correct object from array and store in variable player
        let playerIndex = parseInt($(this).closest("div").prop("id"));
        player = playersArray[playerIndex];
        //move selected character to player div
        $(this).appendTo(".playerCharacter");

      } else if ($(this).parents(".remainingEnemies").length) {
        if (isEmpty($(".currentOpponent"))) {
          $(this).appendTo(".currentOpponent");
          let opponentId = parseInt($(this).closest("div").prop("id"));
          opponent = playersArray[opponentId];
        }
      }

      //move enemies
      $(".playerBox").appendTo(".remainingEnemies");
    })
  }




  $("#attack").on("click", function () {
    if (opponent) {
      //decrease health variables accordingly
      player.healthPoints -= opponent.counterAttackPower;
      opponent.healthPoints -= player.attackPower;

      //update HP and double player attack power
      $(".playerCharacter").find("span").html("HP: " + player.healthPoints);
      $(".currentOpponent").find("span").html("HP: " + opponent.healthPoints);
      player.attackPower = player.attackPower * 2;


      if (player.healthPoints <= 0) {
        restart.show();
        $("#winOrLose").html("YOU LOSE");
      } else if (opponent.healthPoints <= 0) {
        $(".currentOpponent").empty();
        opponent = null;
      }

      if (isEmpty($(".playerBox"))) {
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