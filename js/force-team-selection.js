// Force Team Selection Script
// This script forces the game to go to the team selection screen

(function() {
    'use strict';
    
    console.log('🏈 Force Team Selection Script Loaded');
    
    // Wait for the game to be fully loaded
    let attempts = 0;
    const maxAttempts = 50;
    
    const tryForceTeamSelection = () => {
        attempts++;
        console.log(`Attempt ${attempts} to force team selection...`);
        
        // Attempt to use poki_set_team_raw
        if (window.poki_set_team_raw) {
            console.log('Using poki_set_team_raw to set teams');
            try {
                window.poki_set_team_raw({ team1: 0, team2: 1 });
                console.log('Teams set using poki_set_team_raw.');
                return;
            } catch (e) {
                console.log('Error using poki_set_team_raw:', e);
            }
        }
        
        // Try to find the game's room system and force team selection
        if (window.gml_Script_gmcallback_room_goto) {
            console.log('Found room goto function, trying to go to team selection room');
            try {
                // Try to go to the choose team room (room ID 3 based on the code)
                window.gml_Script_gmcallback_room_goto(3);
                console.log('Successfully called room goto for team selection');
                return;
            } catch (e) {
                console.log('Error calling room goto:', e);
            }
        }
        
        // Try to find the game's global room variable
        if (window.gml_Global && window.gml_Global.room !== undefined) {
            console.log('Found room variable, setting to team selection room');
            try {
                window.gml_Global.room = 3; // rm_choose_team
                console.log('Set room to team selection');
                return;
            } catch (e) {
                console.log('Error setting room:', e);
            }
        }
        
        // Try to find the game's room system
        if (window.gml_Global && window.gml_Global.room_goto) {
            console.log('Found room_goto function');
            try {
                window.gml_Global.room_goto(3);
                console.log('Called room_goto for team selection');
                return;
            } catch (e) {
                console.log('Error calling room_goto:', e);
            }
        }
        
        // Try to find the game's room system in different ways
        if (window.gml_Global) {
            console.log('Checking gml_Global for room functions...');
            for (let key in window.gml_Global) {
                if (key.toLowerCase().includes('room') || key.toLowerCase().includes('goto')) {
                    console.log('Found potential room function:', key);
                }
            }
        }
        
        // Try to find the game's room system in the global scope
        for (let key in window) {
            if (key.toLowerCase().includes('room') && typeof window[key] === 'function') {
                console.log('Found potential room function in window:', key);
            }
        }
        
        // If we haven't succeeded and haven't exceeded max attempts, try again
        if (attempts < maxAttempts) {
            setTimeout(tryForceTeamSelection, 200);
        } else {
            console.warn('Failed to force team selection after', maxAttempts, 'attempts');
            showTeamSelectionMessage();
        }
    };
    
    function showTeamSelectionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 0, 0.95);
            color: black;
            padding: 20px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        message.innerHTML = `
            <h3>🏈 Team Selection</h3>
            <p>The game should show a team selection screen.</p>
            <p>Look for buttons or menus to select teams.</p>
            <p>If you don't see team selection, try:</p>
            <ul style="text-align: left; margin: 10px 0;">
                <li>Clicking "New Game" or "Start"</li>
                <li>Looking for a "Choose Team" button</li>
                <li>Checking the main menu for team options</li>
            </ul>
            <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 8px 16px; background: #000; color: #00ff00; border: none; border-radius: 5px; cursor: pointer;">
                OK
            </button>
        `;
        document.body.appendChild(message);
    }
    
    // Start trying to force team selection after a short delay
    setTimeout(tryForceTeamSelection, 1000);
    
    // Also try when the page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryForceTeamSelection);
    } else {
        tryForceTeamSelection();
    }
    
})();
