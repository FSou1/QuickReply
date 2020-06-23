import { parser as linkedInParser } from './linked_in.js'
import { parser as facebookParser } from './facebook.js'
import { parser as gmailParser } from './gmail.js'

function createFactory () {
  return {
    create: function (location) {
      if (!location || !location.href) {
        throw new Error('Unable to create a DOM factory: invalid `location` argument')
      }

      if (location.href.includes('linkedin')) {
        return linkedInParser
      }

      if (location.href.includes('facebook')) {
        return facebookParser
      }

      if (location.href.includes('mail.google.com')) {
        return gmailParser
      }

      return null
    }
  }
}

export const factory = createFactory()
