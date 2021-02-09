/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts
            ? Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }

        this.state = {
            showEditSection: false,
            newAccounts: linkedAccounts,
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAccounts = this.saveAccounts.bind(this)
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newAccounts: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
        console.log(this.state.newAccounts)
    }

    handleChange(event) {
        const updateData = Object.assign({}, this.state.newAccounts)
        updateData[event.target.name] = event.target.value
        this.setState({
            newAccounts: updateData
        })
        this.props.updateProfileData(this.props.componentId, updateData)
    }
    
    saveAccounts() {
        const saveData = Object.assign({}, this.state.newAccounts)
        console.log(saveData)
        this.props.saveProfileData(saveData)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn URL"
                    errorMessage="Please enter a valid URL"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub URL"
                    errorMessage="Please enter a valid URL"
                />

                <button type="button" className="ui teal button" onClick={this.saveAccounts}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        let linkedIn = this.props.linkedAccounts ? `${this.props.linkedAccounts.linkedIn}` : "#LinkedIn"
        let github = this.props.linkedAccounts ? `${this.props.linkedAccounts.github}` : "#GitHub"

        return (
            <div className='row'>
                <div className='ui sixteen wide column'>
                    <React.Fragment>
                        <Button primary >
                            <a href={linkedIn} style={{ color: '#FFF' }} target="_blank">
                                <Icon name='linkedin' />
                                LinkedIn
                            </a>
                        </Button>
                        <Button secondary >
                            <a href={github} style={{ color: '#FFF' }} target="_blank">
                                <Icon name='github' />
                                GitHub
                            </a>
                        </Button>
                        <Button secondary ><a href='http://www.google.com' style={{ color: '#FFF' }} target="_blank"><Icon name='google' />Google</a></Button>
                        <button type="button" className="ui right floated teal button" onClick={this.openEdit} >Edit</button>
                    </React.Fragment>
                </div>
            </div>
        )
    }
}