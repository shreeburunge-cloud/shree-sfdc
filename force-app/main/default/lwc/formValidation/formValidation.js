import { LightningElement,track } from 'lwc';

export default class FormValidation extends LightningElement {
/*
    contact={};
isInputValid(){
	let isValid=true;
	let inputFields=this.template.querySelectorAll('.validate');
	inputFields.forEach(inputField =>{
	if(!inputField.checkValidity()){
	    inputField.reportValidity();
		isValid=false;
		}
		this.contact[inputField.name]=inputField.value;
		});
		return isValid;
		}
		createContact(){
		
		if(this.isInputValid()){
		console.log(this.contact);
		}
		}

		*/

		@track pan;
		@track phone;
		@track email;
		@track password;
	
		onPanChange(event) {
			this.name = event.detail.value;
		}
		onPhoneChange(event) {
			this.phone = event.detail.value;
		}
		onEmailChange(event) {
			this.email = event.detail.value;
		}
		onPasswordChange(event) {
			this.password = event.detail.value;
		}
	

		saveContact() {
			const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
				.reduce((validSoFar, inputField) => {
					inputField.reportValidity();
					return validSoFar && inputField.checkValidity();
				}, true);
			if (isInputsCorrect) {
			 //perform success logic
	
			}
}
}