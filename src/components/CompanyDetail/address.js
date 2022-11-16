import AddressOffice from "./addressOffice";
import AddressCust from "./addressCust";
import AddressCorp from "./addressCorp";

function Address() {

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
