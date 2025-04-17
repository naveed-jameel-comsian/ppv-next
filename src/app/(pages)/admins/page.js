"use client";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Api from "@/components/api"; // Ensure this path is correct
import AdminHeader from "@/components/Header/admin";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { FiEye } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";

const breadcrumb = {
    title: "My Account",
    links: [
        { name: "Home", href: "/" },
        { name: "Earnings Breakdown", href: "#" },
    ],
};


const AllAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [filter, setFilter] = useState()
    const [sellectedSeller, setSelectedSeller] = useState({})
    const [model, setModal] = useState(null);
    const [price, setPrice] = useState(1)
    const [percentage, setPercentage] = useState(1)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "",
        password: "",
        userType: "Seller",
    })

    const handleFilter = (status) => {
        setFilter(status)
        Api.post("/admin/admins", { status: parseInt(status) })
            .then((res) => {
                setAdmins(res?.data?.admins || []);
            })
            .catch((err) => {
                console.error("Error fetching codes:", err);
            });
    }

    useEffect(() => {
        handleFilter(4)
    }, [])

    const handleEdit = (seller) => {
        setSelectedSeller(seller)
        setModal("update")
    }

    const handleActiveInactive = (user_id, status) => {
        Api.post("/admin/request", { user_id, status })
            .then((res) => {
                setAdmins((prev) =>
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
            setAdmins((prev) =>
                prev.map((seller) =>
                    seller.id !== sellectedSeller?.id ? seller : { ...sellectedSeller }
                )
            )
        }).catch((err) => {
            toast.error("Error try again!")
        })
        setModal(null)
    }

    const handleChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            role_id: 4
        }
        Api.post("/auth/signup", payload).then((res) => {
            toast.success("New Admin added!")
            setAdmins((prev)=>[{name: formData?.name, email: formData?.email, country: formData?.country },...prev])
            setFormData({
                name: "",
                email: "",
                country: "",
                password: "",
                userType: "Seller",
            })
            setModal(null)
        }).catch((err) => {
            toast.error(err?.response?.data?.message)
        })
    }

    const handleClose =()=>{
        setModal(null)
        setFormData({
            name: "",
            email: "",
            country: "",
            password: "",
            userType: "Seller",
        })
    }

    const handleDeleteAdmin = (id)=>{
        Api.post("/admin/delete", { user_id : id }).then((res)=>{
            setAdmins((prev)=>prev.filter((user)=> user.id !== id))
            toast.success("Admin deleted!")
        }).catch((err)=>{
            toast.success("Failed to delete!")
        })
    }

    const handleSaveSettings = (id)=>{
        Api.post("/admin/settings", { price, percentage }).then((res)=>{
            toast.success("Settings saved!")
            setModal(null)
        }).catch((err)=>{
            toast.success("Failed to delete!")
        })
    }

    useEffect(()=>{
        if(model === "settings"){
            Api.get("/admin/settings").then((res)=>{
                setPrice(res?.data?.price)
                setPercentage(res?.data?.percentage)
            }).catch((err)=>{
            })
        }
    },[model])

    return (
        <>
            <AdminHeader addAdmin={true} setModal={setModal} data={{ breadcrumb }} isFilter="producer" filter={filter} setFilter={handleFilter} />
            <main className="main">
                <div className="registration-area my-80">
                    <div className="container mt-4">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Seller Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.length > 0 ? (
                                    admins.map((seller, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{seller.name}</td>
                                            <td>{seller.email}</td>
                                            <td>{seller.status == 1 ? "Active" : "InActive"}</td>
                                            <td>
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
                                                    <span
                                                        key={index}
                                                        onClick={() => handleDeleteAdmin(seller.id)}
                                                        style={{
                                                            background: "#f33551",
                                                            color: "#fff",
                                                            padding: "5px 10px",
                                                            borderRadius: "5px",
                                                            cursor: "pointer",
                                                            marginLeft: "8px"
                                                        }}
                                                    >
                                                        Delete
                                                    </span>

                                                </div>
                                            </td>
                                        </tr>
                                        // <SellerRow key={index} seller={seller} handleEdit={handleEdit} handleActiveInactive={handleActiveInactive} filter={filter} index={index}/>
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

            <Modal show={model == "add"} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <p style={{ color: "black", fontSize: "20px" }}>{"Add Admin"}</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-12">
                            <label className="single-input-field style-border">
                                <span style={{ color: "black" }}>Full Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChangeInput}
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
                                    value={formData.email}
                                    onChange={handleChangeInput}
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
                                    value={formData.country}
                                    onChange={handleChangeInput}
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
                                    value={formData.password}
                                    onChange={handleChangeInput}
                                    placeholder="Password"
                                />
                            </label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAdd}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={model == "settings"} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <p style={{ color: "black", fontSize: "20px" }}>{"Price"}</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-12">
                            <label className="single-input-field style-border">
                                <span style={{ color: "black" }}>Movie Price</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                                    placeholder="Movie Price"
                                />
                            </label>
                        </div>
                        <div className="col-md-12">
                            <label className="single-input-field style-border">
                                <span style={{ color: "black" }}>Producer Percentage</span>
                                <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    name="percentage"
                                    value={percentage}
                                    onChange={(e)=>setPercentage(e.target.value)}
                                    placeholder="Producer Percentage"
                                />
                            </label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSaveSettings}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};



export default AllAdmins;
