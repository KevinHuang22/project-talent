import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Card, Button, Grid, Image } from 'semantic-ui-react'
import { TalentCardDetail, TalentCardVideo } from './TalentCardDetail.jsx';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);

        const talentData = props.talentData ?
            Object.assign([], props.talentData)
            : []

        this.state = {
            talentData,
            showVideo: true,
        }

    };

    switch() {
        let showVideo = this.state.showVideo;
        this.setState({
            showVideo: !showVideo
        })
    }

    render() {
        let talentData = this.props.talentData
        return (
            <Card fluid >
                <Card.Content>
                    <Icon name='star' className='right floated' size='large' />
                    <Card.Header>
                        {talentData.name}
                    </Card.Header>
                </Card.Content>

                {
                    this.state.showVideo
                        ?
                        <TalentCardVideo videoData={talentData.videoUrl} />
                        :
                        <TalentCardDetail
                            profilePhoto={talentData.photoId}
                            currentEmployer={talentData.currentEmployment}
                            position={talentData.level}
                            visaStatus={talentData.visaStatus}
                        />
                }

                <Card.Content>
                    <Grid columns='equal' textAlign='center'>
                        <Grid.Row>
                            <Grid.Column>
                                {
                                    this.state.showVideo
                                        ?
                                        <a onClick={() => this.switch()}><Icon name='user' size='large' /></a>
                                        :
                                        <a onClick={() => this.switch()}><Icon name='video' size='large' /></a>
                                }
                            </Grid.Column>
                            <Grid.Column>
                                <a href={talentData.cvUrl}><Icon name='file pdf outline' size='large' /></a>
                            </Grid.Column>
                            <Grid.Column>
                                <a><Icon name='linkedin' size='large' /></a>
                            </Grid.Column>
                            <Grid.Column>
                                <a><Icon name='github' size='large' /></a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content extra>
                    {
                        talentData.skills.map(skill => {
                            <Button key={skill.id} basic color='blue' content={skill.skill} size='mini' />
                        })
                    }
                </Card.Content>
            </Card>
        )       
    }
}

