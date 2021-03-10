import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import { Popup, Icon, Card, Button, Grid, Image, Embed } from 'semantic-ui-react'

export class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {

        let profilePhoto = this.props.profilePhoto ? this.props.profilePhoto : 'https://react.semantic-ui.com/images/avatar/large/steve.jpg';
        let currentEmployer = this.props.currentEmployer ? this.props.currentEmployer : "Unknown";
        let position = this.props.position ? this.props.position : "Unknown";
        let visaStatus = this.props.visaStatus ? this.props.visaStatus : "Unknown";
        return (
            <Grid>
                <Grid.Column width={8}>
                    <Image
                        size='large'
                        src={profilePhoto}
                        alt="no image"
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <Card.Content>
                        <h3 className="ui sub header">Talent Snapshot</h3>
                        <br />
                        <label><b>CURRENT EMPLOYER</b></label>
                        <Card.Description>
                            {currentEmployer}
                        </Card.Description>
                        <br />
                        <label><b>VISA STATUS</b></label>
                        <Card.Description>
                            {visaStatus}
                        </Card.Description>
                        <br />
                        <label><b>POSITION</b></label>
                        <Card.Description>
                            {position}
                        </Card.Description>
                    </Card.Content>
                </Grid.Column>
            </Grid>    
        )
    }
}


export class TalentCardVideo extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <Embed
                autoplay={false}
                color='white'
                hd={false}
                id='gJscrxxl_Bg'
                iframe={{
                    allowFullScreen: true,
                    style: {
                        padding: 10,
                    },
                }}
                source='youtube'
            />
        )
    }
}