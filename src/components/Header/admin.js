"use client";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";

export default function AdminHeader({ data = null, isFilter = null, filter, setFilter, addAdmin=false, setModal }) {
    const pathName = usePathname();
    const routePath = pathName == "/" ? pathName : pathName.replace(/^\/+/g, "");
    const superAdmin = localStorage.getItem("user_role") == 1

    const checkActiveMenu = (href) => {
        return routePath == href ? "active" : "";
    };

    const handleQuery = (value) => {
        setFilter(value)
    }


    return (
        <header className="header navbar-area position-relative">
            {data?.breadcrumb && BreadcrumbOne(data.breadcrumb)}

            <div className="container nav-container position-absolute top-0 start-50 translate-middle-x lh-1">
                <div className="d-flex align-items-center justify-content-between pt-lg-0 pb-lg-0 pt-4 pb-4">
                    <Link href="/" className="main-logo me-lg-5 flex-shrink-0">
                        {/* <Image src={logo} alt="img" /> */}
                    </Link>
                    <div>{superAdmin ? "Super Admin Board" : "Admin Board"}</div>
                    { addAdmin && <div onClick={()=>setModal("settings")} style={{marginLeft:"10px", cursor:"pointer"}}><IoMdSettings size={24} /></div> }
                    { addAdmin && <div onClick={()=>setModal("add")} style={{marginLeft:"10px", cursor:"pointer"}}><IoMdPersonAdd size={24} /></div> }

                    <nav className="navbar-nav m-auto d-lg-inline-block d-none">
                        <ul className="main-menu d-flex">
                            { superAdmin &&
                                <li
                                    className={`menu-item`}
                                >
                                    <Link
                                        href={"/admins"}
                                        className={`menu-link ${checkActiveMenu("admins")}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                        >
                                            <path
                                                opacity="0.4"
                                                d="M6.57373 12.3083H11.4266"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M1 10.3704C1 5.8656 1.51241 6.18 4.27061 3.728C5.47737 2.7968 7.35509 1 8.97662 1C10.5973 1 12.5126 2.788 13.7302 3.728C16.4884 6.18 17 5.8656 17 10.3704C17 17 15.3651 17 8.99999 17C2.63489 17 1 17 1 10.3704Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>{"Admins"}</span>
                                    </Link>
                                </li>
                            }
                            <li
                                className={`menu-item`}
                            >
                                <Link
                                    href={"/all-sellers"}
                                    className={`menu-link ${checkActiveMenu("all-sellers")}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.4"
                                            d="M6.57373 12.3083H11.4266"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1 10.3704C1 5.8656 1.51241 6.18 4.27061 3.728C5.47737 2.7968 7.35509 1 8.97662 1C10.5973 1 12.5126 2.788 13.7302 3.728C16.4884 6.18 17 5.8656 17 10.3704C17 17 15.3651 17 8.99999 17C2.63489 17 1 17 1 10.3704Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>{"Sellers"}</span>
                                </Link>
                            </li>
                            <li
                                className={`menu-item`}
                            >
                                <Link
                                    href={"/all-producers"}
                                    className={`menu-link ${checkActiveMenu("all-producers")}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.4"
                                            d="M6.57373 12.3083H11.4266"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1 10.3704C1 5.8656 1.51241 6.18 4.27061 3.728C5.47737 2.7968 7.35509 1 8.97662 1C10.5973 1 12.5126 2.788 13.7302 3.728C16.4884 6.18 17 5.8656 17 10.3704C17 17 15.3651 17 8.99999 17C2.63489 17 1 17 1 10.3704Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>{"Producers"}</span>
                                </Link>
                            </li>
                            <li
                                className={`menu-item`}
                            >
                                <Link
                                    href={"/account-requests"}
                                    className={`menu-link ${checkActiveMenu("account-requests")}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                    >
                                        <path
                                            opacity="0.4"
                                            d="M6.57373 12.3083H11.4266"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1 10.3704C1 5.8656 1.51241 6.18 4.27061 3.728C5.47737 2.7968 7.35509 1 8.97662 1C10.5973 1 12.5126 2.788 13.7302 3.728C16.4884 6.18 17 5.8656 17 10.3704C17 17 15.3651 17 8.99999 17C2.63489 17 1 17 1 10.3704Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>{"Requests"}</span>
                                </Link>
                            </li>
                            { isFilter == "seller" && 
                                <li className={`menu-item`}>
                                    <select value={filter} onChange={(e) => handleQuery(e.target.value)} style={{ width: "200px", height:"30px", marginTop: "14px", marginLeft: "50px", borderRadius: "8px", paddingLeft: "4px", paddingRight: "10px" }}>
                                        <option value={4}>All</option>
                                        <option value={1}>Active</option>
                                        <option value={2}>InActive</option>
                                        <option value={5}>Can't Make Code</option>
                                    </select>
                                </li>
                            }
                            { isFilter == "producer" && 
                                <li className={`menu-item`}>
                                    <select value={filter} onChange={(e) => handleQuery(e.target.value)} style={{ width: "200px", height:"30px", marginTop: "14px", marginLeft: "50px", borderRadius: "8px", paddingLeft: "4px", paddingRight: "10px" }}>
                                        <option value={4}>All</option>
                                        <option value={1}>Active</option>
                                        <option value={2}>InActive</option>
                                    </select>
                                </li>
                            }
                            { isFilter == "request" && 
                                <li className={`menu-item`}  style={{ width: "200px",  marginLeft: "50px"}}></li>
                            }
                        </ul>
                    </nav>
                    <div className="nav-right-part nav-right-part-desktop d-inline-flex align-item-center ps-md-5 ps-3">
                        <Link
                            href="login"
                            className="hl-btn btn-base text-uppercase d-xl-inline-block d-none"
                            onClick={() => localStorage.clear()}
                        >
                            <span>{"Logout"}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
