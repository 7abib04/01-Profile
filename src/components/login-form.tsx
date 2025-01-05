"use client";

import React from "react";
import "../styles/login.css";

function Login() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const credentials = btoa(`${email}:${password}`);
    try {
      const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        console.log(response.status)
        //TODO function to handle the error, and show a message to the user
      } else {
        console.log("ok");
        console.log(response)
        const token = await response.json();
        // store the token in local storage or session storage
        localStorage.setItem('jwt', token);
      }
    } catch (error) {
      console.error("err", error);
    }
  };

  return (
    <div className="login-container">
      <p className="h1">Hello Rebooter</p>
      <p className="h3">Sign in to your 01 account</p>
      {/* Attach the `handleLogin` function to onSubmit */}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input type="text" name="email" placeholder="Enter your email" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="options">
          <label>
            <input type="checkbox" /> Show password
          </label>
        </div>
        {/* Ensure the button has type="submit" so it triggers form submission */}
        <button className="login-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
