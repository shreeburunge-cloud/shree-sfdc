import { LightningElement } from 'lwc';

export default class ParentToChildCommunicationParentComp extends LightningElement {
    parentMessage = 'Hello Child!';

    handleChange(event) {
        this.parentMessage = event.target.value;
    }
}