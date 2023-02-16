import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    orderBy,
} from "firebase/firestore";
import { sendEmail } from "./EmailContext";

let compId = sessionStorage.getItem("compId");

let leaveCollectionRef = collection(db, `companyprofile/${compId}/leave`);
let usersCollectionRef = collection(db, `companyprofile/${compId}/users`);

class LeaveContext {

    leaves = [];
    leaveDays = {};

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        leaveCollectionRef = collection(db, `companyprofile/${compId}/leave`);
        usersCollectionRef = collection(db, `companyprofile/${compId}/users`);
        return;
    }

    createLeave = async (newLeave) => {
        let email = await this.getEmailApproverList(newLeave.approver)
        email.forEach((id) => {
            let mailOptions = {
                from: 'hutechhr@gmail.com',
                to: `${id}`,
                subject: `Leave Request for ${newLeave.name}`,
                html: `<p>Hello,</p><br /><p>Leave Request for ${newLeave.name}</p>
            <br />
            <ul>
            <li>Date(s): ${newLeave.date.join(", ")}</li>
            <li>Type: ${newLeave.nature}</li>
            <li>Slot: ${newLeave.slot}</li>
            <li>Reason: ${newLeave.reason}</li>
            </ul>
            <br />
            <p>Please approve leave request through HR portal.</p>
            <br />
            <p>Hutech HR</p>`,
            }
            sendEmail(mailOptions)
        })
        return addDoc(leaveCollectionRef, newLeave);
    };
    deleteLeave = (id) => {
        const leaveDoc = doc(db, `companyprofile/${compId}/leave`, id);
        return deleteDoc(leaveDoc);
    };
    getLeaves = () => {
        return getDocs(leaveCollectionRef);
    };
    getAllById = (id) => {
        const q = query(leaveCollectionRef, where("empId", "==", id));
        return getDocs(q);
    };
    getAllByApprover = (name) => {
        const q = query(leaveCollectionRef, where("approver", "==", name));
        return getDocs(q);
    };
    updateLeaves = async (id, updateLeave) => {
        let email = await this.getEmailApproverList(updateLeave.approver)
        email.forEach((id) => {
            let mailOptions = {
                from: 'hutechhr@gmail.com',
                to: `${id}`,
                subject: `Leave Request for ${updateLeave.name}`,
                html: `<p>Hello,</p><br /><p>Leave Request for ${updateLeave.name}</p>
            <br />
            <ul>
            <li>Date(s): ${updateLeave.date.join(", ")}</li>
            <li>Type: ${updateLeave.nature}</li>
            <li>Slot: ${updateLeave.slot}</li>
            <li>Reason: ${updateLeave.reason}</li>
            </ul>
            <br />
            <p>Please approve leave request through HR portal.</p>
            <br />
            <p>Hutech HR</p>`,
            }
            sendEmail(mailOptions)
        })
        const leaveDoc = doc(db, `companyprofile/${compId}/leave`, id);
        return updateDoc(leaveDoc, updateLeave);
    };
    approveLeave = async (id, name) => {
        const leaveDoc = doc(db, `companyprofile/${compId}/leave`, id);
        let email = await this.getEmailId(name)
        let mailOptions = {
            from: 'hutechhr@gmail.com',
            to: `${email}`,
            subject: `Leave Request Status`,
            html: `<p>Hello,</p><br /><p> Your Leave Request is Approved</p>
            <br />
            <p>Hutech HR</p>`,
        }
        sendEmail(mailOptions)
        return updateDoc(leaveDoc, { status: "Approved" })
    }
    rejectLeave = async (id, name, comment) => {
        const leaveDoc = doc(db, `companyprofile/${compId}/leave`, id);
        let email = await this.getEmailId(name)
        let mailOptions = {
            from: 'hutechhr@gmail.com',
            to: `${email}`,
            subject: `Leave Request Status`,
            html: `<p>Hello,</p><br /><p> Your Leave Request is Rejected</p>
            <br />
            <p>${comment}</p>
            <br />
            <p>Hutech HR</p>`,
        }
        sendEmail(mailOptions)
        return updateDoc(leaveDoc, { status: "Rejected", comment: comment })
    }
    getLeaveDays = (records, leavedays) => {
        records.forEach((rec) => {
            if (rec.status == "Approved") {
                leavedays[rec.nature] -= rec.len;
            }
        })
        return leavedays
    }

    getEmailId = async (manager) => {
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

    getEmailApproverList = async (manager) => {
        let name = manager.split(" ");
        const q = query(usersCollectionRef, where("lname", "==", name[name.length - 1]), where("fname", "==", name[0]));
        let reqData = await getDocs(q);
        let req = reqData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        const q1 = query(usersCollectionRef, where("role", "==", "admin"));
        let hrData = await getDocs(q1);
        let hr = hrData.docs.map((doc) => {
            return doc.data().mailid;
        });
        hr.push(req[0].mailid)
        let unique = [...new Set(hr)];
        return unique;
    }
}
export default new LeaveContext();
