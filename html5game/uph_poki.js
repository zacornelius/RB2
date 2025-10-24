console.log("Poki wrapper load");

// Define PokiSDK if not already defined
if (typeof PokiSDK === "undefined") {
    window.PokiSDK = {
        commercialBreak: function() { return Promise.resolve(); },
        rewardedBreak: function() { return Promise.resolve(); },
        init: function() { return Promise.resolve(); },
        gameplayStart: function() { console.log("PokiSDK gameplayStart"); },
        gameplayStop: function() { console.log("PokiSDK gameplayStop"); },
        happyTime: function(magnitude) { console.log("PokiSDK happyTime", magnitude); },
        gameLoadingStart: function() { console.log("PokiSDK gameLoadingStart"); },
        gameLoadingProgress: function(data) { console.log("PokiSDK gameLoadingProgress", data); },
        gameLoadingFinished: function() { console.log("PokiSDK gameLoadingFinished"); },
        getURLParam: function(param) { return null; }
    };
    window.PokiSDK_OK = true;
}
///~
function poki_init_raw() {
  console.log("Poki wrapper init");
  // fix GMS1 bug with iframes
  var ctr = document.getElementById("gm4html5_div_id");
  if (ctr && !ctr.frames) ctr.frames = [];
  return 0;
}
///~
function poki_script_closure_raw(self, other, script, custom) {
  return function (result) {
    window.gml_Script_gmcallback_poki_closure(self, other, script, result, custom);
  };
}

function poki_is_blocked() {
  return !window.PokiSDK_OK;
}

function poki_gameplay_start() {
  if (window.PokiSDK && window.PokiSDK.gameplayStart) {
    window.PokiSDK.gameplayStart();
  }
}

function poki_gameplay_stop() {
  if (window.PokiSDK && window.PokiSDK.gameplayStop) {
    window.PokiSDK.gameplayStop();
  }
}

function poki_happy_time(magnitude) {
  if (window.PokiSDK && window.PokiSDK.happyTime) {
    window.PokiSDK.happyTime(magnitude);
  }
}

///~
function poki_commercial_break_raw(fn) {
  if (window.PokiSDK && window.PokiSDK.commercialBreak) {
    window.PokiSDK.commercialBreak().then(function () {
      fn(true);
    });
  } else
    setTimeout(function () {
      fn(false);
    }, 0);
}

///~
function poki_rewarded_break_raw(fn) {
  if (window.PokiSDK && window.PokiSDK.rewardedBreak) {
    window.PokiSDK.rewardedBreak().then(fn);
  } else
    setTimeout(function () {
      fn(false);
    }, 0);
}

/// https://yal.cc/gamemaker-html5-loading-bar-extended/
var inst = {};
///~
function poki_loadbar(ctx, width, height, total, current, image) {
  if (window.PokiSDK) {
    // if you have your own loadbar, just copy this block in there
    if (window.PokiSDK_loadState == 0) {
      window.PokiSDK_isLoading = 1;
      if (window.PokiSDK.gameLoadingStart) {
        window.PokiSDK.gameLoadingStart();
      }
    }
    if (window.PokiSDK.gameLoadingProgress) {
      window.PokiSDK.gameLoadingProgress({ percentageDone: current / total });
    }
    if (current >= total && window.PokiSDK_loadState != 2) {
      window.PokiSDK_loadState = 2;
      if (window.PokiSDK.gameLoadingFinished) {
        window.PokiSDK.gameLoadingFinished();
      }
    }
  }

  function getv(s) {
    if (window.gml_Script_gmcallback_poki_loadbar) {
      return window.gml_Script_gmcallback_poki_loadbar(inst, null, s, current, total, width, height, image ? image.width : 0, image ? image.height : 0);
    } else return undefined;
  }
  function getf(s, d) {
    var r = getv(s);
    return typeof r == "number" ? r : d;
  }
  function getw(s, d) {
    var r = getv(s);
    return r && r.constructor == Array ? r : d;
  }
  function getc(s, d) {
    var r = getv(s);
    if (typeof r == "number") {
      r = r.toString(16);
      while (r.length < 6) r = "0" + r;
      return "#" + r;
    } else if (typeof r == "string") {
      return r;
    } else return d;
  }
  // get parameters:
  var backgroundColor = getc("background_color", "#FFFFFF");
  var barBackgroundColor = getc("bar_background_color", "#FFFFFF");
  var barForegroundColor = getc("bar_foreground_color", "#242238");
  var barBorderColor = getc("bar_border_color", "#242238");
  var barWidth = getf("bar_width", Math.round(width * 0.6));
  var barHeight = getf("bar_height", 20);
  var barBorderWidth = getf("bar_border_width", 2);
  var barOffset = getf("bar_offset", 10);
  // background:
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  // image:
  var totalHeight, barTop;
  if (image != null) {
    var rect = getw("image_rect");
    if (!rect) rect = [0, 0, image.width, image.height];
    totalHeight = rect[3] + barOffset + barHeight;
    var image_y = (height - totalHeight) >> 1;
    ctx.drawImage(image, rect[0], rect[1], rect[2], rect[3], (width - rect[2]) >> 1, image_y, rect[2], rect[3]);
    barTop = image_y + rect[3] + barOffset;
  } else barTop = (height - barHeight) >> 1;
  // bar border:
  var barLeft = (width - barWidth) >> 1;
  ctx.fillStyle = barBorderColor;
  ctx.fillRect(barLeft, barTop, barWidth, barHeight);
  //
  var barInnerLeft = barLeft + barBorderWidth;
  var barInnerTop = barTop + barBorderWidth;
  var barInnerWidth = barWidth - barBorderWidth * 2;
  var barInnerHeight = barHeight - barBorderWidth * 2;
  // bar background:
  ctx.fillStyle = barBackgroundColor;
  ctx.fillRect(barInnerLeft, barInnerTop, barInnerWidth, barInnerHeight);
  // bar foreground:
  var barLoadedWidth = Math.round((barInnerWidth * current) / total);
  ctx.fillStyle = barForegroundColor;
  ctx.fillRect(barInnerLeft, barInnerTop, barLoadedWidth, barInnerHeight);
}
///~
function poki_get_team_raw() {
  if (window.PokiSDK && window.PokiSDK.getURLParam) {
    return window.PokiSDK.getURLParam("team");
  }
  return null;
}

function poki_set_team_raw(team) {
  return window.parent.postMessage({ type: "RetroBowl_teamSwitch", content: { team } }, "*");
}
