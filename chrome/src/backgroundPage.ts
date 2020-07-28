/* eslint-disable @typescript-eslint/no-explicit-any */
import { service } from '../../shared/service.js';
import { analytics } from '../../shared/analytics.js';

export class Reply {
  id: string;
  displayName: string;
  content: string;
}

export class MenuItem {
  id: string;
  title: string;
  nodes?: MenuItem[];
}

function createContextMenuItem(reply: Reply): MenuItem {
  return {
    id: reply.id,
    title: reply.displayName,
  };
}

function createContextMenuItems(replies: Reply[]): MenuItem[] {
  const root: MenuItem = {
    id: '00000000-0000-0000-0000-000000000000',
    title: 'QuickReply',
    nodes: replies.map(createContextMenuItem),
  };
  return [root];
}

function onMenuItemClick(info: any, tab: any): void {
  const request = {
    action: 'context-click',
    menuItemId: info.menuItemId,
  };

  chrome.tabs.sendMessage(tab.id, request);
  analytics.event('message', request.action);
}

function createMenuItem(id: any, title: string, parentId: string) {
  return {
    id,
    title,
    parentId,
    contexts: ['editable'],
    onclick: onMenuItemClick,
  };
}

function createChildMenuItems(node: MenuItem): void {
  if (node.id && node.nodes) {
    createMenu(node.id, node.nodes);
  }
}

function createMenu(parentId: string, nodes: MenuItem[]): void {
  for (const node of nodes) {
    const item = createMenuItem(node.id, node.title, parentId);
    chrome.contextMenus.create(item, () => createChildMenuItems(node));
  }
}

function createContextMenu(parentId: string, nodes: MenuItem[]): void {
  chrome.contextMenus.removeAll(() => createMenu(parentId, nodes));
}

function drawContextMenu(): void {
  service.getAll().then((replies) => {
    const nodes = createContextMenuItems(replies);
    return createContextMenu(null, nodes);
  });
}

function subscribeOnRuntimeMessages() {
  function requestHandler(request) {
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

function openOptionsOnPopupClick() {
  chrome.browserAction.setPopup({ popup: '' });

  chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'index.html?#/options' });
  });
}

function onCommandListener(command) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const index = command.split('-#')[1];

    const request = {
      action: 'paste-reply',
      replyIndex: index,
    };

    chrome.tabs.sendMessage(tabs[0].id, request);
    analytics.event('message', request.action);
  });
}

function subscribeOnHotkeys() {
  chrome.commands.onCommand.addListener(onCommandListener);
}

function subscribeOnInstalled() {
  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == 'install') {
      analytics.event('extension', 'install');
      chrome.tabs.create({ url: 'index.html?#/options?walkthrough=true' });
    }
  });
}

function initAnalytics() {
  analytics.init(atob('VUEtMTU4OTU4MTc2LTI='));
}

(function () {
  initAnalytics();
  subscribeOnInstalled();
  drawContextMenu();
  subscribeOnRuntimeMessages();
  subscribeOnHotkeys();
  openOptionsOnPopupClick();
})();
