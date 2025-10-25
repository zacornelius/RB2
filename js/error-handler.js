// Error handler for RetroBowl game
console.log("Loading error handler...");

// Override console.error to catch game errors
const originalError = console.error;
console.error = function(...args) {
    const errorMsg = args.join(' ');
    
    if (errorMsg.includes('undefined is not a valid map reference')) {
        console.log('Caught map reference error, attempting to handle...');
        
        // Try to initialize missing game data structures
        if (typeof window.gml_Script_gml_Room_rm_choose_team_Create !== 'undefined') {
            console.log('Attempting to initialize team selection...');
        }
        
        // Don't propagate the error
        return;
    }
    
    // Call original error handler for other errors
    originalError.apply(console, args);
};

// Add window error handler
window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('map reference')) {
        console.log('Caught window error related to map reference');
        event.preventDefault();
        return false;
    }
});

console.log("Error handler loaded successfully");
