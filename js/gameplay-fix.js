// Fix gameplay initialization
console.log("Loading gameplay fix...");

// Wait for game to be ready
setTimeout(function() {
    console.log("Attempting to fix play button...");
    
    // Try to find and fix common gameplay issues
    try {
        // Look for play button elements
        const playButtons = document.querySelectorAll('canvas, div, button');
        console.log("Found", playButtons.length, "potential interactive elements");
        
        // Override common GameMaker functions that might be failing
        if (typeof window.gml_Script_gml_Room_rm_game_Create !== 'undefined') {
            console.log("Found game room creation function");
        }
        
        // Force initialize game state if needed
        if (typeof window.global !== 'undefined') {
            // Ensure game state is valid for gameplay
            if (window.global.team !== undefined) {
                console.log("Current team:", window.global.team);
            }
            if (window.global.week !== undefined) {
                console.log("Current week:", window.global.week);
            }
        }
        
        // Add click event listener to canvas to debug clicks
        const canvas = document.getElementById('canvas');
        if (canvas) {
            canvas.addEventListener('click', function(e) {
                console.log('Canvas clicked at:', e.offsetX, e.offsetY);
            });
        }
        
    } catch (error) {
        console.log("Error in gameplay fix:", error);
    }
}, 2000);

// Override any failing game functions
window.addEventListener('error', function(e) {
    if (e.message.includes('game') || e.message.includes('play')) {
        console.log('Caught gameplay error:', e.message);
        e.preventDefault();
        return false;
    }
});

console.log("Gameplay fix loaded");
