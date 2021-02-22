import React from 'react'
import { Form, Checkbox, Radio } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value })
    }
    
    render() {
        return (
            <div className='ui sixteen wide column'>
                <Form.Field>
                    <b>Current Status: </b>
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Actively looking for a job'
                        name='radioGroup'
                        value='actively'
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Not looking for a job at the moment'
                        name='radioGroup'
                        value='inactively'
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Currently employed but open to offers'
                        name='radioGroup'
                        value='open'
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Will be available on later date'
                        name='radioGroup'
                        value='unavailable'
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </div>
        )
    }
}