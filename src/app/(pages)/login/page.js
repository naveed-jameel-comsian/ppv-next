"use client";
import AuthHeader from "@/components/Header/auth";
import React, { useState } from "react";
import Api from "@/components/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const Role = {
  "Seller": 2,
  "Producer": 3,
  "User": 4,
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true)
      const payload = {
        ...formData,
      }
      console.log("payload------", payload)
      Api.post("/auth/login", payload).then((res) => {
        const role = res?.data?.role
        localStorage.setItem("user_role", role)
        localStorage.setItem("isLogged", true)
        localStorage.setItem("token", res?.data?.access_token)
        toast.success("Login Successfully!")

        setLoading(false)

        if (role === 1) { // super admin
          router.push("/admins");
        }
        else if (role === 2) {
          router.push("/seller");
        }
        else if (role === 3) {
          router.push("/production");
        }
        else if (role === 4) { // admin
          router.push("/all-sellers");
        }
      }).catch((err) => {
        console.log("err?.response?.data------",err?.response?.data)
        toast.error(err?.response?.data?.message)
      })
      setLoading(false)
    }
  };

  return (
    <>
      <AuthHeader />
      <main class="main">
        <div class="registration-area my-80">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-6">
                <div class="registration-wrap holaa-form-wrapper">
                  <h5 class="inner-small-title mb-0">Login</h5>
                  <p class="mb-4 pb-2">Welcome! Log in to your account</p>
                  <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <label className="single-input-field style-border">
                        <span>Email*</span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                        {errors.email && <p style={{ color: "red" }} className="error-text">{errors.email}</p>}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label className="single-input-field style-border">
                        <span>Password*</span>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        {errors.password && <p style={{ color: "red" }} className="error-text">{errors.password}</p>}
                      </label>
                    </div>

                    {/* <div className="col-md-12 mb-4 d-flex justify-content-between   align-items-center ">
                  <div className="dropdown">
                    <button
                      className="hl-btn lh-1 text-uppercase dropdown-toggle ms-0 "
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#D97B2A" }}
                    >
                      User Type
                    </button>
                    <ul className="dropdown-menu">
                      {["User", "Seller", "Producer"].map((type) => (
                        <li key={type}>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => setUserType(type)}
                          >
                            {type}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span style={{ color: "#D97B2A" }}>
                      {" "}
                      {userType || "USER TYPE"}{" "}
                    </span>
                  </div>
                </div> */}
                    <div class="check-btn">
                      <label class="checkbox-wrap">
                        <input type="checkbox" id="css" checked />
                        <span>Remember me</span>
                      </label>
                      <div class="btn-wrap mt-sm-4 pt-lg-3 mt-4">
                        <button
                          type="submit"
                          class="hl-btn medium-btn btn-base text-uppercase lh-1"
                        >
                          {!loading ?
                            <span className="pt-0">Log In</span> :
                            <span className="spinner-border spinner-border-sm"></span>
                          }
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
