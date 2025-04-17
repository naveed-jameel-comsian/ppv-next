import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import starIcon from "@/../public/assets/images/icons/card/star-stroke.svg";
import clockIcon from "@/../public/assets/images/icons/card/clock-stroke.svg";
import qualityIcon from "@/../public/assets/images/icons/card/4k-stroke.svg";
import playlistIcon from "@/../public/assets/images/icons/card/add-playlist.svg";
import castingIcon from "@/../public/assets/images/icons/card/casting.svg";
import favouriteIcon from "@/../public/assets/images/icons/card/add-favourite.svg";
import shareIcon from "@/../public/assets/images/icons/card/share.svg";
const VideoOne = dynamic(() => import("@/components/Video/VideoOne"), {
  ssr: false,
});

export default function MovieCardTwo({ movie }) {
  return (
    <div className="movie-card-small position-relative style-three">
      {/* <!-- Card Thumbnail --> */}
      <div className="thumb">
        <Image src={movie.image} alt="card-img" className="w-100" />
      </div>
      {/* <!-- Play Button --> */}
      <VideoOne src={movie.videoSrc} />
      {/* <!-- Movie Details --> */}
      <div className="details details-two position-absolute">
        <h4 className="movie-name text-uppercase">
          <Link href={movie.href} className="gradient-link">
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
        {movie.categories && movie.categories.length && (
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
      {/* <!-- Cards Options --> */}
      <div className="options">
        <button className="option-btn options--1">
          <Image src={playlistIcon} alt="playlist" />
        </button>
        <button className="option-btn options--2">
          <Image src={castingIcon} alt="casting" />
        </button>
        <button className="option-btn options--3">
          <Image src={favouriteIcon} alt="favourite" />
        </button>
        <button className="option-btn options--4">
          <Image src={shareIcon} alt="share" />
        </button>
      </div>
    </div>
  );
}
