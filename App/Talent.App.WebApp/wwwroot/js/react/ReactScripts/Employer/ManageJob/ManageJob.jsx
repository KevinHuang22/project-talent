import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { JobsFilter } from './JobsFilter.jsx';
import { JobCardsGroup } from './JobCardsGroup.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Button, Image, Grid, Label } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData;
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData);
        loaderData.isLoading = false;
        //this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //the loadData() function is called here, an anonymous callback function is passed as paramater
        this.loadData(() => {
            //console.log(loaderData);
            this.setState({ loaderData });
            console.log(this.state.loadJobs);
        })
        console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    //define a function which requires a callback function as paramater
    //this callback function is called inside the succeed/error block
    loadData(callback) {
        //var link = 'http://localhost:51689/listing/listing/getemployerjobs';
        var link = 'https://talentTalentService.azurewebsites.net/listing/listing/getEmployerJobs';//Talent
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                let jobsData = null;
                if (res.myJobs) {
                    jobsData = res.myJobs;
                    //console.log(jobsData);
                }
                let newSD = Object.assign([], this.state.loadJobs, jobsData);
                this.setState({
                    loadJobs: newSD
                });
                callback();
            }.bind(this),
            error: function (res) {
                console.log(res.status);
            }
        })
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        //let jobsListContext = this.state.loadJobs.length == 0 ? "No Jobs Found" : this.renderJobs(this.state.loadJobs);
        let totalPage = 0;
        let totalJobs = this.state.loadJobs.length;
        if (totalJobs !== 0) {
            totalPage = Math.ceil(totalJobs / 6);
            console.log('total pages: ' + totalPage);
        }
            
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h2>
                        List of Jobs
                    </h2>
                    <JobsFilter />
                    <br />
                        <JobCardsGroup
                            jobsList={this.state.loadJobs}
                        />
                </div>
                <br />
                <div align='center'>
                    <Pagination
                        ellipsisItem={totalPage==0? '' : { content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        totalPages={ totalPage }
                    />
                </div>
                <br />
            </BodyWrapper>
        )
    }

    /*renderJobs(jobsList) {
        return (
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
                                    <Button basic color='red' floated='right' size='mini'>
                                        <Icon name='dont' />
                                        close
                                    </Button>
                                    <Button basic color='blue' floated='right' size='mini'>
                                        <Icon name='edit' />
                                        edit
                                    </Button>
                                    <Button basic color='blue' floated='right' size='mini'>
                                        <Icon name='copy' />
                                        copy
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    )
                }
            </div>
        )
    }*/
}