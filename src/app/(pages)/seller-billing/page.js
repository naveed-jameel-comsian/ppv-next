"use client";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Api from "@/components/api"; // Ensure this path is correct
import SellerHeader from "@/components/Header/seller";
import moment from "moment";

const breadcrumb = {
    title: "My Account",
    links: [
        { name: "Home", href: "/" },
        { name: "Earnings Breakdown", href: "#" },
    ],
};


const Codes = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        Api.get("/seller/billing")
            .then((res) => {
                setBills(res?.data?.bills || []);
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
            });
    }, [])


    return (
        <>
            <SellerHeader data={{ breadcrumb }} />
            <main className="main">
                <div className="registration-area my-80">
                    <div className="container mt-4">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {/* <th>Bill ID</th> */}
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    {/* <th>Used By</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {bills.length > 0 ? (
                                    bills?.map((bill, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{bill.total_amount}</td>
                                            <td>{bill.status}</td>
                                             <td>{moment(bill.created_at).format("ll")}</td>
                                            {/* <td>{code.used_by === "Not used" ? "Not Used" : `${code.used_by}`}</td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No Bill found.
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
};

export default Codes;
