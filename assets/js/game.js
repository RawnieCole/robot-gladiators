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
    while ( enemyHealth > 0 ) {

        // Ask User If They Would Like To Fight Or Skip This Battle
        var promptFight = window.prompt( "Would You Like to FIGHT or SKIP This Battle?  Enter 'FIGHT' or 'SKIP' to Choose." );

        // If Player Choses To Fight, Then Fight
        if ( promptFight === "fight" || promptFight === "FIGHT" ) {
            // Remove Enemy's Health By Subtracting The Amount Set In The playerAttack Variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " Attacked " + enemyName + "." + enemyName + " Now Has " + enemyHealth + " Health Remaining."
            );

            //Check Enemy's Health
            if ( enemyHealth <= 0 ) {
                window.alert( enemyName + " Has Died!" );
            } else {
                window.alert( enemyName + " Still Has " + enemyHealth + " Health Left." );
            }

            // Remove Player's Health By Subtracting The Amount Set In The enemyAttack Variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " Attacked " + playerName + "." + playerName + " Now Has " + playerHealth + " Health Remaining."
            );

            // Check Player's Health
            if ( playerHealth <= 0 ) {
                window.alert( playerName + " Has Died!" );
            } else {
                window.alert( playerName + " Still Has " + playerHealth + " Health Left." );
            }

            // If Player Choses To Skip
        } else if ( promptFight === "skip" || promptFight === "SKIP" ) {
            // Confirm User Wants To Skip
            var confirmSkip = window.confirm( "Are You Sure You'd Like to Quit?" );

            // If Yes (True), Leave Fight
            if ( confirmSkip ) {
                window.alert( playerName + " Has Decided to Skip This Fight.  Goodbye!" );
                // Subtract Money From playerMoney for Skipping
                playerMoney = playerMoney - 2;
            }

            // If No (False), Ask Question Again By Running fight() Again
            else {
                fight();
            }
        } else {
            window.alert( "You Need to Pick a Valid Option.  Try Again!" );
        }
    }
};

// Execute Function
for ( var i = 0; i < enemyNames.length; i++ ) {
    var pickedEnemyName = enemyNames[ i ];
    enemyHealth = 50;
    fight( pickedEnemyName );
}