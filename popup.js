document.addEventListener('DOMContentLoaded', function () {
  console.log('Popup loaded.');

  // Restore saved preferences
  chrome.storage.sync.get(['language', 'experience', 'partTime'], function (data) {
    if (data.language) document.getElementById('language').value = data.language;
    if (data.experience) document.getElementById('experience').value = data.experience;
    if (data.partTime) document.getElementById('partTime').value = data.partTime;
  });

  // Save preferences and apply filters
  document.getElementById('saveBtn').addEventListener('click', function () {
    console.log('Save button clicked.');
    
    const language = document.getElementById('language').value;
    const experience = document.getElementById('experience').value;
    const partTime = document.getElementById('partTime').value;

    chrome.storage.sync.set({
      language: language,
      experience: experience,
      partTime: partTime
    }, function () {
      console.log('Preferences saved.');

      // Notify user of success
      alert('Preferences saved! Applying filters...');

      // Send a message to the background script to inject the content script
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.runtime.sendMessage({ action: "injectScript" });
        // Close the popup
        window.close();
      });
    });
    window.location.reload();
  });
});
