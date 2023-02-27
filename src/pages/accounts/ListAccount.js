import React, { useEffect, useState } from "react";
import { getUser } from "../../services/useServices";

export default function ListAccount() {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    getUser().then((res) => {
      setListUser(res.data);
    });
  }

  const elementUser = listUser ? listUser.map((user) => {
    return (
      <tr key={user.id}>
        <td scope="row">
          <b>{user.id}</b>
        </td>
        <td>{user.username}</td>
        <td>
          <b>{user.password}</b>
        </td>
        <td>
          <b>{user.email}</b>
        </td>
        <td>
          <b>{user.security}</b>
        </td>
        <td>
          <b>{user.role}</b>
        </td>
        <td>
          <div></div>
          {user.status? "Online" : "Offline"}
        </td>
        <td>
          <b>{user.declared?"Yes":"Not Yet"}</b>
        </td>
      </tr>
    );
  }):<></>;
  return (
    <div className="col-12 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
        <h2 className="tm-block-title">User List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">User Name</th>
              <th scope="col">Password</th>
              <th scope="col">E-mail</th>
              <th scope="col">Security Question</th>
              <th scope="col">Role</th>
              <th scope="col">Online Status</th>
              <th scope="col">Health Declaration</th>
            </tr>
          </thead>
          <tbody>
            {elementUser}
          </tbody>
        </table>
      </div>
    </div>
  );
}
