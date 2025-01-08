"use client";
import { useRouter } from 'next/navigation'; // Correct hook for app directory
import React from "react";
import "../styles/login.css";

function Login() {
  const router = useRouter();

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
        console.log(response.status);
        alert("Login failed. Please check your email and password.");
      } else {
        console.log("The user is logged in");
        const token = await response.json();
        localStorage.setItem('jwt', token);
        router.push('/profile'); // Redirect after successful login
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div className="login-container">
      <p className="h1">Hello Rebooter</p>
      <p className="h3">Sign in to your 01 account</p>
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
        <button className="login-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
