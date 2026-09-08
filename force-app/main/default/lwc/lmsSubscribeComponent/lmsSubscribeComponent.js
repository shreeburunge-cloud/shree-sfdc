import { LightningElement, wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    MessageContext
} from 'lightning/messageService';

import INPUT_CHANNEL from '@salesforce/messageChannel/InputMessageChannel__c';

export default class Receiver extends LightningElement {

    receivedName = '';
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToChannel();
    }

    disconnectedCallback() {
        if (this.subscription) {
            unsubscribe(this.subscription);
            this.subscription = null;
        }
    }

    subscribeToChannel() {

        if (this.subscription) {
            return;
        }

        this.subscription = subscribe(
            this.messageContext,
            INPUT_CHANNEL,
            (message) => {
                this.receivedName = message.inputValue;
            }
        );
    }
}