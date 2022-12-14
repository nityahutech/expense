  import React, {useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/NewSidebar";
import ExpenceForm from '../../ExpenceForm';
const ExpenseFrm = () => {
    const [accessToken, setAccessToken] = useState(null)
    useEffect(() => {
        let token = sessionStorage.getItem ("accessToken")
        if(token === 'null'){
          window.location.href="/"
        }
        else{
          setAccessToken(token)
        }
      }, [])
    return accessToken 
    ?
    (
        <div className="home">
        <div className="sidecontainer">
            <Sidebar activeSubMenu={["sub1"]}
          activeMenu={["2"]}  accessToken={accessToken}/>
        </div>
        <div className="homeContainer">
            <div className="table" >
                <Navbar />
            </div>
            <div className="tables">
                <ExpenceForm />
            </div>
        </div>
    </div>
    ) : null;
}
export default ExpenseFrm