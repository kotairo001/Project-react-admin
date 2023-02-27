import React from "react";
import { useState, useEffect } from "react";
import { getHealth } from "../../services/healthServices";

export default function Health() {
  const [declarations, getDeclarations] = useState([]);

  function getData() {
    getHealth().then((res) => {
      getDeclarations(res.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  let elementDeclaration = declarations.map((data, index) => {
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{data.username}</td>

        <td>{data.name}</td>
        <td>{data.personalID}</td>
        <td>{data.birthday}</td>
        <td>{data.gender}</td>
        <td> {data.nationality}</td>
        <td>{data.city}</td>
        <td>{data.address}</td>
        <td>{data.phone}</td>
        <td>{data.email}</td>
        <td>{data.vaccine=="no"?"Not vaccinated":"Vaccinated"}</td>
        <td>{data.status == "no" ? "Healthy" : "Coughing"}</td>
      </tr>
    );
  });
  return (
    <div className="col-12 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
        <h2 className="tm-block-title">HEALTH DECLARATION</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Nationality</th>
              <th scope="col">City</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Vaccined</th>
              <th scope="col">Health status</th>
            </tr>
          </thead>
          <tbody>{elementDeclaration}</tbody>
        </table>
      </div>
    </div>
  );
}
