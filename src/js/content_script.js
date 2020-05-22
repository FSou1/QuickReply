import insertTextAtCursor from 'insert-text-at-cursor';
import findFocusedElem from 'find-focused-element';
import { service } from '../svelte/reply/service.js';

function requestHandler(request, sender, sendResponse) {
  let focusedElem;

  if (request && request.action === 'context-click' && request.menuItemId) {
    focusedElem = findFocusedElem(window.document);
    if (!focusedElem) {
      throw new Error('focusedElem was not found');
    }

    const replyId = request.menuItemId;
    if (!replyId) {
      throw new Error('replyId was null or empty');
    }

    service.get(replyId).then((data) => {
      if (data) {
        insertAtCursor(focusedElem, data.content);
      }
    });
  }
}

chrome.runtime.onMessage.addListener(requestHandler);

function insertAtCursor(element, textToInsert) {
  if (!element) {
    throw new Error('Unexpected input' + element);
  }

  if (!textToInsert) {
    return;
  }

  insertTextAtCursor(element, textToInsert);
}
