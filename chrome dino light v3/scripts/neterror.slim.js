const HIDDEN_CLASS = 'hidden';

let isSubFrame = false;
// if the window is in a subframe/iframe/portal
if (window.top.location !== window.location || window.portalHost) {
    // the root document is set as a subframe emptystring
    document.documentElement.setAttribute('subframe', '');
    isSubFrame = true;
}

function updateIconClass(newClass) {
    // FS is sub or main based on if issubframe true or false (conditional operator "?")
    const frameSelector = isSubFrame ? '#sub-frame-error' : '#main-frame-error';
    const iconEl = document.querySelector(frameSelector + ' .icon');

    if (iconEl.classList.contains(newClass)) {
        return;
    }

    iconEl.className = 'icon ' + newClass;
}

// based on     load_time_data.js
function onDocumentLoad() {
    const iconClass = loadTimeData.valueExists('iconClass') &&
        loadTimeData.getValue('iconClass');
    updateIconClass(iconClass);
    if (!isSubFrame && iconClass === 'icon-offline') {
        document.documentElement.classList.add('offline');
        new Runner('.interstitial-wrapper');
    }
}
// once page is loaded, execute function
document.addEventListener('DOMContentLoaded', onDocumentLoad);