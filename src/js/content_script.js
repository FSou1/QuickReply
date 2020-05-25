import insertTextAtCursor from 'insert-text-at-cursor';
import findFocusedElem from 'find-focused-element';
import { service } from '../svelte/reply/service.js';
import { format } from './lib/format.js';

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

  insertTextAtCursor(element, textToInsert);
}
