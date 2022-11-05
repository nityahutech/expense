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

const leaveCollectionRef = (compId) => {return collection(db, `companyprofile/${compId}/leave`);}
const usersCollectionRef = (compId) => {return collection(db, `companyprofile/${compId}/users`);}

class LeaveContext {
    leaves = [];
    leaveDays = {};
    createLeave = async (newLeave, compId) => {
        let email = await this.getEmailApproverList(newLeave.approver, compId)
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
        return addDoc(leaveCollectionRef(compId), newLeave);
    };
    deleteLeave = (id, compId) => {
        const leaveDoc = doc(db, `companyprofile/${compId}/leave`, id);
        return deleteDoc(leaveDoc);
    };
    getLeaves = (compId) => {
        return getDocs(leaveCollectionRef(compId));
    };
    getAllById = (id, compId) => {
        const q = query(leaveCollectionRef(compId), where("empId", "==", id));
        return getDocs(q);
    };
    getAllByApprover = (name, compId) => {
        const q = query(leaveCollectionRef(compId), where("approver", "==", name));
        return getDocs(q);
    };
    approveLeave = async (id, compId, name) => {
        const leaveDoc = doc(db, `companyprofile/${compId}/leave`, id);
        let email = await this.getEmailId(name, compId)
        let mailOptions = {
            from: 'hutechhr@gmail.com',
            to: `${email}`,
            subject: `Leave Request Status`,
            html: `<p>Hello,</p><br /><p> Your Leave Request is Approved</p>
            <br />
            <p>Hutech HR</p>`,
        }
        sendEmail(mailOptions)
        return updateDoc(leaveDoc, { status: "Approved"})
    }
    rejectLeave = async (id, compId, name, comment) => {
        const leaveDoc = doc(db, `companyprofile/${compId}/leave`, id);
        let email = await this.getEmailId(name, compId)
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
            if(rec.status == "Approved"){
                let dur = rec.dateCalc.length
                if (dur === 1 && rec.slot != 'Full Day') {
                    dur = 0.5;
                }
                console.log(leavedays[rec.nature])
                leavedays[rec.nature] -= dur;
            }
        })
        return leavedays
    }

    getEmailId = async (manager, compId) => {
        let name = manager.split(" ");
        const q = query(usersCollectionRef(compId), where("lname", "==", name[name.length - 1]), where("fname", "==", name[0]));
        let reqData = await getDocs(q);
        let req = reqData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        return req[0].mailid;
    }

    getEmailApproverList = async (manager, compId) => {
        let name = manager.split(" ");
        const q = query(usersCollectionRef(compId), where("lname", "==", name[name.length - 1]), where("fname", "==", name[0]));
        let reqData = await getDocs(q);
        let req = reqData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        const q1 = query(usersCollectionRef(compId), where ("role", "==", "hr"));
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
