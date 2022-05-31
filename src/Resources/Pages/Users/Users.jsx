import { useState, useEffect } from 'react';
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
import { getLanguageError, getLanguagePhrase, getLanguageConstant } from '../../../Utilities/Helpers';

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
    const [isClearResultsShown, setIsClearResultsShown] = useState(false);

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
            setIsClearResultsShown(true);
        });    
        setIsNextBtnDisabled(true);
    }

    const handlePageClick = (event) => {
        setNextOrPrev(event.target.value);
        setUsersSetIndex(event.target.value == 'next' ? usersSetIndex + 1 : usersSetIndex - 1 );
    }

    const handleClearResults = () => {
        window.location.reload();
    }


    return (
        <div className="main-container">
            <label id="search">{getLanguagePhrase(lang, 'searchWithPhoneNumber')}</label>
            <div className='search-bar-container'>
                <input for="search" type="text" onChange={(event) => handleInputChange(event)}/>
                <button type="submit" onClick={() => handleSearch()} className='button search'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
            {isClearResultsShown &&
                <button className='button' style={{marginBottom: '1rem'}} onClick={() => handleClearResults()}>
                    {getLanguageConstant(lang, 'clearResults')}
                </button>
            }
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
                <div style={{direction: 'ltr'}}>
                  <button className='button' style={{margin: '2rem'}} disabled={isPrevBtnDisabled ? 'disabled' : ''} value='prev' onClick={(event) => handlePageClick(event)}>&larr; {getLanguageConstant(lang, 'previous')}</button>
                  <button className='button' style={{margin: '2rem'}} disabled={isNextBtnDisabled ? 'disabled' : ''} value='next' onClick={(event) => handlePageClick(event)}>{getLanguageConstant(lang, 'next')} &rarr;</button>
                </div>
            </>
            }
        </div>
    )
}

export default Users;