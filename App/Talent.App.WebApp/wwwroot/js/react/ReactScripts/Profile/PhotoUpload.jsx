/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Image, Icon, Button } from 'semantic-ui-react';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        const profilePhotoUrl = props.imageId
            ? props.imageId
            : 'http://localhost:61771/images/no-image.png'
        const profilePhoto = '';

        this.state = {
            profilePhoto,
            profilePhotoUrl: '',
            showUploadButton: false,
        }
    };

    onChange(e) {
        let photo = e.target.files;
        let reader = new FileReader();
        let url = reader.readAsDataURL(photo[0]);

        reader.onloadend = () => {
            this.setState({
                profilePhotoUrl: [reader.result],
                showUploadButton: true,
            });
        }
        console.log(url);
    }

    uploadPhoto() {
        this.setState({
            showUploadButton: false,
        });
    }

    render() {
        let photoUrl = this.props.imageId ? this.props.imageId : this.state.profilePhotoUrl;
        console.log(photoUrl)
        return (
            <div className='ui sixteen wide column'>
                <div align='center'>
                    <label htmlFor="file-input">
                        <input id="file-input" type="file" hidden onChange={(e) => this.onChange(e)} accept="image/png, image/jpeg"/>

                        {photoUrl ? <Image className='ui profile photo image' src={photoUrl} size='small' circular /> : <Icon circular size='huge' name='camera' />}
                        <br />
                    </label>

                    {this.state.showUploadButton
                        ?
                        <Button style={{ backgroundColor: '#132357', color: '#fff' }} onClick={() => this.uploadPhoto()}>
                            <Icon name='upload' />
                            Upload
                            </Button>
                        :
                        ''
                    }
                </div>
            </div>
        )
    }
}
