"use client";
import React, { useState, useEffect } from "react";
import SellerHeader from "@/components/Header/seller";
import Image from "next/image";
import starIcon from "@/../public/assets/images/icons/card/star-stroke.svg";
import clockIcon from "@/../public/assets/images/icons/card/clock-stroke.svg";
import qualityIcon from "@/../public/assets/images/icons/card/4k-stroke.svg";
import Api from "@/components/api";
import { Row, Col, Modal, Button } from "react-bootstrap";
import GLightbox from "glightbox";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MovieCard } from "../seller/page";

const breadcrumb = {
    title: "My Account",
    links: [
        { name: "Home", href: "/" },
        { name: "Register", href: "#" },
    ],
};

export default function Bucket() {
    const router = useRouter();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bucket, setBucket] = useState([]);

    useEffect(() => {
        const savedBucket = JSON.parse(localStorage.getItem("bucket")) || [];
        setBucket(savedBucket);
    }, [])

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    }

    const handleWatchTrailer = () => {
        setShowModal(false);
        const lightbox = GLightbox({
            selector: '.popup_video', // You need to use this class in your link
            touchNavigation: true,
            loop: false,
            openEffect: 'fade',
            closeEffect: 'fade',
        });
        lightbox.open()
        // setShowTrailer(true);
    }

    const handleAddToBucket = () => {
        setBucket((prevBucket) => {
            const exists = prevBucket.find((item) => item.id === selectedMovie.id);
            if (exists) {
                return prevBucket.filter((item) => item.id !== selectedMovie.id);
            } else {
                return [...prevBucket, selectedMovie];
            }
        });
        setShowModal(false);
    };




    return (
        <>
            <SellerHeader data={{ breadcrumb }} bucketCount={bucket?.length}/>
            <main class="main" style={{ height: "100vh" }}>
                <div class="registration-area my-80">
                    <div class="container">
                        <Row>
                            {bucket?.map((movie, index) => (
                                <Col key={index} md={4} lg={3} className="mb-4">
                                    <MovieCard isInBucket={true} movie={movie} onClick={() => handleMovieClick(movie)} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </main>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMovie?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to watch the trailer ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleWatchTrailer}>
                        Watch Trailer
                    </Button>
                    <Button variant="success" onClick={handleAddToBucket}>
                        {bucket.some((item) => item.id === selectedMovie?.id) ? "Remove from Bucket" : "Add to Bucket"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function MovieCard2({ movie, onClick }) {

    return (
        <div onClick={onClick} className="movie-card-small position-relative" style={{ cursor: "pointer" }}>
            <div className="relative w-100" style={{ height: "300px" }}>
                <Image src={movie.thumbnail_url} alt="card-img" fill className="object-cover" />
            </div>
            {/* <VideoOne src={movie.trailer_url} /> */}
            <div className="details position-absolute text-center">
                <h4 className="movie-name text-uppercase fw-normal">
                    <span className="gradient-link fw-normal">
                        {movie.name}
                    </span>
                </h4>
                <ul className="movie-info">
                    <li>
                        <Image src={starIcon} alt="star" />
                        <span>{10}</span>
                    </li>
                    <li>
                        <Image src={clockIcon} alt="clock" />
                        <span>02h 30m</span>
                    </li>
                    <li>
                        <Image src={qualityIcon} alt="4k" />
                        <span>4k Quality</span>
                    </li>
                </ul>
            </div>
            <a
                href={movie.trailer_url}
                className="popup_video"
                style={{ display: "block", marginTop: "10px", color: "#fff" }}
            >
                {/* Watch Trailer */}
            </a>
        </div>
    );
}
