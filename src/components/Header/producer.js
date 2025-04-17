"use client";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Api from "@/components/api";
import { CiFilter } from "react-icons/ci";
import { TbFilterFilled } from "react-icons/tb";
import "./style.css"


export default function ProducerHeader({ isHero = false, data = null, isSearch = false, query, setQuery }) {

    const pathName = usePathname();
    const routePath = pathName == "/" ? pathName : pathName.replace(/^\/+/g, "");
    const [actors, setActors] = useState([])
    const [categories, setCategories] = useState([])
    const [showFilters, setShowFilters] = useState(false);

    const checkActiveMenu = (href) => {
        return routePath == href ? "active" : "";
    };

    const handleQuery = (value, key)=>{
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
                    <div className="">Producer Board</div>
                    <nav className="navbar-nav m-auto d-lg-inline-block d-none">
                        <ul className="main-menu d-flex">
                            <li
                                className={`menu-item`}
                            >
                                <Link
                                    href={"/production"}
                                    className={`menu-link ${checkActiveMenu("production")}`}
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
                                    <span>{"Movies"}</span>
                                </Link>
                            </li>
                            <li
                                className={`menu-item`}
                            >
                                <Link
                                    href={"/earning-breakdown"}
                                    className={`menu-link ${checkActiveMenu("earning-breakdown")}`}
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
                                    <span>{"Earning"}</span>
                                </Link>
                            </li>
                            <li
                                className={`menu-item`}
                            >
                                <Link
                                    href={"/upload-movie"}
                                    className={`menu-link ${checkActiveMenu("upload-movie")}`}
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
                                    <span>{"Upload Movie"}</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {isSearch ? 
                    <div className="d-flex justify-content-end py-2">
                        <button 
                            className="hl-btn btn-base p-3" 
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            { showFilters? 
                                <CiFilter size={20}/> :
                                <TbFilterFilled size={20}/>
                            }

                            {/* {showFilters ? "Hide Filters" : "Show Filters"} */}
                        </button>
                    </div> : <div className=""></div>
                }
                    {/* Auth btns */}
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
                {/* Filter Toggle Button */}
               
                { (isSearch && showFilters) &&
                    <div className={`filter-container ${showFilters ? "show" : ""}`}>
                    <div className="d-flex py-4" style={{marginRight:"150px"}}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={query?.name}
                            onChange={(e)=>handleQuery(e.target.value, "name")}
                            style={{ width: "250px", marginLeft: "50px" }}
                        />
                        <select onChange={(e)=>handleQuery(e.target.value, "actor")} style={{ width: "250px", marginLeft: "50px", borderRadius:"8px", paddingLeft:"4px", paddingRight:"10px" }}>
                            <option value={""}>Select Actor</option>
                            { actors?.map((cast)=>(
                                <option value={cast}>{cast}</option>
                                ))
                            }
                        </select>
                        <select onChange={(e)=>handleQuery(e.target.value, "category")} style={{ width: "250px", marginLeft: "50px", borderRadius:"8px", paddingLeft:"4px", paddingRight:"10px" }}>
                            <option value={""}>Select Category</option>
                            { categories?.map((category)=>(
                                <option value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    </div>
                }
            </div>

        </header>
    );
}
