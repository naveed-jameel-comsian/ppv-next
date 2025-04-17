"use client";
import React, { useState } from "react";
import AuthHeader from "@/components/Header/auth";
import Api from "@/components/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const Role ={
  "Seller" : 2,
  "Producer" : 3
}

export default function RegisterPage() {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    password: "",
    userType: "Seller",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (type) => {
    setFormData({ ...formData, userType: type });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true)
      const payload ={
        ...formData,
        role_id : Role[formData?.userType]
      }
      Api.post("/auth/signup", payload).then((res)=>{
        toast.success("Your Signup Request sent!")
        setFormData({
          name: "",
          email: "",
          country: "",
          password: "",
          userType: "Seller",
        })
        router.push("/login");

        // localStorage.setItem("user_role", Role[formData?.userType])
        // localStorage.setItem("isLogged", true)
        // localStorage.setItem("token", res?.data?.access_token)
        // toast.success("Register Successfully!")

        // setLoading(false)

        // if(formData?.userType === "Producer"){
        //   router.push("/production");
        // }
        // else if(formData?.userType === "Seller"){
        //   router.push("/seller");
        // }
        // else if(formData?.userType === "User"){
        //   router.push("/");
        // }
      }).catch((err)=>{
        toast.error(err?.response?.data?.message)
      })
      setLoading(false)
    }
  };

  return (
    <>
      <AuthHeader />
      <main class="main">
        <div className="registration-area my-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="registration-wrap holaa-form-wrapper">
                  <h5 className="inner-small-title mb-0">Register</h5>
                  <p className="mb-4 pb-2">Welcome! Register into your account</p>

                  <form className="d-flex justify-content-between" onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-between">

                      {/* User Type Dropdown */}
                      <div className="col-md-12 mb-4 d-flex justify-content-between align-items-center">
                        <div className="dropdown">
                          <button
                            className="hl-btn lh-1 text-uppercase dropdown-toggle ms-0"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ color: "#D97B2A" }}
                          >
                            {"User Type"}
                          </button>
                          <ul className="dropdown-menu">
                            {["Seller", "Producer"].map((type) => (
                              <li key={type}>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => handleUserTypeChange(type)}
                                >
                                  {type}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span style={{ color: "#D97B2A" }}>{formData.userType}</span>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div className="col-md-6">
                        <label className="single-input-field style-border">
                          <span>Full Name*</span>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                          />
                          {errors.name && <p style={{ color: "red" }} className="error-text">{errors.name}</p>}
                        </label>
                      </div>

                      {/* Email */}
                      <div className="col-md-6">
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

                      {/* Country */}
                      <div className="col-md-6">
                        <label className="single-input-field style-border">
                          <span>Country*</span>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                          />
                          {errors.country && <p style={{ color: "red" }} className="error-text">{errors.country}</p>}
                        </label>
                      </div>

                      {/* Password */}
                      <div className="col-md-6">
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

                      {/* Submit Button */}
                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="hl-btn medium-btn btn-base text-uppercase lh-1"
                        >
                          {!loading ?
                            <span className="pt-0"> Register Now</span> :
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
