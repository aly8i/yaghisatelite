import React from "react";
import styles from "./Filter.module.scss";
import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/Usercontext";

const Filter = () => {
  const { data, setFData } = useContext(UserContext);
  const [box, setBox] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("كلا");

  useEffect(() => {
    const filtered = data.filter((user) => {
      const isNameMatch = user?.name.includes(name);
      const isBoxMatch = user?.box.includes(box);
      const isMonthMatch =
        month === "" || parseInt(user?.month) === parseInt(month);
      const isYearMatch =
        year === "" || parseInt(user?.year) === parseInt(year);
      const isNumberMatch = user?.number.includes(number);
      return (
        isNameMatch &&
        isBoxMatch &&
        isMonthMatch &&
        isYearMatch &&
        isNumberMatch
      );
    });

    setFData(filtered);
  }, [box, month, year, number, name, filter, data]);

  const resetFields = () => {
    //reset all states
    setName("");
    setNumber("");
    setMonth("");
    setYear("");
    setBox("");
  };
  const filters = [
    {
      name: "لم يدفع",
      action: async () => {
        setFilter("لم يدفع");
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const filtered = await data.filter(
          (user) => user?.month != currentMonth || user?.year != currentYear
        );
        setFData([...filtered]);
      },
    },
    {
      name: "تم الدفع",
      action: async () => {
        setFilter("تم الدفع");
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const filtered = await data.filter(
          (user) => user?.month == currentMonth && user?.year == currentYear
        );
        setFData([...filtered]);
      },
    },
    {
      name: "كلا",
      action: async () => {
        setFilter("كلا");
        setFData([...data]);
      },
    },
  ];
  return (
    <div className={styles.filterContainer}>
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
      <div className={styles.field}>
        <p className="title">تعريب</p>
        <div className={styles.dropdown}>
          <input
            className={styles.dropdownInput}
            type="text"
            readOnly
            value={filter}
          />
          <div className={styles.dropdownContent}>
            {filters.map((filter) => (
              <div onClick={filter.action}>
                <div>{filter.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
