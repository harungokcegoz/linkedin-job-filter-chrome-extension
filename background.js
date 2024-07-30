// background.js

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "injectScript") {
    if (sender.tab && sender.tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        files: ['content.js']
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Script injection failed: ", chrome.runtime.lastError);
        } else {
          console.log("Content script injected successfully.");
        }
      });
    }
  }
});
