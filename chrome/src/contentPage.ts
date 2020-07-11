import findFocusedElem from 'find-focused-element';
import { format } from './lib/format';
import { copyText, pasteText } from './lib/clipboard';
import { service } from '../../shared/service.js';

chrome.runtime.onMessage.addListener(requestHandler);

function onContextClick(request) {
  const focusedElem = findFocusedElem(window.document);
  if (!focusedElem) {
    throw new Error('focusedElem was not found');
  }

  const replyId = request.menuItemId;
  if (!replyId) {
    throw new Error('replyId was null or empty');
  }

  service.get(replyId).then((reply) => {
    if (reply) {
      const content = format(reply, window.document);

      insertAtCursor(focusedElem, content);
    }
  });
}

function onPasteReply(request) {
  const focusedElem = findFocusedElem(window.document);
  if (!focusedElem) {
    throw new Error('focusedElem was not found');
  }

  const replyIndex = request.replyIndex;
  if (!replyIndex) {
    throw new Error('replyId was invalid');
  }

  service.take(replyIndex).then((reply) => {
    if (reply) {
      const content = format(reply, window.document);

      insertAtCursor(focusedElem, content);
    }
  });
}

function requestHandler(request) {
  switch (request.action) {
    case 'paste-reply': {
      onPasteReply(request);
      break;
    }
    case 'context-click': {
      onContextClick(request);
      break;
    }
    default:
      throw new Error('Unexpected request action');
  }
}

function insertAtCursor(element, textToInsert) {
  if (!element) {
    throw new Error('Unexpected input' + element);
  }

  if (!textToInsert) {
    return;
  }

  copyText(textToInsert);

  pasteText(element);
}
