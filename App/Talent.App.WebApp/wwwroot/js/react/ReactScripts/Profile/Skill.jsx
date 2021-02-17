/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Grid, Table, Icon, Button, Confirm } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        const skillOptions = [
            { key: 'angular', text: 'Angular', value: 'angular' },
            { key: 'css', text: 'CSS', value: 'css' },
            { key: 'design', text: 'Graphic Design', value: 'design' },
            { key: 'ember', text: 'Ember', value: 'ember' },
            { key: 'html', text: 'HTML', value: 'html' },
            { key: 'ia', text: 'Information Architecture', value: 'ia' },
            { key: 'javascript', text: 'Javascript', value: 'javascript' },
            { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
            { key: 'meteor', text: 'Meteor', value: 'meteor' },
            { key: 'node', text: 'NodeJS', value: 'node' },
            { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
            { key: 'python', text: 'Python', value: 'python' },
            { key: 'rails', text: 'Rails', value: 'rails' },
            { key: 'react', text: 'React', value: 'react' },
            { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
            { key: 'ruby', text: 'Ruby', value: 'ruby' },
            { key: 'ui', text: 'UI Design', value: 'ui' },
            { key: 'ux', text: 'User Experience', value: 'ux' },
        ]

        const levelOptions = [
            { key: 'beginner', text: 'Beginner', value: 'beginner' },
            { key: 'intermediate', text: 'Intermediate', value: 'intermediate' },
            { key: 'expert', text: 'Expert', value: 'expert' },
        ]

        const propsSkillData = props.skillData.length == 0
            ? Object.assign([], props.skillData)
            : []

        const initData = [
                    { id: 1, name: 'javascript', level: 'intermediate', isEditing: false },
                    { id: 2, name: 'python', level: 'beginner', isEditing: false },
                    { id: 3, name: 'angular', level: 'expert', isEditing: false },
                    { id: 4, name: 'node', level: 'expert', isEditing: false },
                ]

        this.state = {
            userSkills: initData,
            skills: skillOptions,
            levels: levelOptions,
            updateSkillItem: {
                id: '',
                name: '',
                level: '',
                isEditing: false
            },
            hideAddSection: true,
            isInputError: false,
            errorMessage: 'Please complete skill or level fields.',
            deleteConfirm: {
                show: false,
                skillItem: null
            }
        }

        this.openAdd = this.openAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveSkill = this.saveSkill.bind(this);
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    };

    openAdd() {
        console.log("open Add");
        this.setState({
            hideAddSection: false,
        })
        this.closeEdit(this.state.updateSkillItem.id);
    }

    closeAdd() {
        console.log("close Add");
        this.setState({
            hideAddSection: true,
        })
    }

    handleChange(event) {
        let updateData = Object.assign({}, this.state.updateSkillItem);

        const name = event.target.name;
        let value = event.target.value;
        updateData[name] = value;

        console.log(this.state.userSkills);
        console.log(updateData);
        this.setState({
            updateSkillItem: updateData,
        })

        if (updateData.name != '' && updateData.level != '') {
            let newSkillsList = Object.assign([], this.state.userSkills);
            ////if it is a new language item
            //if (!updateData.id) {
            //    console.log('new item');
            //    console.log(updateData.id);
            //    newSkillsList.concat(updateData);
            //}
            //else {
            //    console.log(updateData);
            //    for (let existingItem of languageList) {
            //        //if language exists, change the updated value instead
            //        if (updateData.id == existingItem.id) {
            //            console.log('item exists');
            //            existingItem.name = updateData.name;
            //            existingItem.level = updateData.level;
            //            break;
            //        }
            //    }
            //}
            ////debugger;
            //this.setState({
            //    userSkills: newSkillsList,
            //})
            this.props.updateProfileData(this.props.componentId, newSkillsList)
        }
        this.renderDisplay();
    }

    saveSkill(id) {
        console.log("save skill, id: " + id)
        console.log(this.state.updateSkillItem)

        if (this.state.updateSkillItem.name != '' && this.state.updateSkillItem.level != '') {
            //this.props.saveProfileData()
            let updatedSkillItem = Object.assign({}, this.state.updateSkillItem);
            let updatedSkillList = Object.assign([], this.state.userSkills);

            //debugger;
            if (id == 0) {
                id = updatedSkillList.length + 1;
                updatedSkillItem.id = id;
                updatedSkillList.push(updatedSkillItem);

                this.closeAdd();
            }
            else {
                for (let existingItem of updatedSkillList) {
                    //if language exists, change the updated value instead
                    if (id == existingItem.id) {
                        console.log('item exists');
                        existingItem.name = updatedSkillItem.name;
                        existingItem.level = updatedSkillItem.level;
                        existingItem.isEditing = false;
                        break;

                        this.closeEdit();
                    }
                }
            }
            this.setState({
                userSkills: updatedSkillList,
            },TalentUtil.notification.show("Profile updated sucessfully", "success", null, null))
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
        let onEditingItem = Object.assign({}, this.state.updateSkillItem);
        for (let skillItem of this.state.userSkills) {
            if (skillItem.id == id) {
                skillItem.isEditing = true;
                onEditingItem = Object.assign({}, skillItem);
            }
        }
        this.setState({
            hideAddSection: true,
            updateSkillItem: onEditingItem,
        })
    }

    closeEdit(id) {
        console.log("closeEdit");
        const updateUserSkills = Object.assign([], this.state.userSkills);
        for (let skillItem of updateUserSkills) {
            if (skillItem.id == id) {
                skillItem.isEditing = false;
            }
        }
        this.setState({
            updateSkillItem: {
                id: 0,
                name: '',
                level: '',
                isEditing: false,
            }
        })
    }

    showDeleteConfirm(showConfirm, itemIdToDelete) {
        this.setState({
            deleteConfirm: {
                show: showConfirm,
                skillItem: itemIdToDelete
            }
        });
        let skillList = Object.assign([], this.state.userSkills);
        skillList = this.state.userSkills.filter(userSkills => {
            return userSkills.id != itemIdToDelete;
        });
        this.props.updateProfileData(this.props.componentId, skillList);
        this.setState({
            userSkills: skillList,
        })
    }

    deleteSkillItem() {
        //this.props.saveProfileData();
        this.showDeleteConfirm(false);
        TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
    }
  
    render() {
        return this.renderDisplay()
    }

    renderDisplay() {
        let skillsList = [];

        if (this.state.userSkills.length > 0 /*&& this.state.userSkills.length == this.props.skillData.length*/) {
            skillsList = this.state.userSkills;
        }
        else if (this.props.skillData.length > 0) {
            skillsList = this.props.skillData;
        }

        //console.log(skillsList);

        //let languageDropdownOptions = this.state.languageOptions.map(x => <option key={x.key} value={x.value}>{x.text}</option>);
        let levelDropdownOptions = this.state.levels.map(x => <option key={x.key} value={x.value}>{x.text}</option>);

        let levelDropdown = (
            <select className="ui right labeled dropdown"
                placeholder="Level"
                value={this.state.updateSkillItem.level}
                onChange={this.handleChange}
                name="level">
                <option value="">Select Level</option>
                {levelDropdownOptions}
            </select>
        )

        return (
            <div className='ui sixteen wide column'>
                <Confirm
                    open={this.state.deleteConfirm.show}
                    onConfirm={() => this.deleteSkillItem()}
                    onCancel={() => this.showDeleteConfirm(false)}
                    content='Are you sure you want to close this skill?'
                    cancelButton='No'
                    confirmButton={{ content: 'Yes', negative: true }}

                />
                {
                    this.state.hideAddSection ? "" :
                        (
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={5}>
                                        <ChildSingleInput
                                            inputType="text"
                                            name="name"
                                            value={this.state.updateSkillItem.name}
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                            placeholder="Add skill"
                                            errorMessage="Please enter a valid skill"
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        {levelDropdown}
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <button type="button" className="ui teal button" onClick={() => this.saveSkill(0)}>Add</button>
                                        <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )
                }

                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><b>Skill</b></Table.HeaderCell>
                            <Table.HeaderCell><b>Level</b></Table.HeaderCell>
                            <Table.HeaderCell>
                                <button type="button" className="ui right floated teal button" onClick={this.openAdd}>+ Add New</button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            skillsList.map(item => (
                                item.isEditing
                                    ?
                                    (
                                        <Table.Row key={item.id}>
                                            <Table.Cell colSpan={3}>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column width={5}>
                                                            <ChildSingleInput
                                                                inputType="text"
                                                                name="name"
                                                                value={this.state.updateSkillItem.name}
                                                                controlFunc={this.handleChange}
                                                                maxLength={80}
                                                                placeholder="Add skill"
                                                                errorMessage="Please enter a valid skill"
                                                            />
                                                        </Grid.Column>
                                                        <Grid.Column width={5}>
                                                            {levelDropdown}
                                                        </Grid.Column>
                                                        <Grid.Column width={5}>
                                                            <Button basic color='blue' onClick={() => this.saveSkill(item.id)} content='Update' />
                                                            <Button basic color='red' onClick={() => this.closeEdit(item.id)} content='Cancel' />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        <Table.Row key={item.id}>
                                            <Table.Cell>{item.name}</Table.Cell>
                                            <Table.Cell>{item.level}</Table.Cell>
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

