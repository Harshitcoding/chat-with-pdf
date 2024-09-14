import {getApp,getApps,initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app)
const storage = getStorage(app)

export {db,storage}
