import React, { useState, useEffect } from "react";
import { Select, Input, } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import AddressOffice from "./addressOffice";
import AddressCust from "./addressCust";
import AddressCorp from "./addressCorp";
const { Option } = Select;
const { TextArea } = Input;

function Address() {
  const { currentUser } = useAuth();

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <AddressOffice />
        <AddressCorp />
        <AddressCust />
      </div>
    </>
  );
}
export default Address;
