import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    doc,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    updateDoc,
    where,
    getFirestore,
    writeBatch

} from "firebase/firestore";
import { sendEmail } from "./EmailContext";
const usersCollectionRef = collection(db, "users");


const appraisalCollectionRef = collection(db, "appraisal");

class AppraisalContext {
    getAllAppraisal = () => {
        const q = query(appraisalCollectionRef, orderBy("quarter", "desc"));
        return getDocs(q);
    };

    getLeadAppraisal = (leadName) => {
        const q = query(appraisalCollectionRef, where("lead", "==", leadName));
        return getDocs(q);
    };

    getManagerAppraisal = (mgrName) => {
        const q = query(appraisalCollectionRef, where("repManager", "==", mgrName));
        return getDocs(q);
    };

    getUserAppraisal = (id) => {
        const q = query(appraisalCollectionRef, where("empId", "==", id));
        // console.log(q);
        return getDocs(q);
    }

    createAppraisal = (appraisal) => {
        console.log('appraisal', 'received in service')
        return addDoc(appraisalCollectionRef, appraisal);
    };


    createBatchAppraisal = (appraisalList) => {
        console.log('appraisal received in service', appraisalList)
        var db = getFirestore();
        const batch = writeBatch(db);

        appraisalList.forEach((appraisal) => {
            addDoc(appraisalCollectionRef, appraisal);
        });
        return batch.commit()

    };

    deleteAppraisal = (id) => {
        const appraisal = doc(db, "appraisal", id);
        return deleteDoc(appraisal);
    };

    updateAppraisal = (id, updateAppraisal) => {
        const apprasialDoc = doc(db, "appraisal", id);
        console.log('apprasialDoc', apprasialDoc)
        return updateDoc(apprasialDoc, updateAppraisal);
    };

    sendEmailToLead = async (appraisal) => {
        let email = await this.getEmailList(appraisal.lead)
        let mailOptions = {
            from: 'hutechhr@gmail.com',
            to: `${email}`,
            cc: `${appraisal.mailid}`,
            subject: `Appraisal self Assesment completed By ${appraisal.fname} ${appraisal.lname} `,
            html: `<p>Hello ${appraisal.lead},</p><br />
            <p> ${appraisal.fname} ${appraisal.lname} has completed their self Assessment=></p>
        <br />
        <p>Please fill lead Assessment through HR portal.</p>
        <br />
        <p>Hutech HR</p>`,
        }
        sendEmail(mailOptions)

    };

    sendEmailToManager = async (appraisal) => {
        let email = await this.getEmailList(appraisal.repManager)
        let mailOptions = {
            from: 'hutechhr@gmail.com',
            to: `${email}`,
            cc: `${appraisal.mailid}`,
            subject: `Appraisal lead assesment completed for ${appraisal.fname} ${appraisal.lname} `,
            html: `<p>Hello ${appraisal.repManager},</p><br />
            <p> lead assesment has completed for ${appraisal.fname} ${appraisal.lname} =></p>
        <br />
        <p>Please fill Manager Assessment through HR portal.</p>
        <br />
        <p>Hutech HR</p>`,
        }
        sendEmail(mailOptions)

    };

    getEmailList = async (manager) => {
        let name = manager.split(" ");
        const q = query(usersCollectionRef, where("lname", "==", name[name.length - 1]), where("fname", "==", name[0]));
        let reqData = await getDocs(q);
        let req = reqData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });

        return req[0].mailid;
    }
}


export default new AppraisalContext();
