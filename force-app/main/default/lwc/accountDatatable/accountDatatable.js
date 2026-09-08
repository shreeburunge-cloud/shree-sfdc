import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountTable.getAccounts';

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: 'Name',
        type: 'text'
    },
    {
        label: 'Industry',
        fieldName: 'Industry',
        type: 'text'
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    }
];

export default class AccountDatatable extends LightningElement {

    columns = COLUMNS;
    accounts = [];

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            console.error(error);
        }
    }
}