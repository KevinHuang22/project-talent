import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Card, Button, Grid, Image } from 'semantic-ui-react'
import { TalentCardDetail, TalentCardVideo } from './TalentCardDetail.jsx';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            talentDetial: true,
            showVideo: true,
        }

    };

    switch() {
        let showVideo = this.state.showVideo;
        console.log(showVideo)
        this.setState({
            showVideo: !showVideo
        })
    }

    renderDetail() {
        return (
            <Card fluid>
                <Card.Content>
                    <Icon name='star' className='right floated' size='large'/>
                    <Card.Header>
                        Ru(Talent) Ng
                        </Card.Header>
                </Card.Content>

                {
                    this.state.showVideo
                        ?
                        <TalentCardVideo />
                        :
                        <TalentCardDetail />
                }
                
                <Card.Content>
                    <Grid columns='equal' textAlign='center'>
                        <Grid.Row>
                            <Grid.Column>
                            {
                                this.state.showVideo
                                    ?
                                    <a onClick={() => this.switch()}><Icon name='user' size='large'/></a>
                                    :
                                    <a onClick={()=>this.switch()}><Icon name='video' size='large'/></a>
                            }
                            </Grid.Column>
                            <Grid.Column>
                                <a><Icon name='file pdf outline' size='large'/></a>
                            </Grid.Column>
                            <Grid.Column>
                                <a><Icon name='linkedin' size='large'/></a>
                            </Grid.Column>
                            <Grid.Column>
                                <a><Icon name='github' size='large'/></a>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='blue' content='C#' size='mini' />
                </Card.Content>
            </Card>
        )
    }


    
    render() {

        return (
            <div>
                {
                    this.state.talentDetial
                        ?
                        this.renderDetail()
                        :
                        <p align='center'><b>There are no talents found for your recruitment company</b></p>
                }
            </div>
        )
    }
}

