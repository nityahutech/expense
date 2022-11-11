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
    
    checkOrgIdExists = async (id) => {
        let req = await getDoc(doc(db, "companyprofile", id));
        console.log(req.data(),req.data()?true:false)
        return req.data()? true : false;
    }
   
    createAdmins = (accessList, id) => {
        const timer = setTimeout(()=>{
            accessList.map(async (user) => {
                let name = user.name.split();
                let mname = "";
                for (let i = 1; i < name.length - 1; i++) {
                  mname = mname + ((i != 1 ? " " : "") + name[i]);
                  console.log(mname)
                }
                let newRec = {
                    department: null,
                    designation: user.userRole,
                    role: "hr",
                    doj: moment(),
                    location: "Registered Office",
                    empType: "Full-Time",
                    gender: "",
                    phone: user.phone,
                    fname: name[0],
                    mname: mname,
                    lname: name[(name.length)-1],
                    email: user.mailid,
                    mailid: user.mailid,
                    repManager: "",
                    secManager: "",
                };
                console.log(newRec, id)
                await createUser(newRec, id)
            })
            this.updateCompInfo(id, {accessList: accessList} )
        }, 2000);
        return () => clearTimeout(timer);
    }
   
    createCompInfo = async (id, newInfo, file, accessList) => {
        if (file) {
            const storageRef = ref(storage, `/${id}/logo`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    newInfo.logo = url;
                    setDoc(doc(db, "companyprofile", id), newInfo);
                    this.createAdmins(accessList, id)
                    return Promise.resolve();
                })
            });
        } else {
            newInfo.logo = null;
            setDoc(doc(db, "companyprofile", id), newInfo);
            this.createAdmins(accessList, id)
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
