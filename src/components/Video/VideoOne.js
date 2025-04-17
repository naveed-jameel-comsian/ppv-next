"use client";
import React, { useEffect } from "react";
import GLightbox from "glightbox";
import Link from "next/link";

export default function VideoOne({ src }) {

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
