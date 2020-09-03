// Game States
// "WIN" - Player Robot Has Defeated All Enemy Robots
//      *  Fight All Enemy Robots
//      *  Defeat Each Enemy Robot
// "LOSE" - Player Robot's Health Is Zero or Less

var playerName = window.prompt( "What is Your Robot's Name?" );
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
        var promptFight = window.prompt( "Would You Like to FIGHT or SKIP This Battle?  Enter 'FIGHT' or 'SKIP' to Choose." );

        // If Player Picks "Skip" Confirm And Then Stop The Loop
        if ( promptFight === "skip" || promptFight === "SKIP" ) {
            // Confirm User Wants To Skip
            var confirmSkip = window.confirm( "Are You Sure You'd Like to Quit?" );

            // If Yes (True), Leave Fight
            if ( confirmSkip ) {
                window.alert( playerName + " Has Decided to Skip This Fight.  Goodbye!" );
                // Subtract Money From playerMoney for Skipping
                playerMoney = playerMoney - 10;
                console.log( "playerMoney", playerMoney );
                break;
            }
        }

        // Remove Enemy's Health By Subtracting The Amount Set In The playerAttack Variable
        enemyHealth = enemyHealth - playerAttack;
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
        playerHealth = playerHealth - enemyAttack;
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

// Execute Function
for ( var i = 0; i < enemyNames.length; i++ ) {
    if ( playerHealth > 0 ) {
        // Let Player Know What Round They Are In, Remember That Arrays Start At 0 So It Needs To Have 1 Added To It
        window.alert( "Welcome to Robot Gladiators!  Round " + ( i + 1 ) );

        // Pick New Enemy To Fight Based On The Index Of The enemyNames Array
        var pickedEnemyName = enemyNames[ i ];

        // Reset enemyHealth Before Starting New Fight
        enemyHealth = 50;

        // Use Debugger To Pause Script From Running And Check What's Going On At That Moment In The Code
        // debugger;

        // Pass The pickedEnemyName Variable's Value Into The Fight Function, Where It Will Assume The Value Of The enemyName Parameter
        fight( pickedEnemyName );
    }
    else {
        window.alert( "You Have Lost Your Robot In Battle!  Game Over!" );
        break;
    }
}

// If Player Choses To Fight, Then Fight
// if ( promptFight === "fight" || promptFight === "FIGHT" ) {
// If No (False), Ask Question Again By Running fight() Again
// else {
//fight();
// }
// else {
// window.alert( "You Need to Pick a Valid Option.  Try Again!" );
// }
