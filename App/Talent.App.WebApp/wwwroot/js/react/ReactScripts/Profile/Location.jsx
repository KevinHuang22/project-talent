import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Grid } from 'semantic-ui-react';
import { countries } from '../Employer/common.js'
import { Location } from '../Employer/CreateJob/Location.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const addressData = props.addressData
            ? Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                postCode: 0,
                city: "",
                country: "",
            }

        this.state = {
            showEditSection: false,
            newAddress: addressData,
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
    }

    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: addressData
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)

        const name = event.target.name;
        let value = event.target.value;
        data[name] = value;

        //<Location /> child
        //if (name == "location") {
        //    data["country"] = value.country;
        //    data["city"] = "";
        //}
        //else {
        //    data[name] = value;
        //}

        this.setState({
            newAddress: data
        })
        //console.log(this.state.newAddress);//The state will not update immediately right after the this.setState() is called
        //this.renderEdit();
        //debugger;
        this.props.updateProfileData(this.props.componentId, data)
    }

    saveAddress() {
        this.props.saveProfileData()
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let selectedCity = '', selectedCountry = '';
        let countriesOptions = [], citiesOptions = [];

        if (this.state.newAddress && this.state.newAddress.country) {
            selectedCountry = this.state.newAddress.country;
            selectedCity = this.state.newAddress.city;
        }

        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            citiesOptions = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            console.log(selectedCountry);
        }

        //<Location /> child
        //let location = { city: '', country: '' }
        //if (this.state.newAddress && this.state.newAddress.country) {
        //    location.country = this.state.newAddress.country;
        //    location.city = this.state.newAddress.city;
        //    console.log(this.state.newAddress.country);
        //}
        return (
            <div className='ui sixteen wide column'>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={this.state.newAddress.number}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your address number"
                                errorMessage="Please enter a valid address number"
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={this.state.newAddress.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your address street"
                                errorMessage="Please enter a valid street"
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={this.state.newAddress.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your address suburb"
                                errorMessage="Please enter a valid suburb"
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column className="field" width={6}>
                            <label>Country</label>
                            <select className="ui right labeled dropdown"
                                placeholder="Country"
                                value={selectedCountry}
                                onChange={this.handleChange}
                                name="country">
                                <option value="">Select a country</option>
                                {countriesOptions}
                            </select>
                        </Grid.Column>
                        <Grid.Column className="field" width={6}>
                            <label>City</label>
                            <select
                                className="ui dropdown"
                                placeholder="City"
                                value={selectedCity}
                                onChange={this.handleChange}
                                name="city">
                                <option value="0"> Select a town or city</option>
                                {citiesOptions}
                            </select>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <ChildSingleInput
                                inputType="text"
                                label="Post Code"
                                name="postCode"
                                value={this.state.newAddress.postCode}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your post code"
                                errorMessage="Please enter a valid post code"
                            />
                        </Grid.Column>
                    </Grid.Row>

                    {
                        //<Location /> child
                        //<Grid.Row>
                        //    <Grid.Column width={6} className="field">
                        //        <label>Locations</label>
                        //        <Location location={location} handleChange={this.handleChange} />
                        //    </Grid.Column>
                        //</Grid.Row>
                    }
                </Grid>
                <br />
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div >
        )
    }

    renderDisplay() {
        //console.log(this.state.newAddress)
        let number = this.props.addressData ? `${this.props.addressData.number}` : ""
        let street = this.props.addressData ? `${this.props.addressData.street}` : ""
        let suburb = this.props.addressData ? `${this.props.addressData.suburb}` : ""
        let postCode = this.props.addressData ? `${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {number}, {street}, {suburb}, {postCode}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        //const nationality = props.nationalityData
        //    ? this.props.nationalityData
        //    : ""

        //this.state = {
        //    newNationality: nationality
        //}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        
        let data = event.target.value
        console.log(data);

        //this.setState({
        //    newNationality: data
        //})
        //console.log(this.state.newNationality);

        this.props.saveProfileData(this.props.componentId, data)
    }
    
    render() {
        const nationality = this.props.nationalityData
            ? this.props.nationalityData
            : ""

        let countriesOptions = []
        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <select
                            className="ui dropdown"
                            placeholder="Nationality"
                            value={nationality}
                            onChange={this.handleChange}
                            name="nationality">
                            <option value="0"> Select your nationality</option>
                            {countriesOptions}
                        </select>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}