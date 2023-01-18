
import { db } from "../firebase-config";
import moment from 'moment';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    addDoc,
    updateDoc,
    // update,
    deleteDoc,
    doc,
    where,
    limit, 
    runTransaction,
    get
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId");

let attendCollectionRef = collection(db, `companyprofile/${compId}/attendance`);
let usersCollectionRef = collection(db, `companyprofile/${compId}/users`);
let leaveCollectionRef = collection(db, `companyprofile/${compId}/leave`);

class AttendanceContext {

  getCompId = () => {
    compId = sessionStorage.getItem("compId");
    attendCollectionRef = collection(db, `companyprofile/${compId}/attendance`);
    usersCollectionRef = collection(db, `companyprofile/${compId}/users`);
    leaveCollectionRef = collection(db, `companyprofile/${compId}/leave`);
    return;
  }

    addClockData = async (record) => {
      const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", record.empId), where("clockOut","!=",null), limit(1))
      let rec = await getDocs(q);
      let d = rec.docs.map((doc) => {
          return {
              ...doc.data(),
              id: doc.id
          };
      });
      if (!d[0]) {
        return addDoc(attendCollectionRef, record);
      }
      let newrec = {
        ...d[0],
        break: moment().subtract(d[0].clockOut).format("HH:mm:ss"),
        clockOut: null,
      }
      const attendDoc = doc(db, `companyprofile/${compId}/attendance`, d[0].id);
      updateDoc(attendDoc, newrec)
      return d;
    };

    updateClockData = async (id, record) => {
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", id), where("clockOut","==",null), limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        const attendDoc = doc(db, `companyprofile/${compId}/attendance`, d[0].id);
        updateDoc(attendDoc, record)
        return 
    };

    // fixNullClock = async () => {
    //     const q = query(attendCollectionRef, where("date","!=",moment().format("DD-MM-YYYY")), where("clockOut","==",null))
    //     let rec = await getDocs(q);
    //     let d = rec.docs.map((doc) => {
    //         return {
    //             id: doc.id,
    //             clockOut: "23:59:59"
    //         };
    //     });
    //     const attendDoc = doc(db, "attendance", d[0].id);
    //     update(attendDoc, record)
    // }

    getStartTime = async (id) =>{
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", id), limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        let data = d[0] ? {
          clockIn: d[0].clockIn,
          break: d[0].break? d[0].break: undefined, 
          clockOut: d[0].clockOut
        } : null;
        return data
    }

    addAttendance = (record) => {
        return addDoc(attendCollectionRef, record);
    };

    updateAttendance = async (id, date, record) => {
        const q = query(attendCollectionRef, where("date","==",date.format("DD-MM-YYYY")), where("empId", "==", id), limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        const attendDoc = doc(db, `companyprofile/${compId}/attendance`, d[0].id);
        updateDoc(attendDoc, record)
        return 
    };

    deleteAttendance = (id) => {
        const attendDoc = doc(db, `companyprofile/${compId}/attendance`, id);
        return deleteDoc(attendDoc);
    };

    getAllAttendance =  async (id, date) => {
        // const profileDoc = doc(db, "users", id);
        // let rec = await getDoc(profileDoc);
        // let empId = rec.data().empId
        const q = query(attendCollectionRef, where("empId", "==", id));
        let data = await getDocs(q);
        let d = data.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
              status: "Present",
              empId: id
            };
          });
          const momentRange = extendMoment(Moment);
          const range = momentRange.range(date[0], date[1])
          const res = Array.from(range.by('day'))
          let x = 0;
          let temp = []
          res.map((day) => {
            for (let i = 0; i < d.length; i++) {
              if (day.isSame(moment(d[i].date, "DD-MM-YYYY"), 'day')) {
                temp[x++] = {
                  ...d[i],
                  date: day.format("DD-MM-YYYY"),
                }
                return;
              }
            }
            let ddd = day.format("dddd")
            temp[x++] = {
              date: day.format("DD-MM-YYYY"),
              status: "Absent",
              empId: id
            }
          })
        return temp.reverse();
    };

    getAllUsers = async(date) => {
        const q = query(usersCollectionRef, orderBy("empId", "asc"));
        let userdata = await getDocs(q);
        let res = userdata.docs.map((doc) => {
          return {
            id: doc.id,
            empId: doc.data().empId,
            name: doc.data().fname+" "+doc.data().lname,
            status: "Absent",
            project: "",
            report: ""
          };
        });
        let stats = await this.getStatus(date);
        res.forEach((emp) => {
          for (let i = 0; i < stats.length; i++) {
            if (emp.id == stats[i].id) {
              emp.status = "Present";
              emp.project = stats[i].project;
              emp.report = stats[i].report;
              return;
            }
          }
        })
        return res;
    };

    updateLeaves = async (data, isHoiday, isDayoff) => {
      let list = await this.getLeaveList(data[0].empId);
      data.forEach((emp) => {
        if(emp.status == "Absent") {
          if (isDayoff) {
            emp.status = "Weekend";
          } else if (isHoiday) {
            emp.status = "Holiday"
          } else if (list.includes(moment(emp.date, "DD-MM-YYYY").format("Do MMM, YYYY"))) {
            emp.status = "On Leave";
          }
        }
      })
      return data;
    }

    updateWithLeave = async (data, isHoiday, isDayoff) => {
      data.forEach((emp) => {
        if(emp.status == "Absent") {
          if (isHoiday) {
            emp.status = "Holiday"
            return;
          }
          if (isDayoff) {
            emp.status = "Weekend";
            return;
          } 
          this.getLeaveStatus(emp.empId).then((leave) => {
            if (leave) {
              emp.status = "On Leave";

            }
          })
        }
      })
      return data;
    }

    getAllByTotal = () => {
        const q = query(attendCollectionRef, orderBy("subtotal", "desc"));
        return getDocs(q);
    };

    getStatus = async (date) => {
        const q = query(attendCollectionRef, where("date","==",date));
        let stats = await getDocs(q);
        let res = stats.docs.map((doc) => {
          return {
            id: doc.data().empId,
            name: doc.data().name,
            project: doc.data().project,
            report: doc.data().report
          };
        });
        return res;
    };

    getLeaveStatus = async (id) => {
      const q = query(leaveCollectionRef, where("empId", "==", id), where("status", "==", "Approved"));
      let stats = await getDocs(q);
      let temp = []
      stats.docs.map((doc) => {
        temp.push(doc.data().date)
      });
      let leaves = [].concat.apply([], temp)
      return leaves.includes(moment().format("Do MMM, YYYY"));
  }

  getLeaveList = async (id) => {
    const q = query(leaveCollectionRef, where("empId", "==", id), where("status", "==", "Approved"));
    let stats = await getDocs(q);
    let temp = []
    stats.docs.map((doc) => {
      temp.push(doc.data().date)
    });
    let leaves = [].concat.apply([], temp)
    return leaves;
}

    getAttendance = (id) => { 
        const q = query(attendCollectionRef, where("empId", "==", id),limit(1))
        // const attendDoc = doc(db, `companyprofile/${compId}/attendance`, id);
        return getDoc(q);
    };

  }

export default new AttendanceContext();
