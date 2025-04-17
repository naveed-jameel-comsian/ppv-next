"use client";
import React from 'react'
import AuthHeader from "@/components/Header/auth";

const getRole = (role) => {
  switch (role) {
    case "1":
      return "Admin";
    case "2":
      return "Seller";
    case "3":
      return "Producer";
    case "4":
      return "User";
  }
};

const Dashboard = () => {
  const role = localStorage.getItem("user_role")
  return (
    <div>
        <AuthHeader/>
        <div style={{display:"flex", justifyContent:"center",alignItems:"center", height:"100vh"}}>
          {
            getRole(role)
          }
        </div>
    </div>
  )
}

export default Dashboard