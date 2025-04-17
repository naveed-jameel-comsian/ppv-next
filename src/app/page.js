"use client";
import React, { useState, useEffect, useRef } from "react";
import HomeHeader from "@/components/Header/home2";
import Link from "next/link";
import Image from "next/image";
import starIcon from "@/../public/assets/images/icons/card/star-stroke.svg";
import clockIcon from "@/../public/assets/images/icons/card/clock-stroke.svg";
import qualityIcon from "@/../public/assets/images/icons/card/4k-stroke.svg";
import Api from "@/components/api";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import GLightbox from "glightbox";
import { useRouter } from "next/navigation";

const breadcrumb = {
  title: "My Account",
  links: [
    { name: "Home", href: "/" },
    { name: "Register", href: "#" },
  ],
};

export default function SellerPage() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [codeModal, setCodeModal] = useState(false);
  const [code, setCode] = useState(null)
  const [query, setQuery] = useState({
    name: null,
    actor: null,
    category: null,
  })
  const firstRender = useRef(true)
  const [filtered, setFiltered] = useState([])
  const [isFilter, setIsFilter] = useState(false)


  useEffect(() => {
    Api.get("/seller/movies").then((res) => {
      setMovies(res?.data?.movies || [])
    }).catch((err) => {
      console.log("err--------", err)
    })
  }, [])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleMovieClickNew = (movie) => {
    router.push(`/movie-detail?id=${movie.id}`)
    // setSelectedMovie(movie);
    // setShowModal(true);
  };

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
  };


  const handleApplyCode = async () => {
    const payload = {
      code,
      movie_id: selectedMovie.id
    }
    Api.post("/movie/code/apply", payload).then((res) => {
      setCode(null)
      setShowModal(false)
      setCodeModal(false)
      router.push(`/movie-detail?id=${selectedMovie.id}`);
    }).catch((err) => {
      toast.error(err?.response?.data?.message)
    })
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // Mark that the first render has passed
      setFiltered([])
      return
    }

    if (query?.name || query?.actor || query?.category) {
      setFiltered(
        movies.filter((movie) => {
          const matchName = query?.name
            ? movie.name.toLowerCase().includes(query.name.toLowerCase())
            : true;

          const matchActor = query?.actor
            ? movie.cast.some(actor => actor.toLowerCase().includes(query.actor.toLowerCase()))
            : true;

          const matchCategory = query?.category
            ? movie.categories.some(cat => cat.toLowerCase().includes(query.category.toLowerCase()))
            : true;

          return matchName && matchActor && matchCategory;
        })
      );
      setIsFilter(true)
    }
    else {
      setFiltered([])
      setIsFilter(false)
    }
  }, [query])

  return (
    <>
      <HomeHeader data={{ breadcrumb }} isSearch={true} query={query} setQuery={setQuery} />
      <main class="main mt-4" style={{ height: "100vh" }}>
        <div class="registration-area my-80">
          <div class="container">
            <Row style={{ marginTop: "150px" }}>
              {isFilter ?
                filtered.map((movie, index) => (
                  <Col key={index} md={4} lg={3} className="mb-4">
                    <MovieCard
                      movie={movie} onClick={() => handleMovieClickNew(movie)}
                    />
                  </Col>
                )) :
                movies.map((movie, index) => (
                  <Col key={index} md={4} lg={3} className="mb-4">
                    <MovieCard
                      movie={movie} onClick={() => handleMovieClickNew(movie)}
                    />
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>
      </main>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <p style={{ color: "black", fontSize: "20px" }}>{selectedMovie?.name}</p>
          {/* <Modal.Title>asc{selectedMovie?.name}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to watch the trailer or movie ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleWatchTrailer}>
            Watch Trailer
          </Button>
          <Button variant="success" onClick={() => router.push(`/movie-detail?id=${selectedMovie.id}`)}>
            Watch Movie
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={codeModal} onHide={() => setCodeModal(false)} centered>
        <Modal.Header closeButton>
          <p style={{ color: "black", fontSize: "14px" }}>Apply Code</p>
          <Modal.Title>Apply Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12">
            <label className="single-input-field style-border">
              <span>Full Name*</span>
              <input
                type="text"
                name="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
              />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleApplyCode}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function MovieCard({ movie, onClick }) {
  return (
    <div onClick={onClick} className="movie-card-small position-relative" style={{ cursor: "pointer" }}>
      <div className="relative w-100" style={{ height: "300px" }}>
        <Image src={movie.thumbnail_url} alt="card-img" fill className="object-cover" />
      </div>
      <div className="details position-absolute text-center">
        <h4 className="movie-name text-uppercase fw-normal">
          <span className="gradient-link fw-normal">
            {movie.name}
          </span>
        </h4>
        {/* <ul className="movie-info">
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
        </ul> */}
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
