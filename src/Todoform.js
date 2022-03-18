import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import "./todo.css";

function TodoForm() {
  const [input, SetInput] = useState("");

  const [borrow, setBorrow] = useState();
  const [borrowerName, setBorrowerName] = useState("");
  const [item, setItem] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [dateBorrowed, setDateBorrowed] = useState();
  const [returnDate, setReturnDate] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const borrow = {
      borrowerName: borrowerName,
      item: item,
      setItemDescription: itemDescription,
      dateBorrowed: dateBorrowed,
      returnDate: returnDate,
    };
    fetch("https://lending-manager-5f371.uk.r.appspot.com/borrow", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrow),
    })
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => {
        setBorrow(data);
        setBorrowerName("");
        setItem("");
        setItemDescription("");
        setDateBorrowed("");
        setReturnDate("");
        console.log(borrow);
        window.location.reload();
      })
      .catch(console.error);
  };

  return (
    <div className="form-container">
      <form className="form">
        <label>
          Name of Borrower:
          <TextField
            type="text"
            name="borrowerName"
            onChange={(e) => setBorrowerName(e.target.value)}
            value={borrowerName}
          />
        </label>
        <label>
          Item Borrowed:
          <TextField
            type="text"
            name="item"
            onChange={(e) => setItem(e.target.value)}
          />
        </label>
        <label>
          Item Description:
          <TextField
            type="text"
            name="item"
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </label>
        <label>
          Date Borrowed:
          <TextField
            type="date"
            name="dateBorrowed"
            onChange={(e) => setDateBorrowed(e.target.value)}
          />
        </label>
        <label>
          Return By:
          <TextField
            type="date"
            name="returnDate"
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>

        <input onClick={handleSubmit} type="submit" value="Add New Record" />
      </form>
    </div>
  );
}

export default TodoForm;
