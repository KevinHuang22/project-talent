/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        let summary = this.props.summary
            ? this.props.summary
            : ''

        let description = this.props.description
            ? this.props.description
            : ''

        this.state = {
            selfIntroduction: {
                summary,
                description,
            },
            descriptionCharacters: description.length,
        }

        this.update = this.update.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    };

    update(event) {
        let name = event.target.name;
        let value = event.target.value;

        let selfIntroductionItem = Object.assign({}, this.state.selfIntroduction);
        selfIntroductionItem['summary'] = this.props.summary;
        selfIntroductionItem['description'] = this.props.description;
        selfIntroductionItem[name] = value;

        this.setState({
            selfIntroduction: selfIntroductionItem,
            descriptionCharacters: name == 'description' ? value.length : this.state.descriptionCharacters
        }, console.log(this.state))

        this.props.updateProfileData('selfIntroduction', selfIntroductionItem);
    }

    saveChanges() {
        console.log("save")
        //let updateItem = Object.assign({}, this.state.selfIntroduction);
        //let summaryToUpdate = updateItem.summary;
        //let descriptionToUpdate = updateItem.description;
        //debugger;
        this.props.saveProfileData();
    }

    render() {

        const descriptionLimit = 600;
        let descriptionCharacters = this.props.description ? this.props.description.length : 0;
        descriptionCharacters = this.props.description ? this.props.description.length : 0;

        let summaryDetail = this.props.summary ? this.props.summary : '';
        let descriptionDetail = this.props.description ? this.props.description : '';
        //console.log(summaryDetail);
        //console.log(descriptionDetail);

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>{this.props.title}</h3>
                </div>
                <React.Fragment>
                    <div className='twelve wide column'>
                        <div className="field" >
                            <ChildSingleInput
                                inputType="text"
                                name="summary"
                                value={summaryDetail}
                                controlFunc={this.update}
                                maxLength={150}
                                placeholder="Please provide a summary about yourself"
                                errorMessage="Please enter a summary about yourself"
                            />
                            <p>Summary must be no more than 150 characters.</p>
                        </div>
                    </div>

                    <div className="four wide column">
                    </div>
                    <div className='twelve wide column'>
                        <div className="field" >
                            <textarea
                                maxLength={descriptionLimit}
                                value={descriptionDetail}
                                name="description"
                                placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                                onChange={this.update} >
                            </textarea>
                        </div>
                        {
                            descriptionCharacters > 150
                                ? (<p>Characters remaining : {descriptionCharacters} / {descriptionLimit}</p>)
                                : (<p>Description must be between 150-600 characters.</p>)
                        }
                        <button type="button" className="ui right floated teal button" onClick={this.saveChanges}>Save</button>
                    </div>
                </React.Fragment>
            </React.Fragment>
         )
    }
}



