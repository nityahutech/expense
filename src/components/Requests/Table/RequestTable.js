import React, { useState, useEffect } from "react";
import RepairRequestTable from "./RepairRequestTable"
import InvoiceTable from "./InvoiceTable"
import TravelTable from "./TravelTable"
import EmpInfoContext from "../../../contexts/EmpInfoContext";
import InvoiceContext from "../../../contexts/InvoiceContext";
import { createUser } from "../../../contexts/CreateContext";

//-------------------------------------------------------
import AssetContext from "../../../contexts/AssetContext";

//---------------------------------------------
import TravelContext from "../../../contexts/TravelContext";
import moment from "moment";


const RequestTable = (props) => {

    //---------------Invoice------------------------------
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const [user, setUser] = useState({});

    //--------------laptop-----------------------------
    const [repairLaptopData, setRepairLaptopData] = useState([]);
    const [laptopAllot, setLaptopAllot] = useState(props.refresh);

    const getAllInvoiceData = async () => {
        console.log('getAllInvoiceData', getAllInvoiceData)
        let invoiceData = await InvoiceContext.getInvoice(createUser.uid);
        let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
        setUser(userData);
        setInvoiceDetails(invoiceData);
    };

    //--------------------Travel-----------------------------

    const [travelDetails, setTravelDetails] = useState([]);
    const [durationArray, setDurationArray] = useState([]);


    const getAlltravelData = async () => {
        let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
        let travleData = await TravelContext.getAllTravel(currentUser.uid);
        console.log(travleData);
        setTravelDetails(travleData);
        setUser(userData);
        let data = travleData.map((record) => {
            let dur = record.travelType.map((dt) => dt.durationDate);
            let temp = [].concat.apply([], dur);

            console.log("dur", dur);
            temp.sort((a, b) => {
                return moment(a, "DD-MM-YYYY") - moment(b, "DD-MM-YYYY");
            });
            return temp;
        });
        console.log("data", data);
        setDurationArray(data);
    };
    console.log("travelDetails", travelDetails);
    //------------------------------------------------------------
    useEffect(() => {
        getAlltravelData();
    }, []);


    useEffect(() => {
        getRepairData();
        setLaptopAllot(props.refresh);
    }, [props.roleView]);

    const getRepairData = async () => {
        let repairData = await AssetContext.getRepairData(
            currentUser.uid,
        );
        setRepairLaptopData(repairData);
    };

    useEffect(() => {
        getAllInvoiceData();
    }, []);

    return (
        <div>
            <RepairRequestTable
                data={repairLaptopData}
                getData={getRepairData}
                roleView={props.roleView}
            />
            <InvoiceTable
                roleView={props.roleView}
                getData={getAllInvoiceData}
                invoiceDetails={invoiceDetails}
                user={user}
            />
            <TravelTable
                getData={getAlltravelData}
                durationArray={durationArray}
                travelDetails={travelDetails}
            />
        </div>
    )
}

export default RequestTable