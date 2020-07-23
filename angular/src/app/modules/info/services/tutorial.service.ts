import { Injectable } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';

@Injectable({ providedIn: 'root' })
export class TutorialService {
  constructor(private shepherdService: ShepherdService) {}

  startTutorial(): void {
    this.shepherdService.defaultStepOptions = {
      cancelIcon: {
        enabled: true,
      },
      scrollTo: true,
    };
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps([
      {
        title: 'Welcome to QuickReply 👋',
        text: `
        <p>It's amazing to welcome a new user!</p>
        <p>Would you like to get a quick walkthrough on how to use the QuickReply application?</p>`,
        buttons: [
          {
            text: 'Close',
            type: 'cancel',
            secondary: true,
          },
          {
            text: 'Yes please!',
            type: 'next',
          },
        ],
      },

      {
        title: 'Why QuickReply 🎯',
        text: `
        QuickReply features simplify your life and business.
        <ul>
          <li>Annoyed by copying and pasting the same text from time to time?</li>
          <li>Tired of storing notes in files and sticky notes?</li>
          <li>Want to personalize your messages quickly?</li>
        </ul>
        ✔️ Let us help you to solve these issues once and for all.`,
        buttons: [
          {
            text: 'Next',
            type: 'next',
          },
        ],
      },

      {
        title: 'How to add a new reply',
        text: `<img src="assets/img/tutorial/tutorial-add-reply.gif" width="450" />`,
        buttons: [
          {
            text: 'Back',
            type: 'back',
            secondary: true,
          },
          {
            text: 'Next',
            type: 'next',
          },
        ],
      },

      {
        title: 'How to paste the reply',
        text: `
        <img src="assets/img/tutorial/tutorial-paste-reply.gif" width="450" />
        <b>Tip</b>: You can also use hotkeys (Alt + 1, 2, 3) to paste appropriate replies.
        `,
        buttons: [
          {
            text: 'Back',
            type: 'back',
            secondary: true,
          },
          {
            text: 'Next',
            type: 'next',
          },
        ],
      },

      {
        title: 'Get in touch with us 💌',
        text: `Report a bug, send a feature request, and leave feedback. We appreciate it.`,
        attachTo: {
          element: '.chrome_web_store_icon',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Back',
            type: 'back',
            secondary: true,
          },
          {
            text: 'Next',
            type: 'next',
          },
        ],
      },

      {
        title: 'That is all for now ✌️',
        text: `
        <p>We hope this walkthrough helps you get started with the application and makes your day-to-day work easier.</p>
        <p>Cheers!</p>
        `,
        attachTo: {
          element: '.chrome_web_store_icon'
        },
        buttons: [
          {
            text: 'Back',
            type: 'back',
            secondary: true,
          },
          {
            text: 'Close',
            type: 'next',
          },
        ],
      },
    ]);
    this.shepherdService.start();
  }
}
