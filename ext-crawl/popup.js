// Store CSS data in the "local" storage area.
const storage = chrome.storage.local;

const message = document.querySelector('#message');
<a href="https://www.flaticon.com/free-icons/nps" title="nps icons">Nps icons created by Abdul-Aziz - Flaticon</a>

// Check if there is CSS specified.
async function run() {
  const items = await storage.get('css');
  if (items.css) {
    const [currentTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

  } else {
    const optionsUrl = chrome.runtime.getURL('vibesquad.html');
    const optionsPageLink = document.createElement('a');
    optionsPageLink.target = '_blank';
  }
}

run();
