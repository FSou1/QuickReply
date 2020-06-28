function createDomParser () {
  return {
    extractFirstName: extractFirstName,
    extractFullName: extractFullName
  };
}

export const parser = createDomParser();

function extractFullName (document) {
  const defaultValue = null;

  if (!document || !document.querySelector) {
    return defaultValue;
  }

  const element = document.querySelector('input[name=to]');
  if (!element) {
    return defaultValue;
  }

  const text = element.value;
  if (!text) {
    return defaultValue;
  }

  return text.split('<')[0];
}

function extractFirstName (document) {
  const defaultValue = null;

  const fullName = extractFullName(document);
  if (!fullName) {
    return defaultValue;
  }

  return fullName.split(' ')[0];
}
