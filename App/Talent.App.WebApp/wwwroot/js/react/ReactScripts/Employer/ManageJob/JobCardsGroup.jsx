import React from 'react';
import Cookies from 'js-cookie';

import { Icon, Card, Button, Label } from 'semantic-ui-react';

export class JobCardsGroup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            disabled: false,
        }

        //this.handleEdit = this.handleEdit.bind(this);
        //this.handleStatus = this.handleStatus.bind(this);
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

    handleStatus(id, status) {
        let jobStatus = status == 'closed' ? 'closeJob' : 'reopenJob';
        if (!window.confirm('Do you want to ' + status +' this job position?'))
            return;
        else {
            var cookies = Cookies.get('talentAuthToken');
            //var link = 'http://localhost:51689/listing/listing/' + jobStatus;  // paramater read FromBody
            //var link = 'https://talentTalentService.azurewebsites.net/listing/listing/closeJob?id=' + id; // paramater from url
            var link = 'https://talentTalentService.azurewebsites.net/listing/listing/' + jobStatus;
            $.ajax({
                url: link,
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                type: "POST",
                data: JSON.stringify(id),
                success: function (res) {
                    if (res.success == true) {
                        TalentUtil.notification.show(res.message, "success", null, null);
                        //window.location = "/ManageJobs";
                        this.props.reload(() => {
                            console.log('Job has been ' + status + '!');
                        });
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
                        jobsList.map((job) => (
                            <Card key={job.id}>
                                <Card.Content>
                                    <Card.Header>{job.title}
                                        {
                                            job.status == 0 ? '' : (
                                                <Label color='red' attached='top right'>
                                                    Expired
                                                </Label>
                                            )
                                        }
                                    </Card.Header>
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
                                        <Button basic color='red' floated='right' size='mini' onClick={() => this.handleStatus(job.id, "closed")} >
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
                                        <Button basic positive floated='right' size='mini' onClick={() => this.handleStatus(job.id, "re-opened")} >
                                            <Icon name='recycle' />
                                            re-open
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        ))
                    }
                </div>
            )
        } 
        return jobsContent;
    }
}