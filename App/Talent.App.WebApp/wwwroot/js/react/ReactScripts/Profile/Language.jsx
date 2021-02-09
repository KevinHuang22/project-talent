/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Grid, Table, Icon, Button, Confirm } from 'semantic-ui-react';
import { languageOptions } from '../Employer/common.js'

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const levelOptions = [
            { key: 'basic', text: 'Basic', value: 'Basic' },
            { key: 'conversational', text: 'Conversational', value: 'Conversational' },
            { key: 'fluent', text: 'Fluent', value: 'Fluent' },
            { key: 'native', text: 'Native/Bilingual', value: 'Native/Bilingual' },
        ]

        const languageData = props.languageData
            ? Object.assign([], props.languageData)
            : []

        this.state = {
            userLanguages: languageData,
            levels: levelOptions,
            newLanguageData: {
                //id: '',
                name: '',
                level: '',
                isEditing: false,
            },
            hideAddSection: true,
            isInputError: false,
            errorMessage: 'Please complete language or level fields.',
            deleteConfirm: {
                show: false,
                languageItem: null
            }
        }

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
    }
    componentDidMount() {
        
        
    }
    init() {
        let stateLanguagesList = [];
        const propsLanguages = TalentUtil.deepCopy(this.props.languageData);

        if (propsLanguages.length != 0) {
            for (let languageItem of propsLanguages) {
                stateLanguagesList.push(Object.assign(languageItem, { isEditing: false }))//insert isEditing attribute to each row
                
            }
            //console.log('stateLanguageslist: ')
            //console.log(stateLanguagesList);
        }

        this.setState({
            userLanguages: stateLanguagesList,
        })
    }

    openAdd() {
        console.log("open Add");
        this.setState({
            hideAddSection: false,
        })
        this.closeEdit();
    }

    closeAdd() {
        console.log("close Add");
        this.setState({
            hideAddSection: true,
        })
    }

    openEdit(id) {
        console.log("openEdit id: " + id);
        //debugger;
        let onEditingItem = Object.assign({}, this.state.newLanguageData);
        for (let languageItem of this.state.userLanguages) {
            if (languageItem.id == id) {
                languageItem.isEditing = true;
                onEditingItem = Object.assign({}, languageItem);
            }
            
        }
        this.setState({
            hideAddSection: true,
            newLanguageData: onEditingItem,
        })
    }

    closeEdit(id) {
        console.log("closeEdit");
        const updateUserLanguages = Object.assign([],this.state.userLanguages);
        for (let languageItem of updateUserLanguages) {
            if (languageItem.id == id) {
                languageItem.isEditing = false;
            }
        }
        this.setState({
            userLanguages: updateUserLanguages,
            newLanguageData: {
                name: '',
                level: '',
                isEditing: false,
            },
        })
    }

    handleChange(event) {
        let updateData = Object.assign({},this.state.newLanguageData);

        const name = event.target.name;
        let value = event.target.value;
        updateData[name] = value;
        
        console.log('state userLanguages before set userLanguageData: ')
        console.log(this.state.userLanguages);
        
        this.setState({
            newLanguageData: updateData,
        })
        //debugger;
        if (updateData.name != '' && updateData.level != '') {
            let languageList = TalentUtil.deepCopy(this.state.userLanguages);
            //if it is a new language item
            if (!updateData.id) {
                console.log('new item');
                console.log(updateData.id);
                languageList.push(updateData);
            }
            else {
                console.log(updateData);
                for (let existingItem of languageList) {
                    //if language exists, change the updated value instead
                    if (updateData.id == existingItem.id) {
                        console.log('item exists');
                        existingItem.name = updateData.name;
                        existingItem.level = updateData.level;
                        break;
                    }
                }
            }
            this.props.updateProfileData(this.props.componentId, languageList)
        }
        
        this.renderDisplay();

        //console.log(updateData);
    }

    saveLanguage(id) {
        console.log("save language, id: " + id)
        console.log(this.state.newLanguageData)

            if (this.state.newLanguageData.name != '' && this.state.newLanguageData.level != '') {
                this.props.saveProfileData()
                this.closeAdd()
                this.closeEdit();
            }
            else {
                this.setState({
                    isInputError: true,
                })
                this.renderDisplay()
            }
        
    }

    showDeleteConfirm(showConfirm, itemIdToDelete) {
        this.setState({
            deleteConfirm: {
                show: showConfirm,
                languageItem: itemIdToDelete
            }
        });
        let languageList = Object.assign([], this.state.userLanguages);
        languageList = this.state.userLanguages.filter(userLanguages => {
            return userLanguages.id != itemIdToDelete;
        })
        this.props.updateProfileData(this.props.componentId, languageList)
    }

    deleteLanguageItem() {
        this.props.saveProfileData();
        this.showDeleteConfirm(false);
    }

    render() {
        return (
            this.renderDisplay()
        )
    }

    renderDisplay() {
        let languagesList = [];
        if (this.state.userLanguages.length > 0 && this.state.userLanguages.length == this.props.languageData.length) {
            languagesList = this.state.userLanguages;
        }
        else if (this.props.languageData.length > 0){
            languagesList = this.props.languageData;
            this.init();
        }
        //let languagesList = this.props.languageData;
        //console.log(this.props.languageData)
        let languageDropdownOptions = languageOptions.map(x => <option key={x.key} value={x.value}>{x.text}</option>);
        let levelDropdownOptions = this.state.levels.map(x => <option key={x.key} value={x.value}>{x.text}</option>);

        let languageDropdown = (
                <select className="ui right labeled dropdown"
                    placeholder="Add language"
                    value={this.state.newLanguageData.name}
                    onChange={this.handleChange}
                    name="name">
                    <option value="">Select language</option>
                    {languageDropdownOptions}
                </select>
        )

        let levelDropdown = (
            <select className="ui right labeled dropdown"
                placeholder="Level"
                value={this.state.newLanguageData.level}
                onChange={this.handleChange}
                name="level">
                <option value="">Select Level</option>
                {levelDropdownOptions}
            </select>
        )
        let errorMsg = '';
        if (this.state.isInputError) {
            errorMsg = (<span style={{ color: "red" }}>{this.state.errorMessage}</span>)
        }

        return (
            <div className='ui sixteen wide column'>
                <Confirm
                open={this.state.deleteConfirm.show}
                onConfirm={() => this.deleteLanguageItem()}
                onCancel={() => this.showDeleteConfirm(false)}
                content='Are you sure you want to close this language?'
                cancelButton='No'
                confirmButton={{ content: 'Yes', negative: true }}

                />
                {
                    this.state.hideAddSection ? "" : 
                        (
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={5}>
                                        {languageDropdown}
                                        {errorMsg}
                                    </Grid.Column>

                                    <Grid.Column width={5}>
                                        {levelDropdown}
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <button type="button" className="ui teal button" onClick={() => this.saveLanguage(0)}>Add</button>
                                        <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        )
                }
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><b>Language</b></Table.HeaderCell>
                            <Table.HeaderCell><b>Level</b></Table.HeaderCell>
                            <Table.HeaderCell>
                                <button type="button" className="ui right floated teal button" onClick={this.openAdd}>+ Add New</button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            languagesList.map(item => (
                                item.isEditing
                                ?
                                (
                                    <Table.Row key={item.id}>
                                         <Table.Cell colSpan={3}>
                                              <Grid>
                                                   <Grid.Row>
                                                        <Grid.Column width={5}>
                                                            {languageDropdown}
                                                            {errorMsg}
                                                        </Grid.Column>
                                                        <Grid.Column width={5}>
                                                            {levelDropdown}
                                                        </Grid.Column>
                                                        <Grid.Column width={5}>
                                                            <Button basic color='blue' onClick={() => this.saveLanguage(item.id)} content='Update' />
                                                            <Button basic color='red' onClick={()=> this.closeEdit(item.id)} content='Cancel' />
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

                        <Table.Row key = '0'>
                            <Table.Cell>English</Table.Cell>
                            <Table.Cell>Basic</Table.Cell>
                            <Table.Cell>
                                <div className='right aligned column'>
                                    <a className='item'>
                                        <Icon className='black' name='pencil alternate' />
                                    </a>
                                    <a className='item'>
                                        <Icon className='black' name='cancel' />
                                    </a>
                                </div>
                            </Table.Cell>
                        </Table.Row>       
                    </Table.Body>
                </Table>
            </div>
        )
    }
}