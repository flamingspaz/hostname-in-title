const protocolPref = document.querySelector("#protocolEnabled");
const pathPref = document.querySelector("#pathEnabled");

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    protocol: protocolPref.checked,
    path: pathPref.checked
  });
}

function restoreOptions() {

  function setPrefs(result) {
    protocolPref.checked = result.protocol || false;
    pathPref.checked = result.path || false;
  }

  var getting = browser.storage.local.get();
  getting.then(setPrefs, e => console.error(error));
}

document.addEventListener("DOMContentLoaded", restoreOptions);
protocolPref.addEventListener("change", saveOptions);
pathPref.addEventListener("change", saveOptions);
