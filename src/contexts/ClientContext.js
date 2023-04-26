import { db } from '../firebase-config';
import {
    addDoc,
    getDocs,
    collection,
    doc,
    deleteDoc
} from 'firebase/firestore';

let compId = sessionStorage.getItem('compId')
let clientCollectionRef = collection(
    db,
    `companyprofile/${compId}/client`
)


class clientManagment {

    addClient = async (clientdata) => {
        console.log('clientAdd', clientdata)
        await addDoc(clientCollectionRef, clientdata)

    }

    getClient = async () => {
        let req = await getDocs(clientCollectionRef)
        console.log('values', req)
        let data = req.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        console.log('values', data)
        return data;

    }

    deleteClient = async (id) => {
        console.log('value', id)
        const deleteClientContact = doc(clientCollectionRef, id)
        return deleteDoc(deleteClientContact)

    }
}

export default new clientManagment()


