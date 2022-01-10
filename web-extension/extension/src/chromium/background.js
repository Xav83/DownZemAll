"use strict";

const application = "com.setvisible.downrightnow";

/* ***************************** */
/* Context Menu                  */
/* ***************************** */
function contextMenusCreateCallback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    }
};

chrome.contextMenus.removeAll(
  function() {
    function addAction(actionId, actionTitle, actionContext) {
      chrome.contextMenus.create({
        id: actionId,
        title: actionTitle,
        contexts: [actionContext]
        }, contextMenusCreateCallback);
    }
    addAction("save-page",      chrome.i18n.getMessage("contextMenuSavePage"),      "page");
    addAction("save-frame",     chrome.i18n.getMessage("contextMenuSaveFrame"),     "frame");
    addAction("save-selection", chrome.i18n.getMessage("contextMenuSaveSelection"), "selection");
    addAction("save-link",      chrome.i18n.getMessage("contextMenuSaveLink"),      "link");
    addAction("save-editable",  chrome.i18n.getMessage("contextMenuSaveEditable"),  "editable");
    addAction("save-image",     chrome.i18n.getMessage("contextMenuSaveImage"),     "image");
    addAction("save-video",     chrome.i18n.getMessage("contextMenuSaveVideo"),     "video");
    addAction("save-audio",     chrome.i18n.getMessage("contextMenuSaveAudio"),     "audio");
    addAction("save-launcher",  chrome.i18n.getMessage("contextMenuSaveLauncher"),  "launcher");
  }
);

chrome.contextMenus.onClicked.addListener(
  function(info, tab) {
           if (info.menuItemId === "save-page"        ) { save_page(info, tab);
    } else if (info.menuItemId === "save-frame"       ) { save_page(info, tab);
    } else if (info.menuItemId === "save-image"       ) { save_image(info, tab);
    } else if (info.menuItemId === "save-audio"       ) { save_image(info, tab);
    } else if (info.menuItemId === "save-launcher"    ) { save_page(info, tab);
    } else if (info.menuItemId === "save-link"        ) { save_link(info, tab);
    } else if (info.menuItemId === "save-selection"   ) { save_page(info, tab);
    } else if (info.menuItemId === "save-video"       ) { save_image(info, tab);
    } else if (info.menuItemId === "save-editable"    ) { save_page(info, tab);
    }
  }
);

function save_page(info, tab) {
  collectDOMandSendData();
}

function save_link(info, tab) {
  const safeUrl = escapeHTML(info.linkUrl);
  sendData("[DOWNLOAD_LINK] " + safeUrl);
}

function save_image(info, tab) {
  const safeUrl = escapeHTML(info.srcUrl);
  sendData("[DOWNLOAD_LINK] " + safeUrl);
}

/* ***************************** */
/* Options                       */
/* ***************************** */
var mySettings = undefined;

function getDownloadActionChoice() {
  function onOptionResponse(response) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      onOptionError(response);
    }
    if (response === undefined) {
      onOptionError(response);
    } else {
      mySettings = response;
      // console.log("Settings changed: " + JSON.stringify(mySettings));
    }
  }
  function onOptionError(error) {
    console.log(`Error: ${error}`);
  }
  chrome.storage.local.get(onOptionResponse);
}

getDownloadActionChoice();

function isSettingAskEnabled() {
  return mySettings === undefined || mySettings.radioApplicationId === undefined || mySettings.radioApplicationId === 1;
}

function getSettingMediaId() {
  if (mySettings === undefined) {
    return -1;
  }
  return mySettings.radioMediaId;
}

function isSettingStartPaused() {
  if (mySettings === undefined) {
    return false;
  }
  return mySettings.startPaused;
}

/* ***************************** */
/* Collect links and media       */
/* ***************************** */
function collectDOMandSendData() {

  function myFunction(myArgument) {
    var restoredSettings = myArgument; // not necessary: JSON.parse(myArgument);
    var hasLinks = true;
    var hasMedia = true;
    var array = "";

    // Options
    if (restoredSettings.radioApplicationId === 1) {
      array += "";

    } else if (restoredSettings.radioApplicationId === 2) {

      if (restoredSettings.radioMediaId === 1) {
        hasMedia = false;
        array += "[QUICK_LINKS]";
        array += " ";

      } else if (restoredSettings.radioMediaId === 2) {
        hasLinks = false;
        array += "[QUICK_MEDIA]";
        array += " ";
      }

      if (restoredSettings.startPaused === true) {
        array += "[STARTED_PAUSED]";
        array += " ";
      }
    }

    // Get the current URL
    const url = document.URL;
    array += "[CURRENT_URL] ";
    array += url;
    array += " ";

    if (hasLinks) {
      // Get all elements of type <a href="..." ></a>
      array += "[LINKS] ";
      var links = document.getElementsByTagName("a");
      var max = links.length;
      var i = 0;
      for (; i < max; i++) {
          array += links[i].href;
          array += " ";
      }
    }

    if (hasMedia) {
      // Get all elements of type <img src="..." />
      array += "[MEDIA] ";
      var pictures = document.getElementsByTagName("img");
      var max = pictures.length;
      var i = 0;
      for (; i < max; i++) {
        array += pictures[i].src;
        array += " ";
      }
    }

    return array;
  }

  var myArgument = JSON.stringify(mySettings);

  // We have permission to access the activeTab, so we can call chrome.scripting.executeScript.
  /* Remark:
   * code: "<some code here>"
   * The value of "<some code here>" is actually the function's code of myFunction.
   * myFunction is interpreted as a string. 
   * Indeed, "(" + myFunction + ")()" is a string, because function.toString() returns function's code.
   */
  var codeToExecute = "(" + myFunction + ")(" + myArgument + ");";

  chrome.scripting.executeScript({
      "func": myFunction,
      "args": [myArgument]
    }, function(results) {  
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
      sendData(results[0]);
    }
  );
}

function collectDOMandSendDataWithWizard() {
  // We *hack* the settings
  var previous = mySettings.radioApplicationId;
  mySettings.radioApplicationId = 1;

  collectDOMandSendData();

  mySettings.radioApplicationId = previous;
}

/* ***************************** */
/* Message                       */
/* ***************************** */
function handleMessage(request, sender, sendResponse) {
  console.log("Message from the options.js: " + JSON.stringify(request));
  mySettings = request;
  sendResponse({response: "ok"});
}

chrome.runtime.onMessage.addListener(handleMessage);

/* ***************************** */
/* Native Message                */
/* ***************************** */
function sendData(links) {
  function onResponse(response) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message);
      onError(response);
    }
    if (response === undefined) {
      onError(response);
    } else {
      console.log("Message from the launcher:  " + response.text);
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var data = "launch " + links;
  console.log("Sending message to launcher:  " + data);
  chrome.runtime.sendNativeMessage(application, { "text": data }, onResponse);
}

/* ***************************** */
/* Misc                          */
/* ***************************** */
// Always HTML-escape external input to avoid XSS
function escapeHTML(str) {
  // https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
  // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
  // Most often this is not the case though.
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
