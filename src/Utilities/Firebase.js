import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import swal from "sweetalert";
import { getLanguageError } from "../Utilities/Helpers";
import { useSetRecoilState } from "recoil";
import { userState } from '../RecoilResources/Atoms';
import configData from "../Config";

const firebaseConfig = {
  apiKey: configData.API_KEY,
  authDomain: configData.AUTH_DOMAIN,
  projectId: configData.PROJECT_ID,
  storageBucket: configData.STORAGE_BUCKET,
  messagingSenderId: configData.MESSAGING_SENDER_ID,
  appId: configData.APP_ID,
  measurementId: configData.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
firebase.auth().onAuthStateChanged(function (u) {
  const setUserState = useSetRecoilState(userState);
  if (u) {
    // User is signed in.
    // currentUser = u;
    setUserState(u);
  } else {
    // No user is signed in.
    // currentUser = null;
    setUserState(null);
  }
});

export const signUp = async (lang, form, files = []) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(form.email, form.password)
    .then((userCredential) => {
      let user = userCredential.user;
      delete form.password;
      if (files.length > 0) {
        let promisesArray = [];
        files?.forEach((file) => {
          if (file.path) {
            var storageRef = storage.ref(file.path + file.name);
            promisesArray.push(storageRef.put(file.file));
          } else {
            let storageRef = storage.ref("images/" + file.name);
            promisesArray.push(storageRef.put(file.file));
          }
        });
        Promise.all(promisesArray).then((results) => {
          let urlsPromisesArray = [];
          results.forEach((result) => {
            urlsPromisesArray.push(result.ref.getDownloadURL());
          });
          Promise.all(urlsPromisesArray).then((downloadUrls) => {
            downloadUrls.forEach((url, i) => {
              form[files[i].id] = { url };
            });
            db.collection("users")
              .doc(user.uid)
              .set(form, { merge: true })
              .then(() => {
                if (form.type == 0) {
                  const codeRef = db.collection("codes").doc(form.codeId);
                  codeRef
                    .update({ used: true })
                    .then((res) => {
                      window.location = "/home?signedUp=true";
                    })
                    .catch((e) => {
                      console.log("error", e.message);
                    });
                }
                window.location = "/home?signedUp=true";
              })
              .catch((error) => {
                let errorMessage =
                  lang == "ar"
                    ? getLanguageError(lang, error.code)
                    : error.message;
                swal(errorMessage, "", "error");
                console.error("Error writing document: ", error);
              });
          });
        });
      } else {
        db.collection("users")
          .doc(user.uid)
          .set(form, { merge: true })
          .then(() => {
            console.log("Document successfully written!");
            window.location = "/home?signedUp=true";
          })
          .catch((error) => {
            let errorMessage =
              lang == "ar" ? getLanguageError(lang, error.code) : error.message;
            swal(errorMessage, "", "error");
            console.error("Error writing document: ", error);
          });
      }
    })
    .catch((error) => {
      let errorMessage =
        lang == "ar" ? getLanguageError(lang, error.code) : error.message;
      // ..
      console.log(error);

      swal(errorMessage, "", "error");
    });
};

export const getCode = async (code) => {
  let codesRef = await db
    .collection("codes")
    .where("code", "==", code)
    .limit(1);
  codesRef = await codesRef.get();
  if (codesRef.docs?.length >= 1) {
    let data = {};
    codesRef.forEach((doc) => {
      data = doc.data();
      data.id = doc.id;
    });
    return data;
  } else {
    return false;
  }
};

export const logIn = async (lang, { email, password }) => {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          // var user = userCredential.user;
          return userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          swal(errorMessage, "", "error");
        });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal(errorMessage, "", "error");
    });
};

export const logOut = async() => {
  return firebase.auth().signOut().then(() => {
    return 1;
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    swal(errorMessage, "", "error");
    return 0;
  });
}

