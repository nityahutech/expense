import { createAuth } from "../firebase-config"
import { createUserWithEmailAndPassword,
         signOut,
         updatePhoneNumber,
         updateProfile
} from "@firebase/auth"
import ProfileContext from "./ProfileContext"
import {
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
const users = collection(db, "users");


export async function createUser(values) {
    console.log(values.email, "password");
    let res =  await createUserWithEmailAndPassword(createAuth, values.email, "password")
    updateProfile(res.user, {displayName: values.fname+" "+values.lname})
    // updatePhoneNumber(res.user, values.phone)
    console.log(res);
    console.log(res.user.uid);
    console.log(values.fname+" "+values.lname);
    const valuesToservice = {
        fname: values.fname,
        lname: values.lname,
        mailid: values.email,
        doj: values.doj.format('DD-MM-YYYY'),
        phonenumber: values.phone,
        gender: values.gender,
        designation: values.designation,
        role: values.role,
        address: "",
        city: "",
        country: "",
        state: "",
        zipcode: "",
    }
    console.log(valuesToservice);
    ProfileContext.addProfile(res.user.uid, valuesToservice)
    .then(result => {
        signOut(createAuth);
        console.log(result);
        return result;
    })
    .catch(error=> {
        return false;
    })
    

}


export async function getUsers() {
    const q = query(users);
    // console.log(q);
    return getDocs(q);
    // return [
    //     {
    //       key: "1",
    //       sn: "1",
    //       fname: "Saswat",
    //       lname: "Patel",
    //       email: "saswat@gmail.com",
    //       dob: "23/07/1992",
    //       gender: "mail",
    //       cnumber: "234456677",
    //     },
    //     {
    //       key: "2",
    //       sn: "2",
    //       fname: "Jatin",
    //       lname: "Yadav",
    //       email: "jatin@gmail.com",
    //       dob: "23/07/1993",
    //       gender: "mail",
    //       cnumber: "234456677",
    //     },
    //   ]

}