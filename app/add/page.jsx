"use client";
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import styles from "./add.module.scss";
import { addUser } from "../../functions";

const add = () => {
  const [box, setBox] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    setYear(currentYear);
    setMonth(currentMonth);
  }, []);
  return (
    <div className={styles.addContainer}>
      <div className={styles.up}>
        <div className={styles.field}>
          <p className="title">السنة</p>
          <input
            type="number"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          />
        </div>
        <div className={styles.field}>
          <p className="title">الشهر</p>
          <input
            type="number"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          />
        </div>

        <div className={styles.field}>
          <p className="title">رقم الهاتف</p>
          <input
            type="number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
        </div>
        <div className={styles.field}>
          <p className="title">العلبة</p>
          <input
            type="text"
            onChange={(e) => setBox(e.target.value)}
            value={box}
          />
        </div>
        <div className={styles.field}>
          <p className="title">اسم المشترك</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      </div>
      <div className={styles.down}>
        <div
          className={styles.btn}
          onClick={async () => await addUser(name, box, month, year, number)}
        >
          انشاء
        </div>
      </div>
    </div>
  );
};

export default add;
