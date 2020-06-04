export function copyText(text) {
  const textarea = window.document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.opacity = 0;
  textarea.value = text;
  window.document.body.appendChild(textarea);
  textarea.select();
  window.document.execCommand('copy');
  window.document.body.removeChild(textarea);
}

export function pasteText(element) {
  element.focus();
  window.document.execCommand('paste');
}