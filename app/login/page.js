"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data, status } = useSession();

  const submitHandler = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
  };
  useEffect(() => {
    if (status == "authenticated") {
      window.location.href = "/dashboard";
    }
  }, [status]);
  if (status == "loading") {
    return <></>;
  }
  return (
    <div className="container container-fluid">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-10 col-lg-5 ">
          <form
            className="border border-secondary rounded p-4"
            onSubmit={submitHandler}
          >
            <h1 className="mb-4">تسجيل الدخول</h1>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email_field">
                الاسم
              </label>
              <input
                type="username"
                id="phonenumber_field"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password_field">
                كلمة المرور
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
            >
              ادخل
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
