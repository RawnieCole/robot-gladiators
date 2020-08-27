var playerName = window.prompt( "What is Your Robot's Name?" );
var playerHealth = 100;
var playerAttack = 10;

// You Can Also Log Multiple Values At Once Like This
console.log( playerName, playerAttack, playerHealth );

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function () {
    // Alert Users That They Are Starting The Round
    window.alert( "Welcome to Robot Gladiators!" );

    //Subtract The Value Of 'playerAttack' From The Value Of 'enemyHealth' And use That Result To Update The Value In The 'enemyHealth' Variable
    enemyHealth = enemyHealth - playerAttack;

    // Log A Resulting Message To The Console So We Know That It Worked.
    console.log(
        playerName + " attacked " + enemyName + "." + enemyName + " now has " + enemyHealth + " health remaining."
    );

    //Check Enemy's Health
    if ( enemyHealth <= 0 ) {
        window.alert( enemyName + " Has Died!" );
    }
    else {
        window.alert( enemyName + " still has " + enemyHealth + " health left." );
    }

    // Subtract The Value Of 'enemyAttack' From The Value Of 'playerHealth' And Use That Result To Update The Value In The 'playerHealth' Variable.
    playerHealth = playerHealth - enemyAttack;

    // Log A Resulting Message To The Console So We Know That It Worked.
    console.log(
        enemyName + " attacked " + playerName + "." + playerName + " now has " + playerHealth + " health remaining."
    );

    // Check Player's Health
    if ( playerHealth <= 0 ) {
        window.alert( playerName + " Has Died!" );
    }
    else {
        window.alert( playerName + " still has " + playerHealth + " health left." );
    }

    //Check To See If The Value Of The playerHealth Variable Is Greater Than 0
    // var playerHealth = 100;

    // if ( playerHealth > 0 ) {
    // console.log( "Your Player Is Still Alive!" )
    // }

    // Check To See If The Value Of The playerHealth Variable Is Greater Than 0
    // var playerHealth = 10;

    // if ( playerHealth === 0 ) {
    // console.log( "This Will Not Run." );
    // }
    // else {
    // console.log( "This Will Run Instead." );
    // }
};
// Execute Function
fight();