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
    const [codes, setCodes] = useState([]);
    const [bucket, setBucket] = useState([]);

    useEffect(() => {
        const savedBucket = JSON.parse(localStorage.getItem("bucket")) || [];
        setBucket(savedBucket);
    }, [])

    useEffect(() => {
        Api.get("/seller/codes")
            .then((res) => {
                setCodes(res?.data?.codes || []);
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
            });
    }, []);

    return (
        <>
            <SellerHeader data={{ breadcrumb }} bucketCount={bucket?.length}/>
            <main className="main">
                <div className="registration-area my-80">
                    <div className="container mt-4">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Code</th>
                                    <th>Movie Name</th>
                                    {/* <th>Status</th> */}
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {codes.length > 0 ? (
                                    codes.map((code, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{code.code}</td>
                                            <td>{code.movie_name}</td>
                                            {/* <td>{code.status}</td> */}
                                            <td>{moment(code.created_at).format("ll")}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No codes found.
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
