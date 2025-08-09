/* eslint-disable @typescript-eslint/no-explicit-any */
import { service } from '../../shared/service.js';

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

(chrome as any).contextMenus.onClicked.addListener((item, tab) => {
  const request = {
    action: 'context-click',
    menuItemId: item.menuItemId,
  };

  (chrome as any).tabs.sendMessage(tab.id, request);
});

function createMenuItem(id: any, title: string, parentId: string) {
  return {
    id,
    title,
    parentId,
    contexts: ['editable']
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
    (chrome as any).contextMenus.create(item, () => createChildMenuItems(node));
  }
}

function createContextMenu(parentId: string, nodes: MenuItem[]): void {
  (chrome as any).contextMenus.removeAll(() => createMenu(parentId, nodes));
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

  (chrome as any).runtime.onMessage.addListener(requestHandler);
}

function openOptionsOnPopupClick() {
  (chrome as any).action.setPopup({ popup: '' });

  (chrome as any).action.onClicked.addListener(() => {
    (chrome as any).tabs.create({ url: 'index.html?#/options' });
  });
}

function onCommandListener(command) {
  (chrome as any).tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const index = command.split('-#')[1];

    const request = {
      action: 'paste-reply',
      replyIndex: index,
    };

    (chrome as any).tabs.sendMessage(tabs[0].id, request);
  });
}

function subscribeOnHotkeys() {
  (chrome as any).commands.onCommand.addListener(onCommandListener);
}

function subscribeOnInstalled() {
  (chrome as any).runtime.onInstalled.addListener(function (details) {
    if (details.reason == 'install') {
      (chrome as any).tabs.create({ url: 'index.html?#/options?walkthrough=true' });
    }
  });
}

(function () {
  subscribeOnInstalled();
  drawContextMenu();
  subscribeOnRuntimeMessages();
  subscribeOnHotkeys();
  openOptionsOnPopupClick();
})();
