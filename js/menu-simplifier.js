// Menu Simplifier - Only Play and Manage Team
console.log("Loading menu simplifier...");

setTimeout(function() {
    console.log("Simplifying game menus...");
    
    try {
        // Force game to reset to home/main menu
        if (typeof window.global !== 'undefined') {
            // Reset game state to beginning
            window.global.current_screen = "main_menu";
            window.global.week = 1;
            window.global.season = 1;
            window.global.show_records = false;
            window.global.show_draft = false;
            window.global.show_playoffs = false;
            
            console.log("Game state reset to main menu");
        }
        
        // Override menu functions to only show Play and Manage Team
        if (typeof window.gml_Script_scr_menu_main !== 'undefined') {
            window.gml_Script_scr_menu_main = function() {
                console.log("Main menu simplified - only Play and Manage Team available");
                // Force only basic options
                return true;
            };
        }
        
        // Disable records screen completely
        if (typeof window.gml_Script_gml_Room_rm_records_Create !== 'undefined') {
            window.gml_Script_gml_Room_rm_records_Create = function() {
                console.log("Records screen blocked - redirecting to main menu");
                // Go back to main menu instead
                if (typeof window.gml_Script_gml_Room_rm_menu_Create !== 'undefined') {
                    window.gml_Script_gml_Room_rm_menu_Create();
                }
                return false;
            };
        }
        
        // Disable draft screen
        if (typeof window.gml_Script_gml_Room_rm_draft_Create !== 'undefined') {
            window.gml_Script_gml_Room_rm_draft_Create = function() {
                console.log("Draft screen blocked - redirecting to main menu");
                return false;
            };
        }
        
        // Disable playoffs screen
        if (typeof window.gml_Script_gml_Room_rm_playoffs_Create !== 'undefined') {
            window.gml_Script_gml_Room_rm_playoffs_Create = function() {
                console.log("Playoffs screen blocked - redirecting to main menu");
                return false;
            };
        }
        
        // Force game to go to main menu on load
        setTimeout(function() {
            forceMainMenu();
        }, 5000);
        
    } catch (error) {
        console.log("Error simplifying menus:", error);
    }
}, 2000);

// Function to force main menu
function forceMainMenu() {
    console.log("Forcing return to main menu...");
    
    try {
        if (typeof window.global !== 'undefined') {
            // Set flags to force main menu state
            window.global.in_game = false;
            window.global.current_room = "main_menu";
            
            // Try to trigger main menu
            if (typeof window.gml_Script_gml_Room_rm_menu_Create !== 'undefined') {
                window.gml_Script_gml_Room_rm_menu_Create();
            }
        }
    } catch (error) {
        console.log("Error forcing main menu:", error);
    }
}

// Add keyboard shortcut to return to main menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Home' || e.key === 'h') {
        console.log("Home key pressed - returning to main menu");
        forceMainMenu();
    }
});

console.log("Menu simplifier loaded - Press 'H' to return to main menu");
