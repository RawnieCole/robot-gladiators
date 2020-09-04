// Game States
// "WIN" - Player Robot Has Defeated All Enemy Robots
//      *  Fight All Enemy Robots
//      *  Defeat Each Enemy Robot
// "LOSE" - Player Robot's Health Is Zero or Less

var playerName = window.prompt( "What Is Your Robot's Name?" );
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = [ "Roborto", "Amy Android", "Robo Trumble" ];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function ( enemyName ) {
    // Repeat And Execute As Long As The Enemy Robot Is Alive
    while ( enemyHealth > 0 && playerHealth > 0 ) {

        // Ask User If They Would Like To Fight Or Skip This Battle
        var promptFight = window.prompt( "Would You Like Yo FIGHT Or SKIP This Battle?  Enter 'FIGHT' Or 'SKIP' To Choose." );

        // If Player Picks "Skip" Confirm And Then Stop The Loop
        if ( promptFight === "skip" || promptFight === "SKIP" ) {
            // Confirm User Wants To Skip
            var confirmSkip = window.confirm( "Are You Sure You'd Like To Quit?" );

            // If Yes (True), Leave Fight
            if ( confirmSkip ) {
                window.alert( playerName + " Has Decided To Skip This Fight.  Goodbye!" );
                // Subtract Money From playerMoney for Skipping
                // Add Math Object
                playerMoney = Math.max( 0, playerMoney - 10 );
                console.log( "playerMoney", playerMoney );
                break;
            }
        }

        // Remove Enemy's Health By Subtracting The Amount Set In The playerAttack Variable
        // Generate Random Value Based On Player's Attack Power
        var damage = randomNumber( playerAttack - 3, playerAttack );

        enemyHealth = Math.max( 0, enemyHealth - damage );
        console.log(
            playerName + " Attacked " + enemyName + '.' + enemyName + " Now Has " + enemyHealth + " Health Remaining."
        );

        // Check Enemy's Health
        // If The Enemy Robot's Health Is Zero Or Less, Exit From The Fight Loop.
        if ( enemyHealth <= 0 ) {
            window.alert( enemyName + " Has Died!" );

            // Award Player Money For Winning
            playerMoney = playerMoney + 20;

            // Leave while() Loop Since Enemy Is Dead
            break;
        } else {
            window.alert( enemyName + " Still Has " + enemyHealth + " Health Left." );
        }

        // Remove Player's Health By Subtracting The Amount Set In The enemyAttack Variable
        // Generate Random Damage Value Based on Enemy's Attack Power
        var damage = randomNumber( enemyAttack - 3, enemyAttack );

        playerHealth = Math.max( 0, playerHealth - damage );
        console.log(
            enemyName + " Attacked " + playerName + '.' + playerName + " Now Has " + playerHealth + " Health Remaining."
        );

        // Check Player's Health
        if ( playerHealth <= 0 ) {
            window.alert( playerName + " Has Died!" );
            // Leave while() Loop If Player Is Dead
            break;
        } else {
            window.alert( playerName + " Still Has " + playerHealth + " Health Left." );
        }
    }
};

// Function To Start A New Game
var startGame = function () {
    // Reset Player Stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for ( var i = 0; i < enemyNames.length; i++ ) {
        if ( playerHealth > 0 ) {
            // Let Player Know What Round They Are In, Remember That Arrays Start At 0 So It Needs To Have 1 Added To It
            window.alert( "Welcome To Robot Gladiators!  Round " + ( i + 1 ) );

            // Pick New Enemy To Fight Based On The Index Of The enemyNames Array
            var pickedEnemyName = enemyNames[ i ];

            // Reset enemyHealth Before Starting New Fight
            // Add Math.random() Function To Generate A Random Numeric Value
            enemyHealth = randomNumber( 40, 60 );

            // Use Debugger To Pause Script From Running And Check What's Going On At That Moment In The Code
            // debugger;

            // Pass The pickedEnemyName Variable's Value Into The Fight Function, Where It Will Assume The Value Of The enemyName Parameter
            fight( pickedEnemyName );

            // If Player Is Still Alive and We're Not At The Last Enemy In The Array
            if ( playerHealth > 0 && i < enemyNames.length - 1 ) {
                // Ask If Player Wants To Use The Store Before Next Round
                var storeConfirm = window.confirm( "The Fight Is Over, Visit The Store Before The Next Round?" );

                // If Yes, Take Them To The store() Function
                if ( storeConfirm ) {
                    shop();
                }

            }
        }
        else {
            window.alert( "You Have Lost Your Robot In Battle!  Game Over!" );
            break;
        }
    }

    // After The Loop Ends, Player Is Either Out Of Health Or Enemies To Fight, So Run The endGame Function 
    endGame();
};

// Function To End The Entire Game
var endGame = function () {
    // If Player Is Stil Alive, Player Wins!
    if ( playerHealth > 0 ) {
        window.alert( "Great Job, You've Survived The Game!  You Now Have A Score Of " + playerMoney + "." );
    }
    else {
        window.alert( "You've Lost Your Robot In Battle." );
    }

    // Ask Player If They'd Like To Play Again
    var playAgainConfirm = window.confirm( "Would You Like To Play Again?" );

    if ( playAgainConfirm ) {
        // Restart The Game
        startGame();
    }
    else {
        window.alert( "Thank You For Playing Robot Gladiators!  Come Back Soon!" );
    }
}

// Shop Function
var shop = function () {
    // Ask Player What They'd Like To Do
    var shopOptionPrompt = window.prompt(
        "Would You Like To REFILL Your Health, UPGRADE Your Attack, Or LEAVE The Store?  Please Enter One:  'REFILL', 'UPGRADE', Or 'LEAVE' To Make A Choice."
    );

    // Use Switch To Carry Out Action
    switch ( shopOptionPrompt ) {
        case "REFILL":
        case "refill":
            if ( playerMoney >= 7 ) {
                window.alert( "Refilling Player's Health By 20 For 7 Dollars." );

                // Increase Health And Decrease Money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert( "You Don't Have Enough Money!" );
            }

            break;
        case "UPGRADE":
        case "upgrade":
            if ( playerMoney >= 7 ) {
                window.alert( "Upgrading Player's Attack By 6 For 7 Dollars." );

                // Increase Attack And Decrease Money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert( "You Don't Have Enough Money!" );
            }

            break;
        case "LEAVE":
        case "leave":
            window.alert( "Leaving The Store." );

            // Do Nothing, So Function Will End
            break;
        default:
            window.alert( "You Did Not Pick A Valid Option.  Try Again." );

            // Call shop() Again To Force Player To Pick A Valid Option
            shop();
            break;
    }
};

// Function To Generate A Random Numeric Value
var randomNumber = function ( min, max ) {
    var value = Math.floor( Math.random() * ( max - min + 1 ) + min );

    return value;
};

// Start The Game When The Page Loads
startGame();