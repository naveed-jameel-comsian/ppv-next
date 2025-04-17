"use client";
import React, { useEffect, useState, useRef } from "react";
import ProducerHeader from "@/components/Header/producer";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import starIcon from "@/../public/assets/images/icons/card/star-stroke.svg";
import clockIcon from "@/../public/assets/images/icons/card/clock-stroke.svg";
import qualityIcon from "@/../public/assets/images/icons/card/4k-stroke.svg";
import Api from "@/components/api";


const VideoOne = dynamic(() => import("@/components/Video/VideoOne"), {
  ssr: false,
});

const breadcrumb = {
  title: "My Account",
  links: [
    { name: "Home", href: "/" },
    { name: "Register", href: "#" },
  ],
};

export default function ProductionHouse() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState({
      name: null,
      actor: null,
      category: null,
  })
  const firstRender = useRef(true)
  const [filtered, setFiltered] = useState([])
  const [isFilter, setIsFilter] = useState(false)


  useEffect(() => {
    Api.get("/producer/movies").then((res) => {
      setMovies(res?.data?.movies || [])
    }).catch((err) => {
      console.log("err--------", err)
    })
  }, [])

  useEffect(() => {
    console.log(query)
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
      <ProducerHeader data={{ breadcrumb }} isSearch={true} query={query} setQuery={setQuery}/>
      <main class="main" style={{ minHeight: "100vh" }}>
        <div class="registration-area my-80">
          <div class="container">
            <Row style={{marginTop:"150px"}}>
              {isFilter ?
                filtered.map((movie, index) => (
                  <Col key={index} md={4} lg={3} className="mb-4">
                    <MovieCard movie={movie} onClick={() => handleMovieClick(movie)} />
                  </Col>
                )) :
                movies.map((movie, index) => (
                  <Col key={index} md={4} lg={3} className="mb-4">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </main>
    </>
  );
}


function MovieCard({ movie }) {
  return (
    <div className="movie-card-small position-relative">
      {/* <Image src={movie.thumbnail_url} alt="card-img" className="w-100" /> */}
      <div className="relative w-100" style={{ height: "300px" }}>
        <Image src={movie.thumbnail_url} alt="card-img" fill className="object-cover" />
      </div>
      {/* {movie.isRibbon && (
        <div className="movie-badge position-absolute">
          <span>{movie.count}</span>
        </div>
      )} */}
      <VideoOne src={movie.trailer_url} />
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
        {/* {movie.categories && movie.categories.length > 0 && (
          <ul className="movie-type">
            {movie.categories.map((category, index) => (
              <li key={index}>
                {category}
                {index < movie.categories.length - 1 ? ", " : ""}
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
}

function MovieCard2({ movie }) {
  return (
    <div className="movie-card-small position-relative">
      <Image src={movie.image} alt="card-img" className="w-100" />
      {movie.isRibbon && (
        <div className="movie-badge position-absolute">
          <span>{movie.count}</span>
        </div>
      )}
      <VideoOne src={movie.videoSrc} />
      <div className="details position-absolute text-center">
        <h4 className="movie-name text-uppercase fw-normal">
          <Link href={movie.href} className="gradient-link fw-normal">
            {movie.title}
          </Link>
        </h4>
        <ul className="movie-info">
          <li>
            <Image src={starIcon} alt="star" />
            <span>{movie.rating}</span>
          </li>
          <li>
            <Image src={clockIcon} alt="clock" />
            <span>{movie.duration}</span>
          </li>
          <li>
            <Image src={qualityIcon} alt="4k" />
            <span>{movie.quality} Quality</span>
          </li>
        </ul>
        {movie.categories && movie.categories.length > 0 && (
          <ul className="movie-type">
            {movie.categories.map((category, index) => (
              <li key={index}>
                {category}
                {index < movie.categories.length - 1 ? ", " : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}