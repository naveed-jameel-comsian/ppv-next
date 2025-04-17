"use client";
import React, { useState, useEffect, useRef } from "react";
import SellerHeader from "@/components/Header/seller";
import Link from "next/link";
import Image from "next/image";
import starIcon from "@/../public/assets/images/icons/card/star-stroke.svg";
import clockIcon from "@/../public/assets/images/icons/card/clock-stroke.svg";
import qualityIcon from "@/../public/assets/images/icons/card/4k-stroke.svg";
import Api from "@/components/api";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import GLightbox from "glightbox";


const breadcrumb = {
  title: "My Account",
  links: [
    { name: "Home", href: "/" },
    { name: "Register", href: "#" },
  ],
};

export default function SellerPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [query, setQuery] = useState({
    name: null,
    actor: null,
    category: null,
    // producer: null
  })
  const firstRender = useRef(true)
  const [filtered, setFiltered] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [confirmationModal, setShowConfirmationModal] = useState(false);


  useEffect(() => {
    Api.get("/seller/movies").then((res) => {
      setMovies(res?.data?.movies || [])
      console.log("res-------", res?.data?.movies)
    }).catch((err) => {
      console.log("err--------", err)
    })
  }, [])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
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

  const handleGetCode = () => {
    setShowModal(false);
    setShowConfirmationModal(true)
  };

  const handleConfirm = () => {
    setShowConfirmationModal(false)
    generateUniqueCode();
  };

  const generateUniqueCode = async () => {
    try {
      const res = await Api.post("/seller/code/generate", {
        movie_id: selectedMovie.id,
      });
      setGeneratedCode(res?.data?.code || "ERROR_GENERATING_CODE");
      setShowCodeModal(true);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error generating code:", error?.response?.data?.message);
      setShowCodeModal(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code Copied!", "success");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      GLightbox({
        selector: ".popup_video",
        touchNavigation: true,
        loop: false,
      });
    }
  }, [showTrailer]);

  useEffect(()=>{
    if (firstRender.current) {
      firstRender.current = false; // Mark that the first render has passed
      setFiltered([])
      return
    }

    if(query?.name || query?.actor || query?.category){
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
    else{
      setFiltered([])
      setIsFilter(false)
    }
  },[query])



  return (
    <>
      <SellerHeader data={{ breadcrumb }} isSearch={true} query={query} setQuery={setQuery}/>
      <main class="main mt-4" style={{ height: "100vh" }}>
        <div class="registration-area my-80">
          <div class="container">
          <Row style={{marginTop:"150px"}}>
              { isFilter ?
                filtered.map((movie, index) => (
                  <Col key={index} md={4} lg={3} className="mb-4">
                    <MovieCard 
                      movie={movie} onClick={() => handleMovieClick(movie)}
                    />
                  </Col>
                )):
                movies.map((movie, index) => (
                  <Col key={index} md={4} lg={3} className="mb-4">
                     <MovieCard 
                      movie={movie} onClick={() => handleMovieClick(movie)}
                    />
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>
      </main>

      {/* Modal for Selecting Watch Trailer or Get Code */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
        <p style={{ color: "black", fontSize: "20px" }}>{selectedMovie?.name}</p>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to watch the trailer or get the code?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleWatchTrailer}>
            {/* <Link href={selectedMovie?.trailer_url}> */}
              Watch Trailer
            {/* </Link> */}
          </Button>
          <Button variant="success" onClick={handleGetCode}>
            Get Code
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Playing Trailer */}
      <Modal show={showTrailer} onHide={() => setShowTrailer(false)} centered>
        <Modal.Body>
          {/* <VideoOne src={selectedMovie?.trailer_url} /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleGetCode}>
            Get Code
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Showing Generated Code */}
      <Modal show={showCodeModal} onHide={() => setShowCodeModal(false)} centered>
        <Modal.Header closeButton>
        <p style={{ color: "black", fontSize: "20px" }}>{"Generated Code"}</p>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" readOnly value={generatedCode} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCopyCode}>
            Copy Code
          </Button>
          <Button variant="success" onClick={() => setShowCodeModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for confirmation to Get Code */}
      <Modal show={confirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
        <Modal.Header closeButton>
          <p style={{ color: "black", fontSize: "20px" }}>{selectedMovie?.name}</p>
          <Modal.Title>{selectedMovie?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you Sure you want to get code ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>setShowConfirmationModal(false)}>
              Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function MovieCard({ movie, onClick }) {

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


function VideoOne({ src }) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      GLightbox({
        selector: ".popup_video",
        touchNavigation: true,
        loop: false,
      });
    }
  }, []);

  
  return (
    <Link
      className="popup_video video_play_button p-0 video-play-btn position-absolute top-50 start-50 translate-middle"
      href={src}
      style={{backgroundColor:"red"}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="29"
        viewBox="0 0 24 29"
        fill="none"
      >
        <path
          d="M22.2584 12.8002C23.5199 13.5823 23.5199 15.4177 22.2584 16.1998L3.05388 28.1066C1.72154 28.9326 6.40836e-07 27.9744 7.0936e-07 26.4068L1.75028e-06 2.59321C1.81881e-06 1.02557 1.72154 0.0673544 3.05388 0.893405L22.2584 12.8002Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}