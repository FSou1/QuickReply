import { factory } from '../dom/factory.js';

export function format(reply, document) {
  if(!reply) {
    throw new Error('Unable to format a reply: Reply is null or empty');
  }

  const content = reply.content;
  if (!content) {
    throw new Error('Unable to format a reply: content is missing');
  }

  const parser = factory.create(document.location);
  if (!parser) {
    return content;
  }

  return content
    .replace('{first_name}', parser.extractFirstName(document))
    .replace('{full_name}', parser.extractFullName(document));
}
