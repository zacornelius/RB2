// Core Game Modifications - Remove Unwanted Features
console.log("Loading core game modifications...");

// Wait for game to load, then modify core functions
setTimeout(function() {
    console.log("Applying core modifications to remove unwanted features...");
    
    try {
        // Remove draft functionality
        if (typeof window.gml_Script_scr_draft !== 'undefined') {
            window.gml_Script_scr_draft = function() {
                console.log("Draft system disabled");
                return false;
            };
        }
        
        // Remove playoff functionality  
        if (typeof window.gml_Script_scr_playoffs !== 'undefined') {
            window.gml_Script_scr_playoffs = function() {
                console.log("Playoff system disabled");
                return false;
            };
        }
        
        // Remove records/stats tracking
        if (typeof window.gml_Script_scr_save_records !== 'undefined') {
            window.gml_Script_scr_save_records = function() {
                console.log("Records saving disabled");
                return false;
            };
        }
        
        // Remove season progression
        if (typeof window.gml_Script_scr_advance_season !== 'undefined') {
            window.gml_Script_scr_advance_season = function() {
                console.log("Season progression disabled");
                return false;
            };
        }
        
        // Modify global game state
        if (typeof window.global !== 'undefined') {
            // Disable unwanted systems
            window.global.enable_draft = false;
            window.global.enable_playoffs = false;
            window.global.enable_records = false;
            window.global.enable_season_progression = false;
            
            // Keep only team management and gameplay
            window.global.enable_team_management = true;
            window.global.enable_gameplay = true;
            
            console.log("Core game systems modified");
        }
        
        // Override menu functions to hide unwanted options
        setTimeout(function() {
            hideUnwantedMenuItems();
        }, 5000);
        
    } catch (error) {
        console.log("Error applying core modifications:", error);
    }
}, 3000);

// Function to hide unwanted menu items
function hideUnwantedMenuItems() {
    console.log("Hiding unwanted menu items...");
    
    // Try to find and hide menu elements (this is tricky with GameMaker canvas)
    // We'll override click handlers instead
    const canvas = document.getElementById('canvas');
    if (canvas) {
        // Add our own click handler to intercept menu clicks
        canvas.addEventListener('click', function(e) {
            console.log('Canvas clicked at:', e.offsetX, e.offsetY);
            // We could add logic here to redirect certain menu clicks
        });
    }
}

// Override save functions to prevent unwanted data persistence
if (typeof window.gml_Script_scr_save_game !== 'undefined') {
    const originalSave = window.gml_Script_scr_save_game;
    window.gml_Script_scr_save_game = function() {
        console.log("Filtering save data...");
        // Call original but with modified global state
        if (window.global) {
            // Clear unwanted data before saving
            delete window.global.draft_data;
            delete window.global.playoff_data;
            delete window.global.season_records;
        }
        return originalSave.apply(this, arguments);
    };
}

console.log("Core modifications loaded - Draft/Playoffs/Records systems disabled");
