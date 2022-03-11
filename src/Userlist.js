import { useEffect, useState } from "react";

export default function UserList({ token }) {
  const [userList, setUserList] = useState();
  useEffect(() => {
    fetch("https://lending-manager-5f371.uk.r.appspot.com/borrow", {
      method: "GET",
      Headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserList(data.users))
      .catch(alert);
  }, []);
  return (
    <>
      <h1> User List Component</h1>
      {!userList ? (
        <h2>Loading...</h2>
      ) : (
        userList.map((user) => {
          return (
            <p key={user.id}>
              {user.email}.{user.userRole}
            </p>
          );
        })
      )}
    </>
  );
}
