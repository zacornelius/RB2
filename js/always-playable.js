// Always Playable - Force opponent assignment for every game
console.log("Loading always-playable mode...");

setTimeout(function() {
    console.log("Setting up always-playable opponent system...");
    
    try {
        // Override opponent finding functions
        if (typeof window.global !== 'undefined') {
            // Force there to always be an opponent
            window.global.force_opponent = true;
            window.global.always_playable = true;
            
            console.log("Always-playable mode activated");
        }
        
        // Override schedule checking functions to always return a game
        if (typeof window.gml_Script_scr_get_opponent !== 'undefined') {
            window.gml_Script_scr_get_opponent = function() {
                console.log("Forcing random opponent assignment");
                // Return a random team ID as opponent
                var myTeam = window.global.team || 0;
                var opponent;
                do {
                    opponent = Math.floor(Math.random() * 32);
                } while (opponent === myTeam);
                
                console.log("Assigned opponent:", opponent, "vs your team:", myTeam);
                return opponent;
            };
        }
        
        // Override bye week checking
        if (typeof window.gml_Script_scr_is_bye_week !== 'undefined') {
            window.gml_Script_scr_is_bye_week = function() {
                console.log("Bye week check blocked - always return false");
                return false; // Never a bye week
            };
        }
        
        // Override game availability check
        if (typeof window.gml_Script_scr_game_available !== 'undefined') {
            window.gml_Script_scr_game_available = function() {
                console.log("Game availability check - always return true");
                return true; // Game always available
            };
        }
        
        // Force opponent assignment when game loads
        setTimeout(function() {
            assignRandomOpponent();
        }, 5000);
        
    } catch (error) {
        console.log("Error setting up always-playable mode:", error);
    }
}, 2000);

// Function to assign random opponent
function assignRandomOpponent() {
    console.log("Assigning random opponent...");
    
    try {
        if (typeof window.global !== 'undefined') {
            var myTeam = window.global.team || 0;
            var opponent;
            
            // Pick random opponent (not your team)
            do {
                opponent = Math.floor(Math.random() * 32);
            } while (opponent === myTeam);
            
            // Set opponent in game state
            window.global.opponent = opponent;
            window.global.current_opponent = opponent;
            window.global.next_opponent = opponent;
            
            console.log("Random opponent assigned:", opponent, "vs", myTeam);
        }
    } catch (error) {
        console.log("Error assigning opponent:", error);
    }
}

// Add keyboard shortcut to get new random opponent
document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'o') {
        console.log("'O' pressed - assigning new random opponent");
        assignRandomOpponent();
    }
});

console.log("Always-playable mode loaded - Press 'O' for new random opponent");
