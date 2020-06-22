import findFocusedElem from 'find-focused-element';
import { format } from './lib/format.js';
import { copyText, pasteText } from './lib/clipboard.js';
import { service } from '../../shared/service.js';

chrome.runtime.onMessage.addListener(requestHandler);

function requestHandler(request, sender, sendResponse) {
  if (request && request.action === 'context-click' && request.menuItemId) {
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
