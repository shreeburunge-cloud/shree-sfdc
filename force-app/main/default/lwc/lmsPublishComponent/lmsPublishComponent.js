import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import INPUT_CHANNEL from '@salesforce/messageChannel/InputMessageChannel__c';

export default class Sender extends LightningElement {

    name = '';

    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.name = event.target.value;
    }

    sendMessage() {
        const payload = {
            inputValue: this.name
        };

        publish(this.messageContext, INPUT_CHANNEL, payload);
    }
}