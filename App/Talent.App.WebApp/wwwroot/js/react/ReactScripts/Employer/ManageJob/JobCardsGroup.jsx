import React from 'react';
import Cookies from 'js-cookie';

import { Icon, Card, Button, Label } from 'semantic-ui-react';

export class JobCardsGroup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            jobId:  "",
            btnDisabled : false,
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleEdit(id) {
        if (this.state.disabled) {
            return;
        }
        this.setState({ disabled: true });
        console.log('button has been diabled');
    }

    handleCopy(id) {
        if (this.state.disabled) {
            return;
        }
        this.setState({ disabled: true });
        console.log('button has been diabled');
    }

    handleClose(id) {
        if (!window.confirm('Do you want to this job position?'))
            return;
        else {
            var cookies = Cookies.get('talentAuthToken');
            this.setState({ jobData: id });
            $.ajax({
                url: 'https://talentTalentService.azurewebsites.net/listing/listing/closeJob',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                type: "post",
                data: JSON.stringify(this.state.jobData),
                success: function (res) {
                    if (res.success == true) {
                        TalentUtil.notification.show(res.message, "success", null, null);

                    } else {
                        TalentUtil.notification.show(res.message, "error", null, null)
                    }

                }.bind(this)
            })
        }
    }

    render() {
        let jobsList = this.props.jobsList;
        let jobsContent = 'No Jobs Found!';
        if (jobsList.length != 0) {
            jobsContent = (
                <div className='ui three cards'>
                    {
                        jobsList.map((job) =>
                            <Card key={job.id}>
                                <Card.Content>
                                    <Card.Header>{job.title}</Card.Header>
                                    <Label color='black' ribbon='right'>
                                        <Icon name='user' />
                                        0
                                </Label>
                                    <Card.Meta>{job.location.city}, {job.location.country}</Card.Meta>
                                    <Card.Description>
                                        {job.summary}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div>
                                        <Button color='red' size='mini'>
                                            Expired
                                        </Button>
                                        <Button basic color='red' floated='right' size='mini' onClick={() => this.handleClose(job.id)} >
                                            <Icon name='dont' />
                                            close
                                        </Button>
                                        <a href={'/EditJob/' + job.id}>
                                            <Button basic color='blue' floated='right' size='mini' onClick={()=>this.handleEdit(job.id)} disabled={this.state.btnDisabled}>
                                                <Icon name='edit' />
                                                    {this.state.disabled ? 'editing...' : 'edit'}
                                            </Button>
                                        </a>
                                        <a href={'/PostJob/' + job.id}>
                                            <Button basic color='blue' floated='right' size='mini' onClick={() => this.handleCopy(job.id)} disabled={this.state.btnDisabled}>
                                                <Icon name='copy' />
                                                    {this.state.disabled ? 'copying...' : 'copy'}
                                            </Button>
                                        </a>
                                    </div>
                                </Card.Content>
                            </Card>
                        )
                    }
                </div>
            )
        } 
        return jobsContent;
    }
}