import { parser as linkedInParser } from './linked_in.js';
import { parser as facebookParser } from './facebook.js';

function createFactory() {
  return {
    create: function(location) {
      if(!location || !location.href) {
        throw new Error('Unable to create a DOM factory: invalid `location` argument');
      }

      if(location.href.includes('linkedin')) {
        return linkedInParser;
      }

      if(location.href.includes('facebook')) {
        return facebookParser;
      }

      return null;
    }
  }
}

export const factory = createFactory();