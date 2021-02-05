import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        const profileData = {
            address: {},
            nationality: '',
            education: [],
            languages: [],
            skills: [],
            experience: [],
            certifications: [],
            visaStatus: '',
            visaExpiryDate: '',
            profilePhoto: '',
            linkedAccounts: {
                linkedIn: "",
                github: ""
            },
            jobSeekingStatus: {
                status: "",
                availableDate: null
            }
        }
        this.state = {
            profileInitData: profileData,
            loaderData: loaderData,
            profileToUpdate: profileData
        }

        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateAndSaveData = this.updateAndSaveData.bind(this)
        this.updateForComponentId = this.updateForComponentId.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.loadData = this.loadData.bind(this)
        this.init = this.init.bind(this);
        this.saveData = this.saveData.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res);
                this.setState({
                    profileInitData: res.data
                })
            }.bind(this),
            error: function (res) {
                console.log(res)
            }
        })
        this.init()
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileInitData, newValues)
        this.setState({
            profileToUpdate: newProfile
        }, console.log(this.state.profileToUpdate))
    }

    saveData() {
        //console.log(this.state.profileToUpdate)
        this.saveProfile(() => {
            this.loadData();
        })
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
        let newProfile = Object.assign({}, this.state.profileInitData, newValues)
        console.log(newProfile)
            this.setState({
                profileToUpdate: newProfile,
                profileInitData: newProfile
            }, this.saveProfile(() => { }))
    }

    updateForComponentId(componentId, newValues) {
        console.log('initialData before assign:')
        console.log(this.state.profileInitData);
        let newData = Object.assign({}, this.state.profileInitData);
        newData[componentId] = newValues;
        console.log('profileData after assign:')
        console.log(this.state.profileInitData);
        console.log(this.state.profileToUpdate);
        switch (componentId) {
            case 'nationality': {
                //save the nationality immediately when user select a country
                this.updateAndSaveData(newData)
                break;
            }
            case 'languages': {
                this.updateWithoutSave(newData);
                //this.saveData(newData);
                break;
            }
            default:{
                this.updateWithoutSave(newData);
                break;
            }  
        }
    }

    saveProfile(callback) {
        //debugger
        var cookies = Cookies.get('talentAuthToken');
        console.log(this.state.profileToUpdate);
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.profileToUpdate),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    callback();
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        const profile = {
            firstName: this.state.profileInitData.firstName,
            lastName: this.state.profileInitData.lastName,
            email: this.state.profileInitData.email,
            phone: this.state.profileInitData.phone
        }
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                                linkedAccounts={this.state.profileInitData.linkedAccounts}
                                                updateProfileData={this.updateForComponentId}
                                                saveProfileData={this.saveData}
                                                componentId='linkedAccounts'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={profile}
                                                componentId='contactDetails'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Address'
                                            tooltip='Enter your current address'>
                                            <Address
                                                addressData={this.state.profileInitData.address}
                                                updateProfileData={this.updateForComponentId}
                                                saveProfileData={this.saveData}
                                                componentId='address'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Nationality'
                                            tooltip='Select your nationality'
                                        >
                                            <Nationality
                                                nationalityData={this.state.profileInitData.nationality}
                                                saveProfileData={this.updateForComponentId}
                                                componentId='nationality'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Languages'
                                            tooltip='Select languages that you speak'
                                        >
                                            <Language
                                                languageData={this.state.profileInitData.languages}
                                                updateProfileData={this.updateForComponentId}
                                                saveProfileData={this.saveData}
                                                deleteProfileData={this.updateAndSaveData}
                                                componentId='languages'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skills'
                                            tooltip='List your skills'
                                        >
                                            <Skill
                                                skillData={this.state.profileInitData.skills}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work experience'
                                            tooltip='Add your work experience'
                                        >
                                            <Experience
                                                experienceData={this.state.profileInitData.experience}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Education'
                                            tooltip='Add your educational background'
                                        >
                                            <Education
                                                educationData={this.state.profileInitData.education}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Certification'
                                            tooltip='List your certificates, honors and awards'
                                        >
                                            <Certificate
                                                certificateData={this.state.profileInitData.certifications}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                            <VisaStatus
                                                visaStatus={this.state.profileInitData.visaStatus}
                                                visaExpiryDate={this.state.profileInitData.visaExpiryDate}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Status'
                                            tooltip='What is your current status in jobseeking?'
                                        >
                                            <TalentStatus
                                                status={this.state.profileInitData.jobSeekingStatus}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Photo'
                                            tooltip='Please upload your profile photo'
                                            hideSegment={true}
                                        >
                                            <PhotoUpload
                                                imageId={this.state.profileInitData.profilePhotoUrl}
                                                updateProfileData={this.updateWithoutSave}
                                                savePhotoUrl='http://localhost:60290/profile/profile/updateProfilePhoto'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Video'
                                            tooltip='Upload a brief self-introduction video'
                                            hideSegment={true}
                                        >
                                            <VideoUpload
                                                videoName={this.state.profileInitData.videoName}
                                                updateProfileData={this.updateWithoutSave}
                                                saveVideoUrl={'http://localhost:60290/profile/profile/updateTalentVideo'}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='CV'
                                            tooltip='Upload your CV. Accepted files are pdf, doc & docx)'
                                            hideSegment={true}
                                        >
                                            <CVUpload
                                                cvName={this.state.profileInitData.cvName}
                                                cvUrl={this.state.profileInitData.cvUrl}
                                                updateProfileData={this.updateWithoutSave}
                                                saveCVUrl={'http://localhost:60290/profile/profile/updateTalentCV'}
                                            />
                                        </FormItemWrapper>
                                        <SelfIntroduction
                                            summary={this.state.profileInitData.summary}
                                            description={this.state.profileInitData.description}
                                            updateProfileData={this.updateAndSaveData}
                                            updateWithoutSave={this.updateWithoutSave}
                                        />
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
