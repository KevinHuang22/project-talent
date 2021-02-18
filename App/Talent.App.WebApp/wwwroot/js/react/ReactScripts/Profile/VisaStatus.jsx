import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Grid } from 'semantic-ui-react';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const visaTypes = [
            { key: 'citizen', text: 'Citizen', value: 'citizen' },
            { key: 'pr', text: 'Permanent Risident', value: 'pr' },
            { key: 'wv', text: 'Work Visa', value: 'wv' },
            { key: 'sv', text: 'Student Visa', value: 'sv' },
        ]

        this.state = {
            visaTypes,
            status: '',
            expiryDate: '',
            isDateInvalid: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name == 'visaStatus') {
            if (value == 'pr' || value == 'citizen') {
                this.props.saveProfileData({ [name]: value })
            }
            else {
                this.setState({
                    status: value,
                })
                this.props.updateProfileData({ [name]: value })
            }
        }
        else {
            console.log(value);
            this.setState({
                expiryDate: value,
            })
        }
        
    }

    save() {
        console.log("save");
        let status = this.state.status ? this.state.status : this.props.visaStatus;

        let expiryDate = this.state.expiryDate ? this.state.expiryDate : this.props.visaExpiryDate;
        if (this.checkDateFormat(expiryDate)) {
            let dateParts = expiryDate.split('/');
            let dateObject = new Date(dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]);
            console.log(dateObject.toLocaleDateString());
            this.props.saveProfileData({ 'visaStatus': status, 'visaExpiryDate': dateObject })
            this.setState({
                isDateInvalid: false,
            })
        }
        else {
            this.setState({
                isDateInvalid: true,
            })
        }

    }

    checkDateFormat(dateInputString) {
        // Define an array of constant days for a month
        let DA = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // unify the date format
        let strDate = dateInputString.replace(/-/g, "/");

        //check the date string format
        if (strDate.indexOf("/") == -1) {
            return false;
        }

        // divide year, month and date
        let arrD = strDate.split("/");
        if (arrD.length != 3) {
            return false;
        }
        let y = parseInt(arrD[2], 10);
        let m = parseInt(arrD[1], 10);
        let d = parseInt(arrD[0], 10);

        //check　are they all digits
        if (isNaN(y) || isNaN(m) || isNaN(d)) {
            return false;
        }

        // check the month is between 1 to 12
        if (m > 12 || m < 1) {
            return false;
        }

        //check if it is a leap year
        if (this.isLeapYear(y)) {
            DA[2] = 29;
        }

        //check the date if exceed the maximum of the month
        if (d > DA[m]) {
            return false;
        }
        return true;
    }

    isLeapYear(theYear) {
        return (new Date(theYear, 1, 29).getDate() == 29);
    }

    render() {

        const visaStatus = this.props.visaStatus && this.state.status.length == 0
            ? this.props.visaStatus
            : this.state.status

        let visaExpiryDate = this.props.visaExpiryDate && this.state.expiryDate.length == 0
            ? (new Date(this.props.visaExpiryDate)).toLocaleDateString('en-NZ').toString()
            : this.state.expiryDate
        console.log(visaExpiryDate);
        //let dateFormat = require("dateformat");
        //visaExpiryDate = dateFormat(visaExpiryDate, "yyyy-MM-dd");

        let visaTypeOptions = []
        visaTypeOptions = this.state.visaTypes.map(x => <option key={x.key} value={x.value}>{x.text}</option>);
        let inputContent = '';
        let buttonContent = '';
        if (visaStatus == 'wv' || visaStatus == 'sv') {
            inputContent = (
                <Grid.Column className="field" width={5}>
                    <label>Visa Expiry Date</label>
                    <SingleInput
                        inputType="text"
                        name="expiryDate"
                        content={visaExpiryDate}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add Expiry Date"
                        errorMessage="Please enter a valid date"
                        isError={this.state.isDateInvalid}
                    />
                </Grid.Column>
            )
            buttonContent = (
                <Grid.Column className="field" width={5}>
                    <label>&nbsp;</label>
                    <button type="button" className="ui teal button" onClick={this.save}>Save</button>
                </Grid.Column>
            )
        }
            

        return (
            <div className='ui sixteen wide column'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column className="field" width={5}>
                            <label>Visa Type</label>
                            <select
                                className="ui dropdown"
                                placeholder="Nationality"
                                value={visaStatus}
                                onChange={this.handleChange}
                                name="visaStatus">
                                <option value="0"> Select your visa status</option>
                                {visaTypeOptions}
                            </select>
                        </Grid.Column>
                        {inputContent}
                        {buttonContent}
                    </Grid.Row>
                </Grid>    
            </div>
        )
    }
}