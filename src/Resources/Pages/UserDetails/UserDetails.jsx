//Impor from react
import { useEffect } from 'react';

//Import atoms
import { userDetails } from "../../../RecoilResources/Atoms";

//Import from recoil
import { useRecoilState } from "recoil";

//Import from react-bootstrap
import { Image } from 'react-bootstrap';

//Import images
import facebookIcon  from '../../../Assets/facebook-icon.svg';
import gmailIcon from '../../../Assets/gmail-icon.svg';

//Import from fa
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserDetails = (props) => {

    const [displaiedUserDetails] = useRecoilState(userDetails);

    // This hook equales componentWillUnmount lifecycle function
    useEffect(() => {
        return () => {
            window.location.reload();
        }
    }, [])

    console.log(displaiedUserDetails);
    
    return (
        <div style={{marginTop: '8rem', marginBottom: '5rem' ,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Image style={{width: '30%', minWidth: '280px' }} src={displaiedUserDetails.photo.url}/>
            <p style={{margin: '2rem', fontSize: '2rem'}}>
                {displaiedUserDetails.name}
            </p>
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <FontAwesomeIcon icon={faPhone} size='lg'  style={{color: '#832685', marginTop: '0.25rem', marginRight: '1rem'}}/>
                    <p style={{fontSize: '1.5em', color: 'black', marginRight: '1rem'}}>
                        {displaiedUserDetails.phone}
                    </p>
                </div>
                <br/>
                <a style={{margin: '1rem'}} href={displaiedUserDetails.fbLink}>
                    <img src={facebookIcon}/>
                </a>
                <a style={{margin: '1rem'}} href={`mailto:${displaiedUserDetails.email}`}>
                    <img src={gmailIcon}/>
                </a>
            </div>
        </div>
    )
}

export default UserDetails;