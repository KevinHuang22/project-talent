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

        const propsSkillData = props.skillData
            ? Object.assign([], props.skillData)
            : []

        this.state = {
            userSkills: propsSkillData,
            updateSkillItem: {
                id: '',
                name: '',
                level: '',
                isEditing: false
            }
        }

    };

  
   render() {
        return <p>Skills</p> 
    }

    renderDisplay() {
        let skillsList = []
        skillsList.concat([new this.state.updateSkillItem({ id: 1, name: 'javascript', level: 'intermediate' })]);
        skillsList.concat([new this.state.updateSkillItem({ id: 2, name: 'python', level: 'beginner' })]);
        skillsList.concat([new this.state.updateSkillItem({ id: 3, name: 'angular', level: 'expert' })]);
        skillsList.concat([new this.state.updateSkillItem({ id: 4, name: 'node', level: 'expert' })]);

        this.setState({
            userSkills: skillsList,
        })

    }
}

