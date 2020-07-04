import { factory } from '../dom/factory.js';
import { Reply } from '../backgroundPage.js';

export function format (reply: Reply, document: HTMLDocument): string {
  if (!reply) {
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
    .replace(/{first_name}/gi, parser.extractFirstName(document))
    .replace(/{full_name}/gi, parser.extractFullName(document));
}
