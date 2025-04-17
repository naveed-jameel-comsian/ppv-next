"use client";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Api from "@/components/api";
import { CiFilter } from "react-icons/ci";
import { useThemeContext } from "@/context//ThemeContext";


export default function HomeHeader({ data = null, isSearch = false, query, setQuery }) {
    const pathName = usePathname();
    const { toggleMobileMenu } = useThemeContext();
    const routePath = pathName == "/" ? pathName : pathName.replace(/^\/+/g, "");
    const [actors, setActors] = useState([])
    const [categories, setCategories] = useState([])

    const handleQuery = (value, key) => {
        setQuery({
            ...query,
            [key]: value
        })
    }

    useEffect(() => {
        Api.get("/producer/dropdown-values").then((res) => {
            setActors(res?.data?.cast || [])
            setCategories(res?.data?.categories || [])
        }).catch((err) => {
            console.log("err--------", err)
        })
    }, [])


    return (
        <header className="header navbar-area position-relative">
            {data?.breadcrumb && BreadcrumbOne(data.breadcrumb)}

            <div className="container nav-container position-absolute top-0 start-50 translate-middle-x lh-1">
                <div className="d-flex align-items-center justify-content-between pt-lg-0 pb-lg-0 pt-4 pb-4">
                    <Link href="/" className="main-logo me-lg-5 flex-shrink-0">
                        {/* <Image src={logo} alt="img" /> */}
                    </Link>
                    <div className="d-flex py-4" style={{ marginRight: "15px" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={query?.name}
                            onChange={(e) => handleQuery(e.target.value, "name")}
                            style={{ width: "250px", marginLeft: "50px" }}
                        />
                        <select onChange={(e) => handleQuery(e.target.value, "actor")} style={{ width: "250px", marginLeft: "50px", borderRadius: "8px", paddingLeft: "4px", paddingRight: "10px" }}>
                            <option value={""}>Select Actor</option>
                            {actors?.map((cast) => (
                                <option value={cast}>{cast}</option>
                            ))
                            }
                        </select>
                        <select onChange={(e) => handleQuery(e.target.value, "category")} style={{ width: "250px", marginLeft: "50px", borderRadius: "8px", paddingLeft: "4px", paddingRight: "10px" }}>
                            <option value={""}>Select Category</option>
                            {categories?.map((category) => (
                                <option value={category}>{category}</option>
                            ))
                            }
                        </select>
                    </div>

                    {/* Auth btns */}
                    <div className="nav-right-part nav-right-part-desktop d-inline-flex align-item-center ps-md-5 ps-3">
                        <>
                            <Link
                                href="login"
                                className="hl-btn btn-base text-uppercase d-xl-inline-block d-none"
                            >
                                <span>{"Login"}</span>
                            </Link>
                            <Link
                                href="register"
                                className="hl-btn btn-base text-uppercase d-xl-inline-block d-none"
                            >
                                <span>{"Register"}</span>
                            </Link>
                        </>

                        <button
                            id="navigation-button"
                            className="menu-button menu menu_btn d-lg-none border-0 bg-transparent"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                            >
                                <path
                                    d="M0 0H16V1.77778H0V0ZM0 6.22222H10.6667V8H0V6.22222ZM0 12.4444H16V14.2222H0V12.4444Z"
                                    fill="#fff"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
