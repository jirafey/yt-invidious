document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('options-form');
    const instanceUrlInput = document.getElementById('instance-url');
  
    // Load saved instance URL
    browser.storage.sync.get('instanceUrl', function(data) {
      if (data.instanceUrl) {
        instanceUrlInput.value = data.instanceUrl;
      }
    });
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const instanceUrl = instanceUrlInput.value.trim();
      if (instanceUrl) {
        browser.storage.sync.set({ instanceUrl: instanceUrl }, function() {
          alert('Instance URL saved!');
        });
      } else {
        alert('Please enter a valid Invidious instance URL.');
      }
    });
  });
