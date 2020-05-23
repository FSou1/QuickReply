function onMenuItemClick(info, tab) {
  chrome.tabs.sendMessage(tab.id, {
    action: 'context-click',
    menuItemId: info.menuItemId,
  });
}

function createMenuItem(id, title, parentId) {
  return {
    id,
    title,
    parentId,
    contexts: ['editable'],
    onclick: onMenuItemClick,
  };
}

function createChildMenuItems(node) {
  if (node.id && node.nodes) {
    createMenu(node.id, node.nodes);
  }
}

function createMenu(parentId, nodes) {
  for (const node of nodes) {
    const item = createMenuItem(node.id, node.title, parentId);
    chrome.contextMenus.create(item, () => createChildMenuItems(node));
  }
}

export function createContextMenu(parentId, nodes) {
  chrome.contextMenus.removeAll(() => createMenu(parentId, nodes));
}
