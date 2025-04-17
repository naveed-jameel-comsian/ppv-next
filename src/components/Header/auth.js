"use client";
import Link from "next/link";
import { useThemeContext } from "@/context//ThemeContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthHeader() {
    const user = localStorage.getItem("isLogged")
    const { toggleMobileMenu } = useThemeContext();
    const [showBox, setShowBox] = useState(false);
    const pathName = usePathname();
    const routePath = pathName == "/" ? pathName : pathName.replace(/^\/+/g, "");

    useEffect(() => {
        const closeSearch = () => {
            setShowBox(false);
        };

        window.addEventListener("click", closeSearch);

        return () => {
            window.removeEventListener("click", closeSearch);
        };
    }, []);

    const checkActiveMenu = (href) => {
        return routePath == href ? "active" : "";
    };

    return (
        <header className="header navbar-area position-relative">
            <div className="breadcrumb-area position-relative">
                <div className="position-absolute top-50 start-50 translate-middle text-center">
                </div>
            </div>
            <div className="container nav-container position-absolute top-0 start-50 translate-middle-x lh-1">
                <div className="d-flex align-items-center justify-content-between pt-lg-0 pb-lg-0 pt-4 pb-4">
                    <Link href="/" className="main-logo me-lg-5 flex-shrink-0">
                    </Link>
                    
                    <nav className="navbar-nav m-auto d-lg-inline-block d-none">
                        <ul className="main-menu d-flex">
                            <li className={`menu-item`}>
                                <Link
                                    href={"/"}
                                    className={`menu-link ${checkActiveMenu("/")}`}
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
                                    <span>{"Home"}</span>
                                </Link>
                            </li>
                            {/* <li className={`menu-item`}>
                                <Link
                                    href={"/movies"}
                                    className={`menu-link ${checkActiveMenu("/movies")}`}
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
                            </li> */}
                        </ul>
                    </nav>
                    <div className="nav-right-part nav-right-part-desktop d-inline-flex align-item-center ps-md-5 ps-3">
                        {
                            !user ?
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
                                </> :
                                <Link
                                    href="login"
                                    className="hl-btn btn-base text-uppercase d-xl-inline-block d-none"
                                >
                                    <span onClick={()=>localStorage.clear()}>{"Logout"}</span>
                                </Link>
                        }

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
