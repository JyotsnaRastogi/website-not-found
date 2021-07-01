function addUrlInHTML(url) {
  const liElement = document.createElement('li');
  liElement.innerText = url;
  document.querySelector('.blocked-urls').appendChild(liElement);
}

document.addEventListener('DOMContentLoaded', function() {

    const addUrlButton = document.getElementById('add-url');

    addUrlButton.addEventListener('click', function() {
      const urlPath = document.getElementById('url').value;

      // add url to the storage
      chrome.storage.local.get('blockedUrls', function(result) {
        const blockedUrls = result.blockedUrls || [];
        blockedUrls.push(urlPath);
        chrome.storage.local.set({blockedUrls: blockedUrls}, function() {
          addUrlInHTML(urlPath);
        });
      });
    });

    chrome.storage.local.get('blockedUrls', function(result) {
      const blockedUrls = result.blockedUrls || [];
      for (let i=0; i < blockedUrls.length; i++) {
        addUrlInHTML(blockedUrls[i]);
      }
    });  
});
