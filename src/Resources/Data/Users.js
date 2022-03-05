import { db } from '../../Utilities/Firebase';

let firstDoc = null;
let lastDoc = null;

export const getChunkOfUsers = async (nextOrPrev, itemsPerPage, setIndex) => {
    
    //NOTE: endAt takes the doc itself, not its index.
    const usersRef = !lastDoc || !firstDoc ? db.collection('users').orderBy("name").limit(itemsPerPage) 
    : nextOrPrev == 'next' ? 
    db.collection('users').orderBy("name").startAfter(lastDoc).limit(itemsPerPage) : 
    db.collection('users').orderBy("index").where('index', ">=", setIndex * itemsPerPage).limit(itemsPerPage);

    const queryData = await usersRef.get();
    const chunkOfUsers = [];
    firstDoc = queryData.docs[0]; 
    lastDoc = queryData.docs[queryData.docs.length - 1];
    queryData.forEach((doc) => {
        chunkOfUsers.push(doc.data());
        console.log(doc.data());
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