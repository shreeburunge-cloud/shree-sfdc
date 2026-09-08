import { LightningElement } from 'lwc';

export default class RegexValidation extends LightningElement {

    handleSubmit() {
        const inputs = this.template.querySelectorAll('lightning-input');
        let isValid = true;

        inputs.forEach(input => {
            input.reportValidity();
            if (!input.checkValidity()) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('All validations passed!');
        } else {
            alert('Please correct the highlighted fields.');
        }
    }
}