"use client";
import { useState } from "react";
import { login } from "../logic/auth";
import { redirect } from "next/navigation";

export default function Login() {
  const [error, setError] = useState('');

  function authenticate(event) {
    event.preventDefault();

    const fields = event.target;

    login({ username: fields.email.value, password: fields.password.value }).catch((err) => {
     alert(err);
    }).then(()=> redirect('/'));
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
    
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl m-5">
      
        <form onSubmit={authenticate} className="card-body" noValidate>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              id="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
