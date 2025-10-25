// Remove All Schedule Logic - Pure Play Mode
console.log("Loading no-schedule mode...");

setTimeout(function() {
    console.log("Removing all schedule logic...");
    
    try {
        // Override schedule-related functions
        if (typeof window.global !== 'undefined') {
            // Force game into free play mode
            window.global.free_play_mode = true;
            window.global.week = 1;
            window.global.season = 1;
            window.global.schedule_enabled = false;
            window.global.no_schedule = true;
            
            console.log("Free play mode activated - no schedule");
        }
        
        // Override schedule loading functions
        if (typeof window.gml_Script_scr_load_schedule !== 'undefined') {
            window.gml_Script_scr_load_schedule = function() {
                console.log("Schedule loading blocked");
                return false;
            };
        }
        
        // Override week advancement
        if (typeof window.gml_Script_scr_advance_week !== 'undefined') {
            window.gml_Script_scr_advance_week = function() {
                console.log("Week advancement blocked - staying in free play");
                return false;
            };
        }
        
        // Override season progression
        if (typeof window.gml_Script_scr_next_game !== 'undefined') {
            window.gml_Script_scr_next_game = function() {
                console.log("Next game blocked - use Play button instead");
                return false;
            };
        }
        
        // Force the game to always show "Play" option
        if (typeof window.gml_Script_scr_check_game_available !== 'undefined') {
            window.gml_Script_scr_check_game_available = function() {
                console.log("Game always available in free play mode");
                return true;
            };
        }
        
    } catch (error) {
        console.log("Error removing schedule logic:", error);
    }
}, 2000);

console.log("No-schedule mode loaded - Pure play functionality only");
