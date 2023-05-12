import React, { useEffect, useState } from "react";
import classes from "./BookingForm.module.css";

const timeOptions = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];
const dinnerOptions = [
  "2 dinners",
  "3 dinners",
  "4 dinners",
  "5 dinners",
  "6+ dinners",
];

export default function ReservationLayout({ onCloseLayout }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dinner, setDinner] = useState("");
  const [choosedTime, setChoosedTime] = useState("");
  const [choosedDate, setChoosedDate] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dinnerError, setDinnerError] = useState(false);
  const [choosedTimeError, setChoosedTimeError] = useState(false);
  const [choosedDateError, setChoosedDateError] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      const buttonTextResume = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
      return () => {
        clearTimeout(buttonTextResume);
      };
    }
  }, [isSubmitted]);

  function onSubmitReservationHandler(e) {
    e.preventDefault();

    let hasError = false;

    if (name.trim().length === 0) {
      setNameError(true);
      hasError = true;
    }

    if (email.trim().length === 0 || !email.includes("@")) {
      setEmailError(true);
      hasError = true;
    }

    if (!dinnerOptions.includes(dinner)) {
      setDinnerError(true);
      hasError = true;
    }

    if (
      new Date(choosedDate).getFullYear() < new Date().getFullYear() ||
      new Date(choosedDate).getMonth() < new Date().getMonth() ||
      new Date(choosedDate).getDate() < new Date().getDate() ||
      !new Date(choosedDate)
    ) {
      setChoosedDateError(true);
      hasError = true;
    }

    if (
      // typeof +choosedTime.split(":")[0] !== "number" ||
      // typeof +choosedTime.split(":")[1] !== "number" ||
      // +choosedTime.split(":")[0] > 12 ||
      // +choosedTime.split(":")[0] ||
      // +choosedTime.split(":")[1] > 60 ||
      // +choosedTime.split(":")[1] < 0
      !timeOptions.includes(choosedTime)
    ) {
      setChoosedTimeError(true);
      hasError = true;
    }

    if (hasError) {
      alert("Invaild input! Please check the error message.");
      setIsSubmitted(false);
      return;
    }

    /*If data is valid, then go to the next step*/

    setNameError(false);
    setEmailError(false);
    setDinnerError(false);
    setChoosedDateError(false);
    setChoosedTimeError(false);
    const choosedHour = +choosedTime.split(":")[0];
    const choosedMinute = +choosedTime.split(":")[1];

    const combinedDateHourAndMinute = new Date(choosedDate).setHours(
      choosedHour,
      choosedMinute
    );
    const reservedTime = new Date(combinedDateHourAndMinute);

    console.log({ name, email, dinner, reservedTime });
    //Fetch Data to the Back-End Server or API...

    setName("");
    setEmail("");
    setDinner("");
    setChoosedTime("");
    setChoosedDate("");
    setIsSubmitted(true);
  }

  function emailCheckHandler() {
    if (email.trim().length === 0 || !email.includes("@")) {
      setEmailError(true);
    }
  }

  function nameCheckHandler() {
    if (name.trim().length === 0) {
      setNameError(true);
    }
  }
  function dinnerCheckHandler() {
    if (!dinnerOptions.includes(dinner)) {
      setDinnerError(true);
    }
  }

  return (
    <article className={classes.container}>
      <div className={classes.bgLayout}></div>
      <form
        className={classes.form}
        onSubmit={onSubmitReservationHandler}
      >
        <button
          type="button"
          onClick={() => {
            onCloseLayout();
          }}
          className={classes.closeBtn}
        >
          ✕
        </button>
        <h1>RESERVE A TABLE</h1>
        {/*Name Input*/}
        <label htmlFor="name">Full Name</label>
        <input
          required
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={nameCheckHandler}
        />
        {nameError && (
          <p className={classes.inputError}>*Name must not be empty.</p>
        )}

        {/*Email Input*/}
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={emailCheckHandler}
        />
        {emailError && (
          <p role="alert" className={classes.inputError}>
            *Invalid Email.
          </p>
        )}

        {/*Dinner Selector*/}
        <label htmlFor="dinners">Number of Dinners</label>
        <select
          required
          id="dinners"
          name="dinners"
          value={dinner}
          onChange={(e) => setDinner(e.target.value)}
        >
          <option disabled value="">
            Select...
          </option>
          ;
          {dinnerOptions.map((opt, i) => {
            return (
              <option key={i} value={opt}>
                {opt}
              </option>
            );
          })}
        </select>
        {dinnerError && (
          <p className={classes.inputError}>
            *Please select the number of the dinners.
          </p>
        )}

        {/*Date Input*/}
        <label htmlFor="date">Date</label>
        <input
          required
          id="date"
          name="date"
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          value={choosedDate}
          onChange={(e) => setChoosedDate(e.target.value)}
        />
        {choosedDateError && (
          <p className={classes.inputError}>
            *Invalid date, please select another day.
          </p>
        )}

        {/*Time Selector*/}
        <label htmlFor="time">Time</label>
        <select
          required
          id="time"
          name="time"
          value={choosedTime}
          onChange={(e) => setChoosedTime(e.target.value)}
        >
          <option disabled value="">
            {" "}
            -- : --{" "}
          </option>
          ;
          {timeOptions.map((time, i) => {
            return (
              <option key={i} value={time}>
                {time}
              </option>
            );
          })}
        </select>
        {choosedTimeError && (
          <p className={classes.inputError}>
            *Please select a time.
          </p>
        )}

        {isSubmitted ? (
          <p style={{ fontSize: "2rem" }}>Table reserved successfully.</p>
        ) : (
          <input
            type="submit"
            value="Confirm your booking"
            title="submitButton"
            className={classes.btn}
          />
        )}
      </form>
    </article>
  );
}
