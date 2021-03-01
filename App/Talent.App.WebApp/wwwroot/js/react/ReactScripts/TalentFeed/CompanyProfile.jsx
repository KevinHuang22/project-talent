import React from 'react';
import { Loader } from 'semantic-ui-react';
import { Icon, Card, Button, Label, Feed, Image } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        const companyDetails = props.companyData ?
            Object.assign({}, props.companyData)
            : {
                companyContact: {
                    name: "",
                    email: "",
                    phone: "",
                    location: {
                        city: '',
                        country: '',
                    },
                },
                profilePhotoUrl: '',
            }
        this.state = {
            companyDetails,
        }
    }

    render() {
        let companyName = this.props.companyData ? this.props.companyData.companyContact.name : ""
        let email = this.props.companyData ? this.props.companyData.companyContact.email : ""
        let phone = this.props.companyData ? this.props.companyData.companyContact.phone : ""
        let location = { city: '', country: '' }
        if (this.props.companyData.companyContact && this.props.companyData.companyContact.location) {
            location = this.props.companyData.companyContact.location
        }
        let profilePhotoUrl = this.props.companyData.profilePhotoUrl ? this.props.companyData.profilePhotoUrl : 'https://react.semantic-ui.com/images/wireframe/image.png'

        return (
            <Card>
                <Card.Content className='center aligned'>
                    <Card.Header>
                        <div>
                            <Image
                                circular
                                className="ui avatar image"
                                //src='https://ionanthos.com/wp-content/uploads/2019/12/MVP-Studio-Logo.png'
                                src={profilePhotoUrl}
                            />
                        </div>
                        {companyName}
                    </Card.Header>
                    <Card.Meta><Icon name='map marker alternate' /> {location.city}, {location.country}</Card.Meta>
                    <Card.Description>
                        We currently do not have specific skills that we desire.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Meta><Icon name='phone' /> : {phone} </Card.Meta>
                    <Card.Meta><Icon name='mail' /> : {email}</Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}