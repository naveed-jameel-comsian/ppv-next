"use client";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Api from "@/components/api"; // Ensure this path is correct
import moment from "moment";
import AdminHeader from "@/components/Header/admin";
import { toast } from "react-toastify";

const breadcrumb = {
    title: "My Account",
    links: [
        { name: "Home", href: "/" },
        { name: "Earnings Breakdown", href: "#" },
    ],
}


const Requests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        Api.get("/admin/requests")
            .then((res) => {
                setRequests(res?.data?.requests || []);
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
            });
    }, [])

    const handleApproveReject = (user_id, status)=>{
        console.log("status---------",status)
        Api.post("/admin/request", { user_id, status })
            .then((res) => {
                setRequests((prev)=>prev.filter((user)=> user.id !== user_id))
                if(status==1) toast.success("Request Approved")
                else toast.success("Request Rejected") 
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
            })
    }

    return (
        <>
            <AdminHeader addAdmin={false} data={{ breadcrumb }} isFilter="request"/>
            <main className="main">
                <div className="registration-area my-80">
                    <div className="container mt-4">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Seller Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.length > 0 ? (
                                    requests.map((request, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{request.name}</td>
                                            <td>{request.email}</td>
                                            <td>{request.role}</td>
                                            <td>
                                                <div>
                                                    <span
                                                        key={index}
                                                        onClick={()=>handleApproveReject(request.id, 1)}
                                                        style={{
                                                            background: "#28a745",
                                                            color: "#fff",
                                                            padding: "5px 10px",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Approve
                                                    </span>
                                                    <span
                                                        key={index}
                                                        onClick={()=>handleApproveReject(request.id, 3)}
                                                        style={{
                                                            background: "#007bff",
                                                            color: "#fff",
                                                            padding: "5px 10px",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            marginLeft:"8px"
                                                        }}
                                                    >
                                                        Reject
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No Seller found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </main>
        </>

    );
}

export default Requests;
