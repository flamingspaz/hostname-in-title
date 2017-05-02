const title = document.querySelector('title');
let observer = new MutationObserver(function(mutations) {
    changeTitle();
});
const config = { subtree: true, characterData: true, childList: true };
let protocolEnabled, pathEnabled, protocol, path;

let getting = browser.storage.local.get();
getting.then(setExtraOptions, e => console.error(error));

observer.observe(title, config);
window.addEventListener ("load", changeTitle, false);

function setExtraOptions(item) {
        protocolEnabled = item.protocol;
        pathEnabled = item.path;
}

function prepHostname() {
    protocol = (protocolEnabled ? `${window.location.protocol}//` : "");
    path = (pathEnabled ? window.location.pathname : "");
    return ` - ${protocol}${window.location.hostname}${path}`;
}

function changeTitle() {
    let hostname = prepHostname();
    if (!document.title.includes(hostname)) {
        observer.disconnect();
        document.title = document.title + hostname;
        observer.observe(title, config);
    }
}
