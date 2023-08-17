import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';



const firebaseConfig = ({
    apiKey: "AIzaSyAK4iAwYUFWkUZj2Rk9L7mjBv3yIJluMEY",
    authDomain: "auth-cp-fdfcd.firebaseapp.com",
    projectId: "auth-cp-fdfcd",
    storageBucket: "auth-cp-fdfcd.appspot.com",
    messagingSenderId: "315958730592",
    appId: "1:315958730592:web:826a135c6d5ef09504c805"
});
  

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)


export default app;