import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ExchangeService {
  sendMessage(topic: string): void {
    chrome.runtime.sendMessage({ topic });
  }
}
