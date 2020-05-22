import { Guid } from 'guid-typescript';
import { service } from '../svelte/reply/service.js';

export function onClick(info, tab) {
  chrome.tabs.sendMessage(tab.id, { action: 'context-click', menuItemId: info.menuItemId });
}

export function createContextMenu(parentId, nodes) {
  for (var node of nodes) {
    chrome.contextMenus.create({
      id: node.id,
      title: node.title,
      contexts: ['editable'],
      parentId: parentId,
      onclick: onClick
    });

    if (node.id && node.nodes) {
      createContextMenu(node.id, node.nodes);
    }
  }
}

export function buildNode(reply) {
  return {
    id: reply.id,
    title: reply.displayName
  };
}

export function buildNodes(replies) {
  const root = {
    id: Guid.raw(),
    title: 'QuickReply',
    nodes: replies.map(buildNode),
  };
  return [root];
}

service.getAll().then((replies) => {
  const nodes = buildNodes(replies);
  return createContextMenu(null, nodes);
});

chrome.browserAction.setPopup({ popup: '' });

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'options.html' });
});
