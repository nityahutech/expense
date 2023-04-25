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

const companyProfileCollectionRef = collection(db, "companyprofile");

class CompanyProContext {
  getCompanyProfile = async (id) => {
    const profileInfo = doc(db, "companyprofile", id);
    let rec = await getDoc(profileInfo);
    let recordData = rec.data();
    return recordData;
  };

  getAllCompany = async () => {
    let req = await getDocs(companyProfileCollectionRef);
    let data = req.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return data;
  };

  checkUserExists = async (email) => {
    let q = query(collection(db, "users"), where("mailid", "==", email));
    let req = await getDocs(q);
    return !req.empty;
  };

  getOrgId = async () => {
    return getDocs(companyProfileCollectionRef).then((snapshot) => {
      let res = snapshot.docs.length + 1;
      return "compId" + ("00" + res.toString()).slice(-3);
    });
  };

  createAdmins = (accessList, id) => {
    let newList = [];
    const timer = setTimeout(() => {
      accessList.map(async (user) => {
        let name =
          user.fName + (user.mName ? ` ${user.mName} ` : " ") + user.lName;
        let newRec = {
          businessUnit: user.businessUnit || "Default",
          division: user.division || "Default",
          department: user.dept || "Default",
          team: user.team || "Default",
          designation: user.designation,
          role: "admin",
          doj: user.doj,
          dob: user.dob,
          workLocation: "Registered Office",
          empType: "Full-Time",
          gender: user.gender || "",
          prefix: user.prefix || "",
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
          isHr: true,
          empId: user.empId,
          remark: user.note || "",
        };
        newList.push({
          name: name,
          userRole: user.designation,
          phone: user.phone,
          mailid: user.email,
          prefix: user.prefix || "",
        });
        await createUser(newRec, id);
      });
      this.updateCompInfo(id, { accessList: newList });
    }, 2000);
    return () => clearTimeout(timer);
  };

  createConfig = (id, des) => {
    setDoc(doc(db, `companyprofile/${id}/configurations`, "addemployeePage"), {
      designations: des,
      enabled: false,
      repManager: [],
      secManager: [],
      lead: [],
    });
    setDoc(doc(db, `companyprofile/${id}/configurations`, "salary"), {
      Deduction: [],
      Earning: [],
    });
    setDoc(doc(db, `companyprofile/${id}/configurations`, "attendanceConfig"), {
      attendanceNature: {
        endtime: "18:00",
        inputclock: false,
        maxBreakDuration: 1,
        selectedDay: {
          Friday: "fullday",
          Monday: "fullday",
          Saturday: "dayoff",
          Sunday: "dayoff",
          Thursday: "fullday",
          Tuesday: "fullday",
          Wednesday: "fullday",
        },
        starttime: "09:00",
      },
    });
    setDoc(doc(db, `companyprofile/${id}/configurations`, "leaveType"), {
      ["Sick Leave"]: {
        description:
          "These are one-day leaves taken for health-related reasons. This can only be taken for the current day or the next (1 day in advance).",
        count: 6,
        weekendBtwnLeave: false,
        holidaysBtwnLeave: false,
        creditable: true,
        frequency: "Monthly",
        period: "Start",
        probation: true,
        carryForward: false,
        enabled: true,
      },
      ["Optional Leave"]: {
        description:
          "Optional holidays are those that the employee can choose to avail.",
        count: 2,
        weekendBtwnLeave: false,
        holidaysBtwnLeave: false,
        creditable: true,
        frequency: "Monthly",
        period: "Start",
        probation: true,
        carryForward: false,
        enabled: true,
      },
      ["Loss Of Pay"]: {
        description:
          "Employees taking leave under loss of pay will not be compensated for the missing days in their salary.",
        count: 0,
        weekendBtwnLeave: false,
        holidaysBtwnLeave: false,
        probation: true,
      },
    });
  };

  createCompInfo = async (id, newInfo, file, accessList) => {
    const storageRef = ref(storage, `/${id}/logo`);
    uploadBytesResumable(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        newInfo.logo = url;
        let des = {};
        let codes = accessList.map((user) => {
          des[`${user.designation}`] = 1;
          return user.empId
        }).sort((a, b) => b.localeCompare(a));
        newInfo.lastEmpId = codes[0];
        setDoc(doc(db, "companyprofile", id), newInfo);
        this.createAdmins(accessList, id);
        this.createConfig(id, des);
        return Promise.resolve();
      });
    });
  };

  deleteCompInfo = (id, updateCompInfo) => {
    const companyDoc = doc(db, "companyprofile", id);
    let field = Object.keys(updateCompInfo)[0];
    return updateDoc(companyDoc, {
      [`${field}`]: arrayRemove(updateCompInfo[`${field}`]),
    });
  };

  addCompInfo = (id, updateCompInfo) => {
    const companyDoc = doc(db, "companyprofile", id);
    let field = Object.keys(updateCompInfo)[0];
    return updateDoc(companyDoc, {
      [`${field}`]: arrayUnion(updateCompInfo[`${field}`]),
    });
  };

  editCompInfo = async (id, oldCompInfo, newCompInfo) => {
    const companyDoc = doc(db, "companyprofile", id);
    let field = Object.keys(newCompInfo)[0];
    await updateDoc(companyDoc, {
      [`${field}`]: arrayRemove(oldCompInfo[`${field}`]),
    });
    updateDoc(companyDoc, {
      [`${field}`]: arrayUnion(newCompInfo[`${field}`]),
    });
    return;
  };

  updateCompInfo = (id, updateCompInfo, file) => {
    if (file) {
      const storageRef = ref(storage, `/${id}/logo`);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateCompInfo.logo = url;
          updateDoc(doc(db, "companyprofile", id), updateCompInfo);
          return Promise.resolve();
        });
      });
    } else {
      updateDoc(doc(db, "companyprofile", id), updateCompInfo);
      return Promise.resolve();
    }
  };

  getAllUsersByOrg = async (compId, name, parent, type) => {
    let path = parent == null ? null : parent.split("/")
    let q;
    switch (type) {
      case "Business Unit" : q = query(collection(db, `companyprofile/${compId}/users`), where("businessUnit", "==", name));
        break;
      case "Division" : q = query(collection(db, `companyprofile/${compId}/users`), where("businessUnit", "==", parent), where("division", "==", name));
        break;
      case "Department" : q = query(collection(db, `companyprofile/${compId}/users`), where("businessUnit", "==", path[0]), where("division", "==", path[1]), where("department", "==", name));
        break;
      case "Team" : q = query(collection(db, `companyprofile/${compId}/users`), where("businessUnit", "==", path[0]), where("division", "==", path[1]), where("department", "==", path[2]), where("team", "==", name));
        break;
    }
    let d = await getDocs(q);
    let data = d.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    })
    return data;
  }

}

export default new CompanyProContext();
