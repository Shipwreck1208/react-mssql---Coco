import './App.css';
import React, {useState} from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [returnedData, setReturnedData] = useState(['']);
  const [displayData, setDisplayData] = useState(['']);
  const [customer, setCustomer] = useState({id: 0, cus_name: '', dob: '', gender: '', contact_no: '', address: '', email: '', marital_status: '', occupation: '', join_date: ''});


  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const setInput = (e) => {
    const {name, value} = e.target;
    // console.log(value);
    if (name === 'id') {
      setCustomer(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
      return;
    }
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const getData = async () => {
    // console.log(customer);
    const newData = await fetch('/api', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: customer.cus_name,
        id: customer.id
      })
    })
    .then(res => res.json());
    // console.log(newData);
    setReturnedData(newData[0])
  }

  const deleteData = async () => {
    // console.log(customer);
    const newData = await fetch('/delete', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: customer.cus_name,
        id: customer.id
      })
    })
    .then(res => res.json());
    console.log(newData);
    // setReturnedData(newData[0])
  }

  const createData = async () => {
    // console.log(customer);
    const newData = await fetch('/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...customer
      })
    })
    .then(res => res.json());
    // console.log(newData);
    setReturnedData(newData[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/edit', returnedData);
      setReturnedData(response);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    // console.log(customer);
    const newData = fetch('/edit', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: customer.id,
        contact_no: customer.contact_no,
        address: customer.address,
        email: customer.email,
        marital_status: customer.marital_status,
        occupation: customer.occupation
      })
    })
    .then(res => res.json());
    // console.log(customer); 
    setReturnedData(newData)
  }

  // const updateData = async () => {
  //   // console.log(customer);
  //   const newData = fetch('/edit', {
  //     method: 'PUT',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       id: customer.id,
  //       contact_no: customer.contact_no,
  //       address: customer.address,
  //       email: customer.email,
  //       marital_status: customer.marital_status,
  //       occupation: customer.occupation
  //     })
  //   })
  //   .then(res => res.json());
  //   setReturnedData(newData)
  // }

  const showData = async () => {
    // console.log(customer);
    const newData = await fetch('/show', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json());
    // console.log(newData);
    setDisplayData(newData)
  }

 
  if (isEditing) {
    return (
      <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="id" value={returnedData.id} placeholder="Customer ID" onChange={setInput}></input>
      <input name="cus_name" value={returnedData.cus_name} placeholder="Name" onChange={setInput}></input>
      <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      minDate={new Date().setDate(new Date().getDate() + 11)} // only allow dates from today and after
      maxDate={new Date().setDate(new Date().getDate() + 90)} // allow dates up to a week and a half from now
    />
      {/* <input name="dob" type="date" onChange={setInput}></input> */}
      <input name="gender" value={returnedData.gender} placeholder="Gender" onChange={setInput}></input>
      <input name="contact_no" value={returnedData.contact_no} placeholder="Contact Number" onChange={setInput}></input>
      <input name="address" value={returnedData.address} placeholder="Address" onChange={setInput}></input>
      <input name="email" value={returnedData.email} placeholder="Email" onChange={setInput}></input>
      <input name="marital_status" value={returnedData.marital_status} placeholder="Marital Status" onChange={setInput}></input>
      <input name="occupation" value={returnedData.occupation} placeholder="Occupation" onChange={setInput}></input>
      <input name="join_date" value={returnedData.join_date} onChange={setInput}></input>
      <br/>
      <br/>

      {/* <button onClick={() => showData()}>Show</button>
      <button onClick={() => getData()}>Search</button> */}
      {/* <button onClick={() => createData()}>Create</button>
      <button onClick={() => deleteData()}>Delete</button> */}

      <br/>
      <a href='/'><button>Home</button></a>
      <button onClick={() => updateData()}>Edit</button>
      </form>
      </div>
      );
  } else {
    return (
      <>
    <p>Customer Id: {returnedData.id}</p>
    <p>Customer Name: {returnedData.cus_name}</p>
    <p>Date of Birth: {returnedData.dob}</p>
    <p>Gender: {returnedData.gender}</p>
    <p>Contact Number: {returnedData.contact_no}</p>
    <p>Address: {returnedData.address}</p>
    <p>Email: {returnedData.email}</p>
    <p>Marital Status: {returnedData.marital_status}</p>
    <p>Occupation: {returnedData.occupation}</p>
    <p>Join Date: {returnedData.join_date}</p>

<hr/>

      <button onClick={() => createData()}>Create</button>
    <button onClick={() => showData()}>Show</button>
      <p>Search, Delete or Edit by: </p>
    <input name="id" placeholder="Customer Id" onChange={setInput}></input>
    or
    <input name="cus_name" placeholder="Customer Name" onChange={setInput}></input>
      <button onClick={() => getData()}>Search</button>
      <button onClick={() => deleteData()}>Delete</button>
    <button onClick={() => setIsEditing(true)}>Edit</button>

    {/* <button onClick={() => updateData()}>Edit</button> */}
    <div>
      <p>All Data:</p>
      <table>
      <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Gender</th>
          </tr>
          {displayData.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.cus_name}</td>
              <td>{item.address}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
    </tbody>
      </table>
    </div>
          </>
        );
        }
      }

    // </div>
//   );
// }

export default App;