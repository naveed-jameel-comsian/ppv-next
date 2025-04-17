"use client";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Api from "@/components/api"; // Ensure this path is correct
import AdminHeader from "@/components/Header/admin";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const breadcrumb = {
    title: "My Account",
    links: [
        { name: "Home", href: "/" },
        { name: "Earnings Breakdown", href: "#" },
    ],
};


const AllProducers = () => {
    const [sellers, setSellers] = useState([]);
    const [filter, setFilter] = useState()
    const [sellectedSeller, setSelectedSeller] = useState({})
    const [model, setModal] = useState(null);
    const [payments, setPayments] = useState([])

    const handleFilter = (status) => {
        setFilter(status)
        Api.post("/admin/producers", { status: parseInt(status) })
            .then((res) => {
                setSellers(res?.data?.producers || []);
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
            });
    }

    useEffect(() => {
        handleFilter(4)
    }, []);

    const handleEdit = (seller) => {
        setSelectedSeller(seller)
        setModal("update")
    }

    const handleActiveInactive = (user_id, status) => {
        Api.post("/admin/request", { user_id, status })
            .then((res) => {
                setSellers((prev) =>
                    prev.map((seller) =>
                        seller.id !== user_id ? seller : { ...seller, status }
                    )
                )
                if (status == 1) toast.success("Seller Active successfully!")
                else toast.success("Seller InActive successfully!")
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
            })
    }

    const handleChange = (e) => {
        setSelectedSeller({ ...sellectedSeller, [e.target.name]: e.target.value });
    }

    const handleSave = () => {
        const payload = {
            user_id: sellectedSeller?.id,
            name: sellectedSeller?.name,
            email: sellectedSeller?.email,
            country: sellectedSeller?.country
        }
        if (sellectedSeller?.password) {
            payload.password = sellectedSeller?.password
        }
        Api.put("/admin/update", payload).then((res) => {
            toast.success("Update successfully!")
            setSellers((prev) =>
                prev.map((seller) =>
                    seller.id !== sellectedSeller?.id ? seller : { ...sellectedSeller }
                )
            )
        }).catch((err) => {
            toast.error("Error try again!")
        })
        setModal(null)
    }

    const handleViewEarnings = (id) => {
        setModal("payment")
        Api.post("/admin/producer/earnings", { user_id : parseInt(id) })
            .then((res) => {
                setPayments(res?.data?.earnings)
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
        });
    }

    return (
        <>
            <AdminHeader addAdmin={false} data={{ breadcrumb }} isFilter="producer" filter={filter} setFilter={handleFilter} />
            <main className="main">
                <div className="registration-area my-80">
                    <div className="container mt-4">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producer Name</th>
                                    <th>Email</th>
                                    <th>Earnings</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellers.length > 0 ? (
                                    sellers.map((seller, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{seller.name}</td>
                                            <td>{seller.email}</td>
                                            <td>
                                                <span
                                                    key={index}
                                                    onClick={() => handleViewEarnings(seller?.id)}
                                                    style={{
                                                        background: "#28a745",
                                                        color: "#fff",
                                                        padding: "5px 10px",
                                                        borderRadius: "5px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    View
                                                </span>
                                            </td>
                                            <td>{seller.status == 1 ? "Active" : "InActive"}</td>
                                            <div>
                                                <span
                                                    key={index}
                                                    onClick={() => handleEdit(seller)}
                                                    style={{
                                                        background: "#28a745",
                                                        color: "#fff",
                                                        padding: "5px 10px",
                                                        borderRadius: "5px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    key={index}
                                                    onClick={() => handleActiveInactive(seller.id, seller.status == 1 ? 2 : 1)}
                                                    style={{
                                                        background: "#007bff",
                                                        color: "#fff",
                                                        padding: "5px 10px",
                                                        borderRadius: "5px",
                                                        cursor: "pointer",
                                                        marginLeft: "8px"
                                                    }}
                                                >
                                                    {seller.status == 1 ? "Make InActive" : "Make Active"}
                                                </span>
                                            </div>
                                        </tr>
                                        // <ProducerRow seller={seller} handleEdit={handleEdit} handleActiveInactive={handleActiveInactive} index={index} key={index} />
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
            <Modal show={model == "update"} onHide={() => setModal(null)} centered>
                <Modal.Header closeButton>
                    <p style={{ color: "black", fontSize: "20px" }}>{"Update"}</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-12">
                            <label className="single-input-field style-border">
                                <span style={{ color: "black" }}>Full Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={sellectedSeller.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />
                            </label>
                        </div>
                        <div className="col-md-12">
                            <label className="single-input-field style-border">
                                <span style={{ color: "black" }}>Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={sellectedSeller.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </label>
                        </div>
                        <div className="col-md-12">
                            <label className="single-input-field style-border">
                                <span style={{ color: "black" }}>Country*</span>
                                <input
                                    type="text"
                                    name="country"
                                    value={sellectedSeller.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                />
                            </label>
                        </div>
                        <div className="col-md-12">
                            <label className="single-input-field style-border">
                                <span style={{ color: "black" }}>Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={sellectedSeller.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                            </label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={model == "payment"} onHide={() => { setModal(null); setPayments([]) }} centered>
                <Modal.Header closeButton>
                    <p style={{ color: "black", fontSize: "20px" }}>{"All Payments"}</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-between">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Amount</th>
                                    <th>Month</th>
                                    <th>Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((payment, index) => (
                                        <Row key={index} payment={payment} index={index} />
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
                </Modal.Body>
            </Modal>
        </>

    );
}

const Row = ({ payment, index }) => {
    const [status, setStatus] = useState(0)

    useEffect(() => {
        if (payment?.status == "Unpaid") setStatus(0)
        else setStatus(1)
    }, [payment])

    const handleUpdatePayment = (status) => {
        const payload = {
            earning_id: payment?.id,
            status: parseInt(status)
        }
        Api.post("/admin/producer/pay", payload).then((res) => {
            toast.success("Update successfully!")
            setStatus(status)
        }).catch((err) => {
            toast.error("Error try again!")
        })
    }

    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{payment.total_amount}</td>
            <td>{moment(payment.month).format("MMM YYYY")}</td>
            <td>
                <select value={status} onChange={(e)=>handleUpdatePayment(e.target.value)} style={{ width:"100px", borderRadius: "8px", paddingLeft: "4px", paddingRight: "10px" }}>
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>
            </td>
        </tr>
    )

}

export default AllProducers;
