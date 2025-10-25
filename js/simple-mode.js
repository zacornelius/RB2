// Simple Mode - Pure Gameplay Only
console.log("Loading Simple Mode...");

// Wait for game to initialize
setTimeout(function() {
    console.log("Initializing Simple Mode - bypassing all management systems");
    
    try {
        // Override game functions to skip management screens
        if (typeof window.gml_Script_gml_Room_rm_draft_Create !== 'undefined') {
            window.gml_Script_gml_Room_rm_draft_Create = function() {
                console.log("Bypassing draft screen");
                return false;
            };
        }
        
        if (typeof window.gml_Script_gml_Room_rm_playoffs_Create !== 'undefined') {
            window.gml_Script_gml_Room_rm_playoffs_Create = function() {
                console.log("Bypassing playoffs screen");
                return false;
            };
        }
        
        if (typeof window.gml_Script_gml_Room_rm_records_Create !== 'undefined') {
            window.gml_Script_gml_Room_rm_records_Create = function() {
                console.log("Bypassing records screen");
                return false;
            };
        }
        
        // Force game to always go to team selection or gameplay
        if (typeof window.global !== 'undefined') {
            // Set flags to skip management systems
            window.global.skip_draft = true;
            window.global.skip_playoffs = true;
            window.global.skip_records = true;
            window.global.simple_mode = true;
            
            console.log("Simple mode flags set");
        }
        
        // Add keyboard shortcut for quick match
        document.addEventListener('keydown', function(e) {
            // Press 'Q' for quick match
            if (e.key.toLowerCase() === 'q') {
                console.log("Quick match requested");
                startQuickMatch();
            }
            // Press 'R' to restart/reset
            if (e.key.toLowerCase() === 'r') {
                console.log("Game restart requested");
                location.reload();
            }
        });
        
    } catch (error) {
        console.log("Error setting up simple mode:", error);
    }
}, 3000);

// Quick match function
function startQuickMatch() {
    console.log("Starting quick match...");
    
    try {
        // Try to force game into gameplay mode
        if (typeof window.gml_Script_gml_Room_rm_game_Create !== 'undefined') {
            console.log("Attempting to start gameplay directly");
            window.gml_Script_gml_Room_rm_game_Create();
        }
        
        // Set random teams if needed
        if (typeof window.global !== 'undefined') {
            window.global.team = Math.floor(Math.random() * 32);
            window.global.opponent = Math.floor(Math.random() * 32);
            console.log("Set random teams:", window.global.team, "vs", window.global.opponent);
        }
        
    } catch (error) {
        console.log("Error starting quick match:", error);
    }
}

// Override save functions to prevent progress saving
window.addEventListener('beforeunload', function() {
    console.log("Preventing save on exit - simple mode");
});

console.log("Simple Mode loaded - Press 'Q' for quick match, 'R' to restart");
