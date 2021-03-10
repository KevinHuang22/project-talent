import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from './TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from './CompanyProfile.jsx';
import FollowingSuggestion from './FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import TalentDetail from './TalentDetail.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            companyDetails: {
                companyContact: {}
            },
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: true,
            loadingCompanyDetails: true,
        }

        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    };

    init() {
        let loader = TalentUtil.deepCopy(this.state.loaderData)
        loader.isLoading = false
        this.setState({
            loaderData: loader,
        })

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.loadCompanyDetail((employerData) => {
            this.setState({
                companyDetails: employerData,
                loadingCompanyDetails: false,
            })
            this.loadFeedData(() => this.setState({
                loadingFeedData: false
            }));
            //this.getWatchlist();
        })
    };

    handleScroll() {
        var contentHeight = document.getElementById('content').offsetHeight;
        if ((window.innerHeight + window.scrollY) >= contentHeight) {
            //console.log("At the bottom, scrollY", window.scrollY);
            // Show loading spinner and make fetch request to api
            if (!this.state.loadingFeedData) {
                console.log(this.state.loadPosition)
                this.setState({
                    loadingFeedData: true
                })
                this.loadFeedData(() => this.setState({
                    loadingFeedData: false
                }));
            }
        }
    }

    loadCompanyDetail(callback) {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentprofileservice.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                //console.log("res", res)
                if (res.employer) {
                    employerData = res.employer
                    console.log("employerData", employerData)
                }
                callback(employerData);
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }

    loadFeedData(callback) {
        let cookies = Cookies.get('talentAuthToken')
        let feed = {
            Position: this.state.loadPosition,
            Number: this.state.loadNumber
        }
        $.ajax({
            url: 'https://talentprofileservice.azurewebsites.net/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            data: feed,
            success: function (res) {
                //console.log(res);
                let position = this.state.loadPosition + this.state.loadNumber
                let data = TalentUtil.deepCopy(this.state.feedData);
                data = data.concat(res.data)
                this.setState({
                    loadPosition: position,
                    feedData: data,
                    loadingFeedData: false
                });
                callback();
            }.bind(this),
            error: function (res, status, error) {
                console.log("Talent Feed: error retrieving data.")
                console.log(res)
                console.log(status)
                console.log(error)
            }
        })
    }


    render() {
        let talentSnapshotList = this.state.feedData;
        //console.log(talentSnapshotList);
        const talents = talentSnapshotList.map((talent, index) => 
            <TalentCard
                key={index}
                talentData={talent}
            />
        )

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <section className="page-body" id="content">
                    <div className="ui container">
                        <div className="ui grid">
                            <div className="sixteen wide column">
                                <div className="ui form">
                                    <div className="ui grid">
                                        <div className="row">
                                            <div className="four wide column">
                                                <CompanyProfile
                                                    companyData={this.state.companyDetails}
                                                    loading={this.state.loadingCompanyDetails}
                                                />
                                            </div>

                                            <div className="eight wide column">
                                                {
                                                    talents.length
                                                        ?
                                                        <React.Fragment>
                                                            {talents}
                                                            {
                                                                this.state.loadingFeedData ?
                                                                    <Loader active inline='centered' />
                                                                    : null
                                                            }
                                                        </React.Fragment>
                                                        :
                                                        this.state.loadingCompanyDetails 
                                                            ?
                                                            <Loader active inline='centered' />
                                                            :
                                                            <p align='center'><b>There are no talents found for your recruitment company</b></p>
                                                        
                                                }
                                            </div>
                                            <div className="four wide column">
                                                <FollowingSuggestion
                                                    suggestionListData={this.state.talentSuggestionList}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <br />
                <br />
                </section >    
            </BodyWrapper>
        )
    }
}