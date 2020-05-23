function sendMessage(topic) {
  chrome.runtime.sendMessage({ topic });
}

function createExchange() {
  return {
    contextMenu: {
      update: function() {
        sendMessage('update_context_menu');
      }
    },
  };
}

export const exchange = createExchange();