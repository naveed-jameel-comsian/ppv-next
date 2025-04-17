"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Api from "@/components/api";
import GLightbox from "glightbox";
import { AiTwotoneLike } from "react-icons/ai";
import HomeHeader from "@/components/Header/home2";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { MovieCard } from "../../page";
import { useRouter } from "next/navigation";

const breadcrumb = {
  title: "My Account",
  links: [
    { name: "Home", href: "/" },
    { name: "Register", href: "#" },
  ],
};

export default function MovieDetail() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const [movie, setMovie] = useState(null);
  const [codeModal, setCodeModal] = useState(false);
  const [code, setCode] = useState(null);
  const [query, setQuery] = useState({
    name: null,
    actor: null,
    category: null,
  });
  const [movies, setMovies] = useState([]);
  const firstRender = useRef(true);
  const [filtered, setFiltered] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (movieId) {
      // Fetch movie details
      Api.get(`/movie/${movieId}`)
        .then((res) => {
          console.log(res?.data?.movie);
          setMovie(res?.data?.movie);
        })
        .catch((err) => {
          console.error("Error fetching movie:", err);
        });
    }
  }, [movieId]);

  useEffect(() => {
    Api.get("/seller/movies")
      .then((res) => {
        setMovies(res?.data?.movies || []);
      })
      .catch((err) => {
        console.log("err--------", err);
      });
  }, []);

  const handleApplyCode = async () => {
    const payload = {
      code,
      movie_id: parseInt(movieId),
    };
    Api.post("/movie/code/apply", payload)
      .then((res) => {
        setCode(null);
        setCodeModal(false);
        handleWatchMovie();
      })
      .catch((err) => {
        setError(true)
        toast.error(err?.response?.data?.message);
      });
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleWatchTrailer = () => {
    setShowModal(false);
    const lightbox = GLightbox({
      selector: ".popup_video", // You need to use this class in your link
      touchNavigation: true,
      loop: false,
      openEffect: "fade",
      closeEffect: "fade",
    });
    lightbox.open();
    // setShowTrailer(true);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // Mark that the first render has passed
      setFiltered([]);
      return;
    }

    if (query?.name || query?.actor || query?.category) {
      setFiltered(
        movies.filter((movie) => {
          const matchName = query?.name
            ? movie.name.toLowerCase().includes(query.name.toLowerCase())
            : true;

          const matchActor = query?.actor
            ? movie.cast.some((actor) =>
                actor.toLowerCase().includes(query.actor.toLowerCase())
              )
            : true;

          const matchCategory = query?.category
            ? movie.categories.some((cat) =>
                cat.toLowerCase().includes(query.category.toLowerCase())
              )
            : true;

          return matchName && matchActor && matchCategory;
        })
      );
      setIsFilter(true);
    } else {
      setFiltered([]);
      setIsFilter(false);
    }
  }, [query]);

  const handleWatchMovie = () => {
    const lightbox = GLightbox({
      selector: ".popup_video2",
      touchNavigation: true,
      loop: false,
      openEffect: "fade",
      closeEffect: "fade",
      onOpen: () => {
        setTimeout(() => {
          const video = document.querySelector(".gvideo-wrapper video");
          if (video) {
            video.play();
            if (video.requestFullscreen) {
              video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
              video.webkitRequestFullscreen();
            } else if (video.mozRequestFullScreen) {
              video.mozRequestFullScreen();
            } else if (video.msRequestFullscreen) {
              video.msRequestFullscreen();
            }
          }
        }, 100); // Delay to ensure the video element is available
      }
    });
    lightbox.open()
  };

  const handleCloseModel=()=>{
    setCodeModal(false)
    setCode(null)
    setError(false)
  }

  if (!movie) return <p className="text-white">Loading...</p>;

  return (
    <>
      <HomeHeader
        data={{ breadcrumb }}
        isSearch={true}
        query={query}
        setQuery={setQuery}
      />
      <main class="main mt-4" style={{ height: "100vh" }}>
        <div className="movie-details container py-80 mt-4">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "",
            }}
          >
            <a
              href={movie?.trailer_url}
              className="popup_video"
              style={{ display: "block", width: "100%" }}
            ></a>
            <a
              href={movie?.movie_url}
              className="popup_video2"
              style={{ display: "block", width: "100%" }}
            ></a>
            {/* Left Side - Movie Thumbnail */}
            <div className="col-8">
              <div
                className="position-relative"
                onClick={handleWatchTrailer}
              >
                <img
                  src={movie?.thumbnail_url}
                  alt="Movie Thumbnail"
                  style={{
                    width: "100%",
                    height: "60vh",
                    objectFit: "cover",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "50%",
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "70px",
                    height: "70px",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0.7)")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="38"
                    viewBox="0 0 24 29"
                    fill="white"
                  >
                    <path d="M22.2584 12.8002C23.5199 13.5823 23.5199 15.4177 22.2584 16.1998L3.05388 28.1066C1.72154 28.9326 6.40836e-07 27.9744 7.0936e-07 26.4068L1.75028e-06 2.59321C1.81881e-06 1.02557 1.72154 0.0673544 3.05388 0.893405L22.2584 12.8002Z" />
                  </svg>
                </div>
              </div>
              <div class="btn-wrap mt-sm-4 pt-lg-3 mt-4">
                <button
                  onClick={() => setCodeModal(true)}
                  class="hl-btn medium-btn btn-base text-uppercase lh-1"
                  style={{ padding: "14px", width: "100%" }}
                >
                  <span
                    className="pt-0"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    Watch Movie
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Movie Details */}
            <div
              className="col-3 text-white"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "60px",
              }}
            >
              {/* Movie Name */}
              <h2
                style={{
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                  letterSpacing: "1px",
                }}
              >
                {movie?.name}
              </h2>
              <p>{movie?.description}</p>

              {/* Cast Section */}
              {movie?.cast && movie?.cast?.length > 0 && (
                <div>
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Cast
                  </h3>
                  <div
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {movie?.cast.map((contributor, index) => (
                      <li key={index} style={{ marginTop: "8px" }}>
                        <span
                          key={index}
                          style={{
                            background: "#007bff",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {contributor}
                        </span>
                      </li>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Section */}
              {movie?.categories && movie?.categories?.length > 0 && (
                <div>
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "10px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    Category
                  </h3>
                  <div
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {movie?.categories.map((category, index) => (
                      <li key={index} style={{ marginTop: "8px" }}>
                        <span
                          key={index}
                          style={{
                            background: "#28a745",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {category}
                        </span>
                      </li>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Row style={{ marginTop: "20px" }}>
          {isFilter
            ? filtered.map((movie, index) => (
                <Col key={index} md={4} lg={3} className="mb-4">
                  <MovieCard
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                  />
                </Col>
              ))
            : movies.map((movie, index) => (
                <Col key={index} md={4} lg={3} className="mb-4">
                  <MovieCard
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                  />
                </Col>
              ))}
        </Row>
      </main>
      <Modal
        // backdrop="static"
        show={codeModal}
        onHide={handleCloseModel}
        centered
      >
        <Modal.Header>
          <p style={{ color: "black", fontSize: "14px" }}>Apply Code</p>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12">
            <label className="single-input-field style-border">
              <span>Code*</span>
              <input
                type="text"
                name="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
                style={error ? {border:"2px solid red"} : {}}
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
