/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core'
import { Reply } from '../models'
import { Guid } from 'guid-typescript'

@Injectable({ providedIn: 'root' })
export class ReplyService {
  key = 'options';

  get (id: string): Promise<Reply> {
    return this.getAll().then((result) => {
      return result.find(i => i.id === id)
    })
  }

  getAll (): Promise<Reply[]> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.key], (result) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message)
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(result[this.key] || [])
        }
      })
    })
  }

  add (item: Reply): Promise<Reply> {
    return this.getAll().then((result) => {
      const entity = { id: Guid.raw(), ...item }
      const items = [...result, entity]
      return this.set(items).then(() => entity)
    })
  }

  update (item: Reply): Promise<Reply> {
    return this.getAll().then((result) => {
      const entity = { ...item }
      const index = result.findIndex(({ id }) => id === entity.id)
      const items = Object.assign([...result], { [index]: entity })
      return this.set(items).then(() => entity)
    })
  }

  remove (item: Reply): Promise<Reply> {
    return this.getAll().then((result) => {
      const items = result.filter(i => i.id !== item.id)
      return this.set(items).then(() => item)
    })
  }

  set (items: Reply[]): Promise<Reply[]> {
    return new Promise((resolve, reject) => {
      const obj = {}
      obj[this.key] = items
      chrome.storage.local.set(obj, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message)
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(items)
        }
      })
    })
  }
}
