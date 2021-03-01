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
            loadingFeedData: false,
        }

        this.init = this.init.bind(this);

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
        this.loadData((employerData) => {
            this.setState({
                companyDetails: employerData,
            })
        })
    };

    loadData(callback) {
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

   
    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui grid">
                            <div className="sixteen wide column">
                                <div className="ui form">
                                    <div className="ui grid">
                                        <div className="row">
                                            <div className="four wide column">
                                                <CompanyProfile
                                                    companyData={this.state.companyDetails}
                                                />
                                            </div>

                                            <div className="eight wide column">
                                                <TalentCard />
                                            </div>

                                            <div className="four wide column">
                                                <FollowingSuggestion

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