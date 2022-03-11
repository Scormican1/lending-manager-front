import React, { useEffect, useState } from "react";

function TodoForm() {
  const [input, SetInput] = useState("");

  const [borrow, setBorrow] = useState();
  const [borrowerName, setBorrowerName] = useState("");
  const [item, setItem] = useState();
  const [dateBorrowed, setDateBorrowed] = useState();
  const [returnDate, setReturnDate] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const borrow = {
      borrowerName: borrowerName,
      item: item,
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
        // console.log(data)
        setBorrow(data);
        setBorrowerName('');
        setItem('');
        setDateBorrowed('');
        setReturnDate('');
        console.log(borrow);
      })
      .catch(console.error);
  };



  return(

  
    <form className="form">
      <label>
        Name of Borrower:
        <input
          type="text"
          name="borrowerName"
          onChange={(e) => setBorrowerName(e.target.value)}
          value={borrowerName}
        />
      </label>
      <label>
        Item Borrowed:
        <input
          type="text"
          name="item"
          onChange={(e) => setItem(e.target.value)}
        />
      </label>
      <label>
        Date Borrowed:
        <input
          type="date"
          name="dateBorrowed"
          onChange={(e) => setDateBorrowed(e.target.value)}
        />
      </label>
      <label>
        Return By:
        <input
          type="date"
          name="returnDate"
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </label>

      <input onClick={handleSubmit} type="submit" value="Add New Record" />
    </form>
  );
}

export default TodoForm;
