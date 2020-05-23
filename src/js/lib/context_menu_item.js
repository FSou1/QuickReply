function createContextMenuItem(reply) {
  return {
    id: reply.id,
    title: reply.displayName
  };
}

export function createContextMenuItems(replies) {
  const root = {
    id: '00000000-0000-0000-0000-000000000000',
    title: 'QuickReply',
    nodes: replies.map(createContextMenuItem),
  };
  return [root];
}