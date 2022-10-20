import { db } from "../firebase-config";
import ProfileContext from "./ProfileContext";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import emailjs from "emailjs-com";
import moment from "moment";
import { sendEmail } from "./EmailContext";
const leaveCollectionRef = collection(db, "leave");
const usersCollectionRef = collection(db, "users");
const daysCollectionRef = collection(db, "leavedays");
class LeaveContext {
  leaves = [];
  leaveDays = {};

  createLeave = async (newLeave) => {
    let email = await this.getEmailApproverList(newLeave.approver);
    console.log(email);
    let data = {
      to_name: newLeave.approver,
      to_email: email,
      name: newLeave.name,
      dates: newLeave.date,
      type: newLeave.nature,
      slot: newLeave.slot,
      reason: newLeave.reason,
    };
    console.log(data);
    emailjs.send(
      "service_9hz3rhk",
      "template_qkiloai",
      data,
      "1CQEfgDcYGkNmButz"
    );
    return addDoc(leaveCollectionRef, newLeave);
  };
  deleteLeave = (id) => {
    const leaveDoc = doc(db, "leave", id);
    return deleteDoc(leaveDoc);
  };
  getLeaves = () => {
    // const q = query(leaveCollectionRef, where("empId", "==", id));
    return getDocs(leaveCollectionRef);
  };
  getAllById = (id) => {
    const q = query(leaveCollectionRef, where("empId", "==", id));
    // console.log(q);
    return getDocs(q);
  };
  getAllByApprover = (name) => {
    const q = query(leaveCollectionRef, where("approver", "==", name));
    return getDocs(q);
  };
  approveLeave = (id, comment) => {
    const leaveDoc = doc(db, "leave", id);
    return updateDoc(leaveDoc, { status: "Approved", comment: comment });
  };
  rejectLeave = (id, comment) => {
    const leaveDoc = doc(db, "leave", id);
    return updateDoc(leaveDoc, { status: "Rejected", comment: comment });
  };
  getLeaveDays = (records, leavedays) => {
    console.log(leavedays);
    records.forEach((rec) => {
      if (rec.status == "Approved") {
        let date1 = moment(rec.dateCalc[0], "Do MMM, YYYY");
        let date2 = moment(rec.dateCalc[1], "Do MMM, YYYY");
        let dur = date2.diff(date1, "days") + 1;
        if (dur === 1 && rec.slot != "Full Day") {
          dur = 0.5;
        }
        leavedays[rec.nature] -= dur;
        console.log(rec.nature, leavedays[rec.nature]);
      }
    });
    console.log("dddddddddd", leavedays);
    return leavedays;
  };

  getEmailApproverList = async (manager) => {
    // const q = query(usersCollectionRef, where("role", "==", "hr"));
    // let reqData = await getDocs(q);
    // let req = reqData.docs.map((doc) => {
    //     return {
    //         ...doc.data(),
    //         id: doc.id
    //     };
    // });
    let name = manager.split(" ");
    console.log(manager, name);
    const q = query(usersCollectionRef, where("fname", "==", name[0]));
    let reqData = await getDocs(q);
    console.log(reqData);
    let req = reqData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    console.log(req[0].mailid);
    return req[0].mailid;
  };
}
export default new LeaveContext();
