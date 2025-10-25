// Define missing functions to prevent JavaScript errors
window.cpd = function() { 
    return true; 
};

// Mock PokiSDK if not already defined
if (typeof window.PokiSDK === 'undefined') {
    window.PokiSDK = {
        init: function() { console.log('PokiSDK.init called'); },
        gameplayStart: function() { console.log('PokiSDK.gameplayStart called'); },
        gameplayStop: function() { console.log('PokiSDK.gameplayStop called'); },
        commercialBreak: function() { console.log('PokiSDK.commercialBreak called'); },
        rewardedBreak: function() { console.log('PokiSDK.rewardedBreak called'); },
        happyTime: function() { console.log('PokiSDK.happyTime called'); },
        gameLoadingStart: function() { console.log('PokiSDK.gameLoadingStart called'); },
        gameLoadingProgress: function(progress) { console.log('PokiSDK.gameLoadingProgress called:', progress); },
        gameLoadingFinished: function() { console.log('PokiSDK.gameLoadingFinished called'); },
        getURLParam: function(param) { console.log('PokiSDK.getURLParam called:', param); return null; }
    };
}
