import { db, storage } from '../firebase-config';
import {
    addDoc,
    getDocs,
    collection,
    doc,
    deleteDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

let compId = sessionStorage.getItem('compId')
let clientCollectionRef = collection(
    db,
    `companyprofile/${compId}/client`
)


class clientManagment {

    // addClient = async (clientdata) => {
    //     console.log('clientAdd', clientdata)
    //     await addDoc(clientCollectionRef, clientdata)
    // }

    addClient = (clientdata, file) => {
        console.log('clientAdd', clientdata, file)
        if (file) {
            const storageRef = ref(storage, `/${compId != "undefined" ? compId : "compId"}/client/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    clientdata.upload = url;
                    clientdata.fileName = file.name
                    addDoc(clientCollectionRef, clientdata)
                    return Promise.resolve();
                })
            });
        } else {
            clientdata.upload = null;
            addDoc(clientCollectionRef, clientdata)
            return Promise.resolve();
        }
    };

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
    updateClient = async (updateClient, id) => {
        console.log('clientAdd', updateClient, id)
        const clientEdit = doc(clientCollectionRef, id)
        return updateDoc(clientEdit, updateClient)
    }

    // addNotification = async (id, data,) => {
    //     console.log('values', id, data)
    //     const eduDoc = doc(companyNotificationTemplateCollectionRef, id);
    //     return setDoc(eduDoc, data)

    // };


}

export default new clientManagment()


