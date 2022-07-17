// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, 
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADjgJzkpa0MGYZpwhYb7HfCPnjXQCwICY",
  authDomain: "crown-clothing-db-b445e.firebaseapp.com",
  projectId: "crown-clothing-db-b445e",
  storageBucket: "crown-clothing-db-b445e.appspot.com",
  messagingSenderId: "987422778950",
  appId: "1:987422778950:web:d3d2996c47ae8e97144c47"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth,provider);

export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth,provider);
export const db = getFirestore();

export const addCollectionToDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    });
    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () =>{
    const colletionRef = collection(db,'categories');
    const q = query(colletionRef);
   
    const querySnapshot = await getDocs(q);
   
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});
    console.log(categoryMap);
    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    if(userSnapShot.exists() === false){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try{
            const createduser = await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            }); 
        }
        catch(e){
            console.log('error creating the user' + e.message)
        }
    }   
    else{
        //
    }
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => {
    signOut(auth);
}

export const onAuthStateChangedListener = async (callback) => {

    onAuthStateChanged(auth,callback)
}

