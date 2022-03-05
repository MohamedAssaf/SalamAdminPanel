import { useState, useEffect, useRef } from 'react';
import "./Users.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import Cards from "../../Reusables/Cards/Cards";

//Import fetching data from firestore functions  
import { getChunkOfUsers } from '../../Data/Users';
import { getUserWithNumber } from '../../Data/Users'; 

//Import from font-awesome
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Import validators
import { validatePhoneNumber } from '../../../Utilities/Validators';

//Import helpers
import { getLanguageError } from '../../../Utilities/Helpers';
import { getLanguagePhrase } from '../../../Utilities/Helpers';

const Users = function() {
    
    const [lang] = useRecoilState(websiteLanguageState);
    const [users, setUsers] = useState([]);
    const [nextOrPrev, setNextOrPrev] = useState('');
    const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(true);
    const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [usersSetIndex, setUsersSetIndex] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [invalidPhoneNumberIsShown, setInvalidPhoneNumberIsShown] = useState(false);
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

    useEffect(() => {
        console.log(`usersSetIndex is ${usersSetIndex}`);
        console.log(`Get ${nextOrPrev} users set`);
        setIsPrevBtnDisabled(usersSetIndex == 0 ? true : false);
        getChunkOfUsers(nextOrPrev, itemsPerPage, usersSetIndex).then((chunkOfUsers) => {
            setUsers(chunkOfUsers);
            setIsNextBtnDisabled(chunkOfUsers[chunkOfUsers.length - 1].lastItem ? true : false);
        });
    }, [usersSetIndex]);
    
    const handleInputChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleSearch = () => {
        if(validatePhoneNumber(phoneNumber).status == 0) {
            setInvalidPhoneNumberIsShown(true);
            setPhoneNumberErrorMessage(getLanguageError(lang, validatePhoneNumber(phoneNumber).error));
            return;
        }
        setInvalidPhoneNumberIsShown(false);
        getUserWithNumber(phoneNumber).then((user) => {
            setUsers([user]);
        });    
        setIsNextBtnDisabled(true);
    }

    const handlePageClick = (event) => {
        setNextOrPrev(event.target.value);
        setUsersSetIndex(event.target.value == 'next' ? usersSetIndex + 1 : usersSetIndex - 1 );
    }


    return (
        <div className="main-container">
            <label id="search">Search by phone number : </label>
            <div className='search-bar-container'>
                <input for="search" type="text" onChange={(event) => handleInputChange(event)}/>
                <button type="submit" onClick={() => handleSearch()} className='button'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
            {invalidPhoneNumberIsShown &&
                <p style={{color: "red"}}>{phoneNumberErrorMessage}</p>
            }
            {
                users.length == 1 && !users[0] &&
                <h3 style={{marginTop: "10%"}}>{getLanguagePhrase(lang, "NoUsersFromBackEnd")}</h3>
            }
            { users[0] &&
            <>
                <Cards items={users}/>
                <div>
                  <button className='button' disabled={isPrevBtnDisabled ? 'disabled' : ''} value='prev' onClick={(event) => handlePageClick(event)}>&larr; Previous</button>
                  <button className='button' disabled={isNextBtnDisabled ? 'disabled' : ''} value='next' onClick={(event) => handlePageClick(event)}>Next &rarr;</button>
                </div>
            </>
            }
        </div>
    )
}

export default Users;