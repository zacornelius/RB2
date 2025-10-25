// Bypass Management Systems - Force Pure Gameplay
console.log("Loading management bypass...");

// Override GameMaker room transitions to skip management screens
setTimeout(function() {
    console.log("Setting up room bypass system...");
    
    // List of rooms to bypass (management/menu screens)
    const bypassRooms = [
        'rm_draft',
        'rm_playoffs', 
        'rm_records',
        'rm_season',
        'rm_menu_main',
        'rm_team_management',
        'rm_player_management',
        'rm_stats',
        'rm_achievements'
    ];
    
    // Override room creation functions
    bypassRooms.forEach(function(roomName) {
        try {
            const funcName = 'gml_Script_gml_Room_' + roomName + '_Create';
            if (typeof window[funcName] !== 'undefined') {
                console.log('Overriding', funcName);
                window[funcName] = function() {
                    console.log('Bypassed', roomName, '- redirecting to gameplay');
                    // Try to go directly to team selection or gameplay
                    goToGameplay();
                    return false;
                };
            }
        } catch (e) {
            console.log('Could not override', roomName, ':', e);
        }
    });
    
    // Force gameplay mode
    if (typeof window.global !== 'undefined') {
        // Set game state to bypass all management
        window.global.arcade_mode = true;
        window.global.week = 1;
        window.global.season = 1;
        window.global.skip_all_management = true;
        
        // Unlock all teams
        window.global.unlocked_teams = 4294967295; // All bits set
        
        console.log("Arcade mode activated");
    }
    
}, 2000);

// Function to force gameplay
function goToGameplay() {
    console.log("Forcing gameplay mode...");
    
    try {
        // Try different approaches to start gameplay
        if (typeof window.gml_Script_gml_Room_rm_choose_team_Create !== 'undefined') {
            console.log("Going to team selection");
            window.gml_Script_gml_Room_rm_choose_team_Create();
        } else if (typeof window.gml_Script_gml_Room_rm_game_Create !== 'undefined') {
            console.log("Going directly to game");
            window.gml_Script_gml_Room_rm_game_Create();
        } else {
            console.log("Could not find gameplay functions");
        }
    } catch (error) {
        console.log("Error forcing gameplay:", error);
    }
}

// Add click handler to canvas for direct gameplay
setTimeout(function() {
    const canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.addEventListener('dblclick', function() {
            console.log("Double-click detected - attempting direct gameplay");
            goToGameplay();
        });
    }
}, 5000);

console.log("Management bypass loaded - Double-click canvas for direct gameplay");
