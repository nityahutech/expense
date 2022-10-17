
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
import { async } from "@firebase/util";
import { MacCommandFilled } from "@ant-design/icons";

const attendCollectionRef = collection(db, "attendance");
const usersCollectionRef = collection(db, "users");
const leaveCollectionRef = collection(db, "leave");

class AttendanceContext {

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
        console.log("d")
        return addDoc(attendCollectionRef, record);
      }
      console.log(d)
      let newrec = {
        ...d[0],
        break: moment().subtract(d[0].clockOut).format("HH:mm:ss"),
        clockOut: null,
      }
      console.log(newrec)
      const attendDoc = doc(db, "attendance", d[0].id);
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
        console.log(d)
        const attendDoc = doc(db, "attendance", d[0].id);
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
    //     console.log(d)
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
        console.log("clock", d)
        let data = d[0] ? {
          clockIn: d[0].clockIn,
          break: d[0].break? d[0].break: undefined, 
          clockOut: d[0].clockOut
        } : null;
        console.log(data)
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
        console.log(d)
        const attendDoc = doc(db, "attendance", d[0].id);
        updateDoc(attendDoc, record)
        return 
    };

    deleteAttendance = (id) => {
        const attendDoc = doc(db, "attendance", id);
        return deleteDoc(attendDoc);
    };

    getAllAttendance =  async (id, date) => {
        const q = query(attendCollectionRef, where("empId", "==", id));
        // console.log(q);
        let data = await getDocs(q);
        let d = data.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
              status: "Present"
            };
          });
          // let stats = await this.getMonthlyStatus();
          // console.log(stats);
          const momentRange = extendMoment(Moment);
          console.log(date)
          console.log(id)
          const range = momentRange.range(date[0], date[1])
          const res = Array.from(range.by('day'))
          let x = 0;
          let temp = []
          res.map((day) => {
            for (let i = 0; i < d.length; i++) {
              console.log("breh")
              if (day.isSame(moment(d[i].date, "DD-MM-YYYY"), 'day')) {
                temp[x++] = {
                  ...d[i],
                  date: day.format("DD-MM-YYYY"),
                }
                return;
              }
            }
            console.log(day)
            temp[x++] = {
              date: day.format("DD-MM-YYYY"),
              status: "Absent"
            }
          })
        return temp.reverse();
    };

    getAllUsers = async() => {
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
        let stats = await this.getStatus();
        console.log(stats)


        res.forEach((emp) => {
          for (let i = 0; i < stats.length; i++) {
            if (emp.id == stats[i].id) {
              console.log("Present")
              emp.status = "Present";
              emp.project = stats[i].project;
              emp.report = stats[i].report;
              return;
            }
          }

          // let response=Promise.all()
           
        })
        console.log(res);
        console.log("test1",JSON.stringify(res));
        console.log("7777");
        return res;
        // return getDocs(q)
    };

    updateWithLeave = async (data) => {
      console.log(data)
      data.forEach((emp) => {
        if(emp.status == "Absent") {
          this.getLeaveStatus(emp.empId).then((leave) => {
            console.log("7777", leave);
              if (leave) {
              console.log("8888");
              emp.status = "On Leave";

            }
          })
        }
      })
      console.log(JSON.stringify(data));
      return data;
    }

    getAllByTotal = () => {
        const q = query(attendCollectionRef, orderBy("subtotal", "desc"));
        // console.log(q);
        return getDocs(q);
    };

    getStatus = async () => {
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")));
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
      console.log(id);
      const q = query(leaveCollectionRef, where("empId", "==", id), where("status", "==", "Approved"));
      let stats = await getDocs(q);
      let temp = []
      stats.docs.map((doc) => {
        temp.push(doc.data().date)
      });
      let leaves = [].concat.apply([], temp)
      // console.log(leaves, (moment().format("Do MMM, YYYY")), leaves.includes(moment().format("Do MMM, YYYY")));
      return leaves.includes(moment().format("Do MMM, YYYY"));
  }

    getAttendance = (id) => { 
        const q = query(attendCollectionRef, where("empId", "==", id),limit(1))
        const attendDoc = doc(db, "attendance", id);
        return getDoc(q);
    };

  }

export default new AttendanceContext();
