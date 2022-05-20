import {ref,watchEffect} from 'vue'
import {db} from '../Firebase/config'
import { collection,onSnapshot } from 'firebase/firestore'

const updateStore=()=>{

    const documents = ref(null)


    let collectionRef=db.collection





}