import { db, storage } from "../firebase-config";
import {
    collection,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { createUser } from "./CreateContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import moment from "moment";

const companyProfileCollectionRef = collection(db, "companyprofile");

class CompanyProContext {

    getCompanyProfile = async (id) => {
        const profileInfo= doc(db,"companyprofile",id);
        let rec=await getDoc(profileInfo);
        let recordData=rec.data();
        return recordData;
    };

    getAllCompany = async () => {
        let req = await getDocs(companyProfileCollectionRef)
        let data = req.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            }
        })
        return data;
    }

    checkUserExists = async (email) => {
        let q = query(collection(db, "users"), where("mailid", "==", email))
        let req = await getDocs(q);
        console.log(!req.empty)
        return !req.empty;
    }
    
    getOrgId = async () => {
        return getDocs(companyProfileCollectionRef).then((snapshot) => {
          let res = snapshot.docs.length + 1;
          return "compId" + ("00" + res.toString()).slice(-3);
        })
    }
   
    createAdmins = (accessList, id) => {
        let newList = [];
        const timer = setTimeout(()=>{
            accessList.map(async (user) => {
                let name = user.fName + (user.mName?` ${user.mName} `:" ") + user.lName;
                let newRec = {
                    department: null,
                    designation: user.designation,
                    role: "hr",
                    doj: moment(),
                    location: "Registered Office",
                    empType: "Full-Time",
                    gender: "",
                    phone: user.phone,
                    name: name,
                    fname: user.fName,
                    mname: user.mName,
                    lname: user.lName,
                    email: user.email,
                    mailid: user.email,
                    repManager: "",
                    secManager: "",
                    isLead: true,
                    isManager: true, 
                    isHr: true
                };
                newList.push({
                    name: name,
                    userRole: user.designation,
                    phone: user.phone,
                    mailid: user.email,
                })
                await createUser(newRec, id)
            })
            this.updateCompInfo(id, {accessList: newList} )
        }, 2000);
        return () => clearTimeout(timer);
    }

    // createDepts = (id) => {
    //     const order = ["Business Unit", "Division", "Department", "Team"]
    //     let temp = localStorage.getItem("OrgHier");
    //     if (!temp || temp == "[]") {
    //         return;
    //     }
    //     let orgHier = JSON.parse(temp);
    //     orgHier.map(org => {
    //         let parents = org.parent == null ? [""] : org.parent.split("/")
    //         let place = order.indexOf(org.type)
    //         let refPath = `companyprofile/${id}/departments` + (org.parent == null ? 
    //             "" : `/${parents[0]}/div` + (place == 1 ? 
    //                 "" : `/${parents[1]}/dept` + (place == 2 ? 
    //                     "" : `/${parents[2]}/team`
    //         )));
    //         setDoc(doc(db, refPath, org.name), {
    //             description: org.description,
    //             workLoc: "Registered Office"
    //         })
    //     })
        
    // }
    
    createCompInfo = async (id, newInfo, file, accessList) => {
        console.log(id, newInfo, file, accessList)
        if (file) {
            const storageRef = ref(storage, `/${id}/logo`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    newInfo.logo = url;
                    setDoc(doc(db, "companyprofile", id), newInfo);
                    this.createAdmins(accessList, id)
                    // this.createDepts(id);
                    return Promise.resolve();
                })
            });
        } else {
            newInfo.logo = null;
            setDoc(doc(db, "companyprofile", id), newInfo);
            this.createAdmins(accessList, id)
            // this.createDepts(id);
            return Promise.resolve();
        }
    };

    deleteCompInfo = (id, updateCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        let field = Object.keys(updateCompInfo)[0]
        return updateDoc(companyDoc, {[`${field}`]: arrayRemove(updateCompInfo[`${field}`])});
    };
    
    addCompInfo = (id, updateCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        let field = Object.keys(updateCompInfo)[0]
        return updateDoc(companyDoc, {[`${field}`]: arrayUnion(updateCompInfo[`${field}`])});
    };

    editCompInfo = async (id, oldCompInfo, newCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        let field = Object.keys(newCompInfo)[0]
        await updateDoc(companyDoc, {[`${field}`]: arrayRemove(oldCompInfo[`${field}`])});
        updateDoc(companyDoc, {[`${field}`]: arrayUnion(newCompInfo[`${field}`])});
        return;
    }
    
    updateCompInfo = (id, updateCompInfo, file) => {
        console.log(id, updateCompInfo, file)
        if (file) {
            const storageRef = ref(storage, `/${id}/logo`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updateCompInfo.logo = url;
                    updateDoc(doc(db, "companyprofile", id), updateCompInfo);
                    return Promise.resolve();
                })
            });
        } else {
            updateDoc(doc(db, "companyprofile", id), updateCompInfo);
            return Promise.resolve();
        }
    };
}

export default new CompanyProContext();
