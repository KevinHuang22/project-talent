/* Experience section */
import React, { DateTime } from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Grid, Table, Icon, Button, Confirm} from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        const propsExperienceData = props.experienceData.length == 0
            ? Object.assign([], props.propsExperienceData)
            : []

        const monthsList = ['Jan, ', 'Feb, ', 'March, ', 'April, ', 'May, ', 'June, ', 'July, ', 'Aug, ', 'Sept, ', 'Oct, ', 'Nov, ', 'Dec, '];

        const initData = [
            { id: 1, company: 'company1', position: 'Software Developer', responsibilities: 'Develop Web Applications', start: new Date('2021-03-01'), end: new Date() },
            { id: 2, company: 'company2', position: 'Software Developer', responsibilities: 'Develop Web Applications', start: new Date('2021-03-23'), end: new Date() },
        ]

        this.state = {
            userExperiences: initData,
            updateExperienceItem: {
                id: 0,
                company: '',
                position: '',
                responsibilities: '',
                startString: '',
                start: new Date(),
                endString: '',
                end: new Date(),
                isEditing: false,
                isDateFormatError: false,
            },
            hideAddSection: true,
            isInputError: false,
            errorMessage: 'Please complete all fields.',
            deleteConfirm: {
                show: false,
                experienceItem: null
            }
        }

        this.openAdd = this.openAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
    }

    openAdd() {
        console.log("open Add");
        this.setState({
            hideAddSection: false,
        })
        this.closeEdit(this.state.updateExperienceItem.id);
    }

    closeAdd() {
        console.log("close Add");
        this.setState({
            hideAddSection: true,
        })
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

    handleChange(event) {
        let updateData = Object.assign({}, this.state.updateExperienceItem);

        const name = event.target.name;
        let value = event.target.value;
        
        if (name == "start" || name == "end") {
            if (value.length == 10) {
                //debugger;
                //var dateString = "23/10/2015"; // Oct 23
                let dateString = value;
                if (this.checkDateFormat(dateString)) {
                    let dateParts = dateString.split('/');
                    let dateObject = new Date(dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]);
                    console.log(dateObject.toLocaleString());
                    updateData[name] = dateObject;
                    updateData.isDateFormatError = false;
                }
                else {
                    updateData.isDateFormatError = true;
                }
                updateData[name + "String"] = value;
            }
            else {
                updateData[name + "String"] = value;
                updateData.isDateFormatError = true;
            }
        }
        else {
            updateData[name] = value;
        }

        //console.log(this.state.userExperiences);
        console.log(updateData);
        this.setState({
            updateExperienceItem: updateData,
        })
    }

    saveExperience(id) {
        console.log("save experience, id: " + id)
        console.log(this.state.updateExperienceItem)

        if (this.state.updateExperienceItem.company != '' && this.state.updateExperienceItem.position != ''
            && this.state.updateExperienceItem.start != '' && this.state.updateExperienceItem.end != ''
            && this.state.updateExperienceItem.responsibilities != '') {
            //this.props.saveProfileData()
            let updatedExperienceItem = Object.assign({}, this.state.updateExperienceItem);
            let updatedExperienceList = Object.assign([], this.state.userExperiences);

            //debugger;
            if (id == 0) {
                id = updatedExperienceList.length + 1;
                updatedExperienceItem.id = id;
                updatedExperienceList.push(updatedExperienceItem);

                this.closeAdd();
            }
            else {
                for (let existingItem of updatedExperienceList) {
                    //if language exists, change the updated value instead
                    if (id == existingItem.id) {
                        console.log('item exists');
                        existingItem.company = updatedExperienceItem.company;
                        existingItem.position = updatedExperienceItem.position
                        existingItem.start = updatedExperienceItem.start;
                        existingItem.end = updatedExperienceItem.end;
                        existingItem.responsibilities = updatedExperienceItem.responsibilities;
                        existingItem.isEditing = false;
                        break;

                        this.closeEdit();
                    }
                }
            }
            this.setState({
                userExperiences: updatedExperienceList,
            }, TalentUtil.notification.show("Profile updated sucessfully", "success", null, null))
        }
        else {
            this.setState({
                isInputError: true,
            })
            this.renderDisplay()
        }

    }

    openEdit(id) {
        console.log("openEdit id: " + id);
        //debugger;
        let onEditingItem = Object.assign({}, this.state.updateExperienceItem);
        for (let experienceItem of this.state.userExperiences) {
            if (experienceItem.id == id) {
                experienceItem.isEditing = true;
                onEditingItem = Object.assign({}, experienceItem);
            }
        }
        this.setState({
            hideAddSection: true,
            updateExperienceItem: onEditingItem,
        })
    }

    closeEdit(id) {
        console.log("closeEdit");
        const updateUserExperiences = Object.assign([], this.state.userExperiences);
        for (let experienceItem of updateUserExperiences) {
            if (experienceItem.id == id) {
                experienceItem.isEditing = false;
            }
        }
        this.setState({
            updateExperienceItem: {
                id: 0,
                company: '',
                position: '',
                responsibilities: '',
                startString: '',
                start: new Date(),
                endString: '',
                end: new Date(),
                isEditing: false,
                isDateFormatError: false,
            },
        })
    }

    showDeleteConfirm(showConfirm, itemIdToDelete) {
        this.setState({
            deleteConfirm: {
                show: showConfirm,
                experienceItem: itemIdToDelete
            }
        });
        let experienceList = Object.assign([], this.state.userExperiences);
        experienceList = this.state.userExperiences.filter(userExperiences => {
            return userExperiences.id != itemIdToDelete;
        });
        //this.props.updateProfileData(this.props.componentId, experienceList);
        this.setState({
            userExperiences: experienceList,
        })
    }

    deleteExperienceItem() {
        //this.props.saveProfileData();
        this.showDeleteConfirm(false);
        TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
    }
    
    render() {
        return this.renderDisplay();
        
    }

    renderAdd() {
        let onEditingItem = Object.assign({}, this.state.updateExperienceItem)
        var dateFormat = require('dateformat');
        onEditingItem.startString = onEditingItem.startString ? onEditingItem.startString : dateFormat(onEditingItem.start, "dd/mm/yyyy");
        var dateFormat = require('dateformat');
        onEditingItem.endString = onEditingItem.endString ? onEditingItem.endString : dateFormat(onEditingItem.end, "dd/mm/yyyy");
        let isDateFormatError = onEditingItem.isDateFormatError ? '1' : '';

        return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ChildSingleInput
                                inputType="text"
                                label="Company:"
                                name="company"
                                value={onEditingItem.company}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Company"
                                errorMessage="Please enter a company name"
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <ChildSingleInput
                                inputType="text"
                                label="Position:"
                                name="position"
                                value={onEditingItem.position}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Position"
                                errorMessage="Please enter a position"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <ChildSingleInput
                                inputType="text"
                                label="Start Date:"
                                name="start"
                                value={onEditingItem.startString}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Start Date"
                                errorMessage="Please enter a start date in format dd/MM/yyyy"
                                isError={isDateFormatError}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <ChildSingleInput
                                inputType="text"
                                label="End Date:"
                                name="end"
                                value={onEditingItem.endString}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="End Date"
                                errorMessage="Please enter an end date in format dd/MM/yyyy"
                                isError={isDateFormatError}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <ChildSingleInput
                                inputType="text"
                                label="Responsibilities:"
                                name="responsibilities"
                                value={onEditingItem.responsibilities}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Responsibilities"
                                errorMessage="Please enter your responsibilities"
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        )
    }

    renderDisplay() {
        //console.log(this.state.newAddress)

        let experiencesList = [];

        if (this.state.userExperiences.length > 0 /*&& this.state.userExperience.length == this.props.experienceData.length*/) {
            experiencesList = this.state.userExperiences;
        }
        else if (this.props.experienceData.length > 0) {
            experiencesList = this.props.experienceData;
        }

        var dateFormat = require('dateformat');
        //var now = new Date();
        //console.log(dateFormat(now, "dd/mm/yyyy"));
        //console.log(dateFormat(now, "dS mmm, yyyy"));
        //var dateObject = new Date(2019 + '/' + 9 + '/' + 3);
        //console.log(dateObject);
        //console.log(dateObject.toLocaleString());
        
        return (
            <div className="ui sixteen wide column">
                <Confirm
                    open={this.state.deleteConfirm.show}
                    onConfirm={() => this.deleteExperienceItem()}
                    onCancel={() => this.showDeleteConfirm(false)}
                    content='Are you sure you want to close this skill?'
                    cancelButton='No'
                    confirmButton={{ content: 'Yes', negative: true }}

                />
                {
                    this.state.hideAddSection
                        ? ""
                        : (
                            <div>
                                {this.renderAdd()}
                                <br />
                                <button type="button" className="ui teal button" onClick={() => this.saveExperience(0)}>Save</button>
                                <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                            </div>
                        )
                }
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><b>Company</b></Table.HeaderCell>
                            <Table.HeaderCell><b>Position</b></Table.HeaderCell>
                            <Table.HeaderCell><b>Responsibilities</b></Table.HeaderCell>
                            <Table.HeaderCell><b>Start</b></Table.HeaderCell>
                            <Table.HeaderCell><b>End</b></Table.HeaderCell>
                            <Table.HeaderCell>
                                <button type="button" className="ui right floated teal button" onClick={this.openAdd}>+ Add New</button>
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                    <Table.Body>
                        {
                            experiencesList.map(item => (
                                item.isEditing
                                    ?
                                    (
                                        <Table.Row key={item.id}>
                                            <Table.Cell colSpan={6}>
                                                {this.renderAdd()}
                                                <br />
                                                <button type="button" className="ui teal button" onClick={()=>this.saveExperience(item.id)}>Update</button>
                                                <button type="button" className="ui button" onClick={()=>this.closeEdit(item.id)}>Cancel</button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        <Table.Row key={item.id}>
                                            <Table.Cell>{item.company}</Table.Cell>
                                            <Table.Cell>{item.position}</Table.Cell>
                                            <Table.Cell>{item.responsibilities}</Table.Cell>
                                            <Table.Cell>{dateFormat(item.start, "dS mmm, yyyy")}</Table.Cell>
                                            <Table.Cell>{dateFormat(item.end, "dS mmm, yyyy")}</Table.Cell>
                                            <Table.Cell>
                                                <div className='right aligned column'>
                                                    <a className='item' onClick={() => this.openEdit(item.id)}>
                                                        <Icon className='black' name='pencil alternate' />
                                                    </a>
                                                    <a className='item' onClick={() => this.showDeleteConfirm(true, item.id)}>
                                                        <Icon className='black' name='cancel' />
                                                    </a>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )
                            )
                        }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}