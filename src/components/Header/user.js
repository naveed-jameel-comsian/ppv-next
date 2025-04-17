"use client";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import Api from "@/components/api";
import { useRouter } from "next/navigation";


export default function UserHeader({ data = null, bucketCount,  }) {
    const router = useRouter();

    const pathName = usePathname();
    const routePath = pathName == "/" ? pathName : pathName.replace(/^\/+/g, "");

    const checkActiveMenu = (href) => {
        return routePath == href ? "active" : "";
    };

    const handleGetCodes = async () => {
        try {
            const bucket = JSON.parse(localStorage.getItem("bucket")) || [];
            const codes = await Promise.all(
                bucket.map(async (movie) => {
                    const res = await Api.post("/movies/code/generate", { movie_id: movie.id });
                    return { movie, code: res.data.code };
                })
            );
            localStorage.removeItem("bucket")
            // toast.success("Code ")
            router.push("/codes");
            // console.log("Generated Codes:", codes);
            // alert("Codes Generated: " + codes.map(c => `${c.movie.name}: ${c.code}`).join(", "));
        } catch (err) {
            console.error("Error fetching codes:", err);
        }
    };
    
    
    return (
        <header className="header navbar-area position-relative">
            {data?.breadcrumb && BreadcrumbOne(data.breadcrumb)}

            <div className="container nav-container position-absolute top-0 start-50 translate-middle-x lh-1">
                <div className="d-flex align-items-center justify-content-between pt-lg-0 pb-lg-0 pt-4 pb-4">
                    <Link href="/" className="main-logo me-lg-5 flex-shrink-0">
                        {/* <Image src={logo} alt="img" /> */}
                    </Link>
                   
                    {/* Auth btns */}
                    <div className="nav-right-part nav-right-part-desktop d-inline-flex align-item-center ps-md-5 ps-3">
                        <Link
                            href="login"
                            className="hl-btn btn-base text-uppercase d-xl-inline-block d-none"
                            onClick={()=>localStorage.clear()}
                        >
                            <span>{"Logout"}</span>
                        </Link>
                    </div>
                </div>
            </div>

        </header>
    );
}
