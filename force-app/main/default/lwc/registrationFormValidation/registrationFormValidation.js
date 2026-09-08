import { LightningElement,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveRegistration from '@salesforce/apex/RegistrationController.saveRegistration';

export default class RegistrationFormValidation extends LightningElement {
    
    @track isLoading = false;
    fullName = '';
    email = '';
    pan = '';
    phone = '';
    dob = '';
    gender = '';
    selectedState = '';
    agreed = false;

    // Picklist and Radio Options
    genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];

    stateOptions = [
        { label: 'Maharashtra', value: 'Maharashtra' },
        { label: 'Rajsthan', value: 'Rajsthan' },
        { label: 'Panjab', value: 'Panjab' },
        { label: 'Gujarat', value: 'Gujarat' },
    ];

    handleChange(event) {
        const field = event.target.dataset.id;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        switch (field) {
            case 'fullName': this.fullName = value; break;
            case 'email': this.email = value; break;
            case 'pan': this.pan = value.toUpperCase(); break;
            case 'phone': this.phone = value; break;
            case 'dob': this.dob = value; break;
            case 'gender': this.gender = value; break;
            case 'state': this.selectedState = value; break;
            case 'terms': this.agreed = value; break;
        }
    }
    validateForm() {
        let isValid = true;
        const inputs = this.template.querySelectorAll('lightning-input, lightning-combobox, lightning-radio-group');

        inputs.forEach(input => {
            input.reportValidity();
        });

        if (!this.fullName || !this.email || !this.pan || !this.phone || !this.dob || !this.gender || !this.selectedState) {
            this.showError('All fields are required.');
            isValid = false;
        } else if (!this.validateEmail(this.email)) {
            this.showError('Invalid email format.');
            isValid = false;
        } else if (!this.validatePAN(this.pan)) {
            this.showError('Invalid PAN format. Example: ABCDE1234F');
            isValid = false;
        } else if (!this.validatePhone(this.phone)) {
            this.showError('Phone number must be 10 digits.');
            isValid = false;
        } else if (!this.agreed) {
            this.showError('You must agree to the terms and conditions.');
            isValid = false;
        }

        return isValid;
    }

    showError(msg) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Validation Error',
            message: msg,
            variant: 'error'
        }));
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validatePAN(pan) {
        return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
    }

    validatePhone(phone) {
        return /^[0-9]{10}$/.test(phone);
    }

    // ... all variables from before ...

    async handleSubmit() {
        if (!this.validateForm()) return;
        // ✅ Log form data before submission
    console.log('Submitting form with data--->', {
        fullName: this.fullName,
        email: this.email,
        pan: this.pan,
        phone: this.phone,
        dob: this.dob,
        gender: this.gender,
        state: this.selectedState,
        agreed: this.agreed
    });

        try {
            await saveRegistration({
                fullName: this.fullName,
                email: this.email,
                pan: this.pan,
                phone: this.phone,
                dob: this.dob,
                gender: this.gender,
                state: this.selectedState,
                agreed: this.agreed
                
            });

            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Registration submitted successfully!',
                variant: 'success'
            }));

            this.resetForm();

        } catch (error) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            }));
        }
    }

    resetForm() {
        this.fullName = '';
        this.email = '';
        this.pan = '';
        this.phone = '';
        this.dob = '';
        this.gender = '';
        this.selectedState = '';
        this.agreed = false;
    }
}