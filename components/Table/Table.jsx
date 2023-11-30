import React, { useState } from "react";
import styles from "./Table.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/Usercontext";

const Table = ({ headers, data }) => {
  const { sUser, admin, setSUser } = useContext(UserContext);
  const currentMonth = new Date().getMonth() + 1 || 0;
  const currentYear = new Date().getFullYear() || 0;
  const selectRow = (id) => {
    if (id == sUser) {
      setSUser("");
    } else {
      setSUser(id);
    }
  };

  return (
    <div className={styles.tablecontainer}>
      <table className={styles.styledtable}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user, i) => (
            <tr
              style={{ background: sUser == user?.id && "light#D2B48C" }}
              onClick={() => selectRow(user?.id)}
              key={i}
            >
              <td>
                {(
                  ((currentYear - user?.year) * 12 +
                    (currentMonth - user?.month)) *
                  admin?.price
                ).toFixed(2)}{" "}
                $
              </td>
              <td>{user?.year}</td>
              <td>{user?.month}</td>
              <td>{user?.number}</td>
              <td>{user?.box}</td>
              <td>{user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
