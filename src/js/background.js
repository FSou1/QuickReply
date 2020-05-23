import { service } from '../svelte/reply/service.js';
import { createContextMenuItems } from './lib/context_menu_item.js';
import { createContextMenu } from './lib/context_menu.js';

function drawContextMenu() {
  service.getAll().then((replies) => {
    const nodes = createContextMenuItems(replies);
    return createContextMenu(null, nodes);
  });
}

function openOptionsOnPopupClick() {
  chrome.browserAction.setPopup({ popup: '' });

  chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'options.html' });
  });
}

function subscribeOnRuntimeMessages() {
  function requestHandler(request, sender, sendResponse) {
    switch (request.topic) {
      case 'update_context_menu': {
        drawContextMenu();
        break;
      }
      default: {
        throw new Error('Unexpected message topic: ' + request.topic);
      }
    }
  }

  chrome.runtime.onMessage.addListener(requestHandler);
}

(function () {
  drawContextMenu();
  openOptionsOnPopupClick();
  subscribeOnRuntimeMessages();
})();