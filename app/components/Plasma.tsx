"use client";

import React from "react";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const Plasma: React.FC<PlasmaProps> = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <video
        poster="/color-bends.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        style={{
          position: "absolute",
          inset: "-1px",
          width: "calc(100% + 2px)",
          height: "calc(100% + 2px)",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
          opacity: 0.5,
        }}
      >
        <source src="/color-bends.webm" type="video/webm" />
        <source src="/color-bends.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Plasma;
