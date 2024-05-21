// Initialize with a default instance
let invidiousInstance = 'invidious.lunar.icu';

// Load the user-defined instance URL
function loadInvidiousInstance() {
  browser.storage.sync.get('instanceUrl', function(data) {
    if (data.instanceUrl) {
      invidiousInstance = data.instanceUrl;
      console.log('Invidious instance set to:', invidiousInstance);
    }
  });
}

// Construct the URLs array dynamically
const urlsToRedirect = [
  "www.youtube.com",
  "youtu.be"
];

// Function to construct the pattern for the `urls` array
function constructUrlPatterns(domains) {
  return domains.map(domain => `*://${domain}/*`);
}

// Function to handle the redirection
function redirect(requestDetails) {
  const url = new URL(requestDetails.url);
  let newUrl = null;

  if (urlsToRedirect.includes(url.hostname)) {
    newUrl = url.href.replace(url.hostname, invidiousInstance);
  }

  if (newUrl !== null) {
    return {
      redirectUrl: newUrl
    };
  }

  return null; // No redirection needed
}

// Add the webRequest listener with the dynamically constructed URLs array
browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {
    urls: constructUrlPatterns(urlsToRedirect),
    types: ["main_frame"]
  },
  ["blocking"]
);

// Initial load of the instance
loadInvidiousInstance();

// Reload instance when storage changes
browser.storage.onChanged.addListener(loadInvidiousInstance);
