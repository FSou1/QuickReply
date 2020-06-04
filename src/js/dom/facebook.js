function createDomParser() {
  return {
    extractFirstName: extractFirstName,
    extractFullName: extractFullName
  };
}

export const parser = createDomParser();

function extractFullName(document) {
  const defaultValue = null;

  if(!document || !document.querySelector) {
    return defaultValue;
  }

  const element = document.querySelector('a[uid] span');
  if(!element) {
    return defaultValue;
  }

  return element.innerText;
}

function extractFirstName(document) {
  const defaultValue = null;

  const fullName = extractFullName(document);
  if(!fullName) {
    return defaultValue;
  }

  return fullName.split(' ')[0];
}