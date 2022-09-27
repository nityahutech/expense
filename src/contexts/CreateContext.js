import { createAuth } from "../firebase-config"
import { createUserWithEmailAndPassword,
         signOut,
         updatePhoneNumber,
         updateProfile
} from "@firebase/auth"
import ProfileContext from "./ProfileContext"

function generateEmpId() {
    const empId = "001";
    return "HTS"+empId;
}

export async function createUser(values) {
    console.log(values.email, "password");
    let res =  await createUserWithEmailAndPassword(createAuth, values.email, "password")
    updateProfile(res.user, {displayName: values.fname+" "+values.lname})
    // updatePhoneNumber(res.user, values.phone)
    console.log(res);
    console.log(res.user.uid);
    console.log(values.fname+" "+values.lname);
    const valuesToservice = {
        empId: generateEmpId(),
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
    signOut(createAuth);
    return;

}
