// Game States
// "WIN" - Player Robot Has Defeated All Enemy Robots
//      *  Fight All Enemy Robots
//      *  Defeat Each Enemy Robot
// "LOSE" - Player Robot's Health Is Zero or Less

var fightOrSkip = function () {
    // Ask Player If They'd Like To Fight Or Skip Using Function
    var promptFight = window.prompt( "Would You Like To FIGHT Or SKIP This Battle?  Enter 'FIGHT' or 'SKIP' To Choose." );

    // Conditional Recursive Function Call
    // If The 'promptFight' Is NOT A Valid Value, Then Execute The Following Statements.
    if ( !promptFight ) {
        window.alert( "You Need To Provide A Valid Answer!  Please Try Again!" );
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    // If Player Picks "Skip" Confirm And Then Stop The Loop
    if ( promptFight === "skip" ) {
        // Confirm Player Wants To Skip
        var confirmSkip = window.confirm( "Are You Sure You'd Like To Quit?" );

        // If Yes (True), Leave Fight
        if ( confirmSkip ) {
            window.alert( playerInfo.name + " Has Decided To Skip This Fight.  Goodbye!" );
            // Subtract Money From playerInfo.money For Skipping, But Don't Let Them Go Into The Negative
            // Math Object
            playerInfo.money = Math.max( 0, playerInfo.money - 10 );

            // Return True If Player Wants To Leave
            return true;
        }
    }
}

var fight = function ( enemy ) {
    // Keep Track Of Who Goes First
    var isPlayerTurn = true;

    //Randomly Change Turn Order
    if ( Math.random() > 0.5 ) {
        isPlayerTurn = false;
    }

    // Repeat And Execute As Long As The Enemy Robot Is Alive
    while ( playerInfo.health > 0 && enemy.health > 0 ) {
        if ( isPlayerTurn ) {
            // Ask Player If They'd Like To Fight Or Skip Using fightOrSkip Function
            if ( fightOrSkip() ) {
                // If True, Leave Fight By Breaking Loop
                break;
            }

            var damage = randomNumber( playerInfo.attack - 3, playerInfo.attack );

            // Remove Enemy's Health By Subtracting The Amount Set In The playerInfo.attack Variable
            // Generate Random Value Based On Player's Attack Power
            enemy.health = Math.max( 0, enemy.health - damage );
            console.log(
                playerInfo.name + " Attacked " + enemy.name + ". " + enemy.name + " Now Has " + enemy.health + " Health Remaining." );

            // Check Enemy's Health
            // If The Enemy Robot's Health Is Zero Or Less, Exit From The Fight Loop.
            if ( enemy.health <= 0 ) {
                window.alert( enemy.name + " Has Died!" );

                // Award Player Money For Winning
                playerInfo.money = playerInfo.money + 20;

                // Leave while() Loop Since Enemy Is Dead
                break;
            } else {
                window.alert( enemy.name + " Still Has " + enemy.health + " Health Left." );
            }

            // Player Gets Attacked First
        } else {
            var damage = randomNumber( enemy.attack - 3, enemy.attack );

            // Remove Enemy's Health By Subtracting The Amount We Set In The Damage Variable
            playerInfo.health = Math.max( 0, playerInfo.health - damage );
            console.log(
                enemy.name + " Attacked " + playerInfo.name + " Now Has " + playerInfo.health + " Health Remaing."
            );

            // Check Player's Health
            if ( playerInfo.health <= 0 ) {
                window.alert( playerInfo.name + " Has Died!" );
                // Leave while() Loop If Player Is Dead
                break;
            } else {
                window.alert( playerInfo.name + " Still Has " + playerInfo.health + " Health Left." );
            }
        }
        // Switch Turn Order For Next Round
        isPlayerTurn = !isPlayerTurn;
    }
};

// Function To Start A New Game
var startGame = function () {
    // Reset Player Stats
    playerInfo.reset();

    for ( var i = 0; i < enemyInfo.length; i++ ) {
        if ( playerInfo.health > 0 ) {
            // Let Player Know What Round They Are In, Remember That Arrays Start At 0 So It Needs To Have 1 Added To It
            window.alert( "Welcome To Robot Gladiators!  Round " + ( i + 1 ) );

            // Pick New Enemy To Fight Based On The Index Of The enemy.names Array
            var pickedEnemyObj = enemyInfo[ i ];

            // Reset enemy.health Before Starting New Fight
            // Add Math.random() Function To Generate A Random Numeric Value
            pickedEnemyObj.health = randomNumber( 40, 60 );

            // Use Debugger To Pause Script From Running And Check What's Going On At That Moment In The Code
            // debugger;

            // Pass The pickedenemy.name Variable's Value Into The Fight Function, Where It Will Assume The Value Of The enemy.name Parameter
            fight( pickedEnemyObj );

            // If Player Is Still Alive and We're Not At The Last Enemy In The Array
            if ( playerInfo.health > 0 && i < enemyInfo.length - 1 ) {
                // Ask If Player Wants To Use The Store Before Next Round
                var storeConfirm = window.confirm( "The Fight Is Over!  Visit The Store Before The Next Round?" );

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
    window.alert( "The Game Has Now Ended.  Let's See How You Did!" );

    // Check localStorage For High Score, If It's Not There, Use 0
    var highScore = localStorage.getItem( "highscore" );
    if ( highScore === null ) {
        highScore = 0;
    }

    // If Player Has More Money Than The High Score, Player Has New High Score!
    if ( playerInfo.money > highScore ) {
        localStorage.setItem( "highscore", playerInfo.money );
        localStorage.setItem( "name", playerInfo.name );

        alert( playerInfo.name + " Now Has The High Score Of " + playerInfo.money + "!" );
    }
    else {
        alert( playerInfo.name + " Did Not Beat The High Score of " + highScore + ". Maybe Next Time!" );
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
};

// Shop Function
var shop = function () {
    // Ask Player What They'd Like To Do
    var shopOptionPrompt = window.prompt(
        "Would You Like To REFILL Your Health, UPGRADE Your Attack, Or LEAVE The Store?  Please Enter One Of The Following To Make A Choice:  1 For REFILL, 2 For UPGRADE, Or 3 For LEAVE."
    );

    // Use Switch To Carry Out Action
    shopOptionPrompt = parseInt( shopOptionPrompt );
    switch ( shopOptionPrompt ) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert( "Leaving The Store." );
            // Do Nothing, So Function Will End
            break;
        default:
            window.alert( "You Did Not Pick A Valid Option.  Please Try Again!" );
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

// Function To Set Player Name
var getPlayerName = function () {
    var name = "";

    while ( name === "" || name === null ) {
        name = prompt( "What Is Your Robot's Name?" );
    }

    console.log( "Your Robot's Name Is " + name );
    return name;
};

/* GAME INFORMATION / VARIABLES */
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 20,
    money: 20,
    reset: function () {
        this.health = 100;
        this.attack = 20;
        this.money = 20;
    }, // Comma!
    refillHealth: function () {
        if ( this.money >= 7 ) {
            window.alert( "Refilling Player's Health By 20 For 7 Dollars." );
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert( "Sorry, You Don't Have Enough Money!" );
        }
    }, // Comma!
    upgradeAttack: function () {
        if ( this.money >= 7 ) {
            window.alert( "Upgrading Player's Attack By 10 For 7 Dollars." );
            this.attack += 10;
            this.money -= 7;
        }
        else {
            window.alert( "Sorry, You Don't Have Enough Money!" );
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber( 10, 14 )
    },
    {
        name: "Amy Android",
        attack: randomNumber( 10, 14 )
    },
    {
        name: "Robo Trumble",
        attack: randomNumber( 10, 14 )
    }
];


// Start The Game When The Page Loads
startGame();