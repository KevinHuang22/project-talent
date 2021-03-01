import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import { Popup, Icon, Card, Button, Grid, Image, Embed } from 'semantic-ui-react'

export class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <Grid>
                <Grid.Column width={8}>
                    <Image
                        size='large'
                        src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <Card.Content>
                        <h3 className="ui sub header">Talent Snapshot</h3>
                        <br />
                        <label><b>CURRENT EMPLOYER</b></label>
                        <Card.Description>
                            ABC
                            </Card.Description>
                        <br />
                        <label><b>VISA STATUS</b></label>
                        <Card.Description>
                            Citizen
                            </Card.Description>
                        <br />
                        <label><b>POSITION</b></label>
                        <Card.Description>
                            Software developer
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