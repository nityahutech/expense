import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Tooltip, Tag, Modal } from "antd";

function TravelManagement(prop) {
      const role =prop.roleView == "emp"
      console.log(prop.roleView);
  return (<>
        <div className='travelDiv'>
            {role ? (<>employee</>) : (<>HR</>)}

        </div>
    </>)
}

export default TravelManagement