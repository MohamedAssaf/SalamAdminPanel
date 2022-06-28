import { db } from '../../Utilities/Firebase';

export const getUsersLength = async () => {

    return (await db.collection('users').get()).size;

}

var lastDoc = null;

export const getChunkOfUsers = async (nextOrPrev, itemsPerPage, setIndex) => {
    
    console.log('Calling the backend...');
    //NOTE: startAt, startAfter, endAt & endBefore take the doc itself, not its index.
    const usersRef = !lastDoc ? db.collection('users').orderBy("name").limit(itemsPerPage) 
    :
    db.collection('users').orderBy("name").startAfter(lastDoc).limit(itemsPerPage) 

    const queryData = await usersRef.get();
    const chunkOfUsers = [];
    lastDoc = queryData.docs.length > 0 ? queryData.docs[queryData.docs.length - 1] : lastDoc;
    queryData.forEach((doc) => {
        chunkOfUsers.push(doc.data()); 
    });

    return chunkOfUsers;
}

export const getUserWithNumber = async (phoneNumber) => {
    const userRef = db.collection('users').where("phone", "==", `${phoneNumber}`);
    const queryData = await userRef.get();
    if(queryData.docs[0]) {
        return queryData.docs[0].data();
    } 
    return null;
}