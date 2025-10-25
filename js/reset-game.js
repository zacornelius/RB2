// Reset game state
console.log("Resetting game state...");

// Clear local storage
if (typeof(Storage) !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
    console.log("Cleared browser storage");
}

// Clear any game-specific storage
try {
    if (window.gml_Script_gml_GlobalScript_scr_save_game) {
        console.log("Found save function, attempting reset");
    }
    
    // Force reset game variables if they exist
    if (typeof window.global !== 'undefined') {
        window.global.team = -1;
        window.global.season = 1;
        window.global.week = 1;
        window.global.initialized = 0;
        console.log("Reset global game variables");
    }
} catch (e) {
    console.log("Could not reset game variables:", e);
}

console.log("Game reset complete - refresh page");
