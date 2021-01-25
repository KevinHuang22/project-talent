import React from 'react';
import { Icon, Dropdown, } from 'semantic-ui-react';

export class JobsFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Icon name='filter' />Filter: &nbsp;
                <strong>
                    <Dropdown text='Choose filter'>
                        <Dropdown.Menu>
                            <Dropdown.Item text='New' />
                            <Dropdown.Item text='Open...' description='ctrl + o' />
                            <Dropdown.Item text='Save as...' description='ctrl + s' />
                            <Dropdown.Item text='Rename' description='ctrl + r' />
                            <Dropdown.Item text='Make a copy' />
                            <Dropdown.Item icon='folder' text='Move to folder' />
                            <Dropdown.Item icon='trash' text='Move to trash' />
                            <Dropdown.Divider />
                            <Dropdown.Item text='Download As...' />
                        </Dropdown.Menu>
                    </Dropdown>
                </strong>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Icon name='calendar alternate' />Sort by date: &nbsp;
                <strong>
                    <Dropdown text='Newest first'>
                        <Dropdown.Menu>
                            <Dropdown.Item text='Newest' />
                            <Dropdown.Item text='Oldest' />
                        </Dropdown.Menu>
                    </Dropdown>
                </strong>
            </div>
        )
    }
}