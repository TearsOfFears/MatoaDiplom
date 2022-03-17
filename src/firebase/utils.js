import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {resolvePath} from 'react-router';
import {useAuth} from '../customHooks';
import 'firebase/compat/storage'



import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const storage = firebase.storage();

export {storage , firebase as default}

export const firestore = firebase.firestore();

export const GoogleProvider = new firebase
  .auth
  .GoogleAuthProvider();

export const handleUserProfile = async({userAuth, additionalData}) => {
  if (!userAuth) 
    return;
  const {uid, displayName} = userAuth;
  const userRef = firestore.doc(`users/${displayName}-${uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email, photoURL} = userAuth;
    const timestamp = new Date();

    const userRoles = ['user'];
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        photoURL,
        userRoles,
        ...additionalData
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
        unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

