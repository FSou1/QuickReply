import { writable } from 'svelte/store';

function createStore() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    init: (items) => set(items),
    add: (item) => update(n => [...n, item]),
    delete: (item) => update(n => n.filter(i => i.id !== item.id))
  }
}

export const store = createStore();