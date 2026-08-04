"use client";

import React, { useEffect, useRef, useState } from "react";

type YouTubePlayerProps = {
  videoId: string;
  title: string;
  className?: string;
};

type YouTubeApiPlayer = {
  destroy: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
};

type YouTubeApiNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events?: {
        onReady?: (event: { target: { mute: () => void; playVideo: () => void } }) => void;
        onStateChange?: (event: { data: number }) => void;
      };
    }
  ) => YouTubeApiPlayer;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
  };
};

declare global {
  interface Window {
    YT?: YouTubeApiNamespace;
    onYouTubeIframeAPIReady?: () => void;
    __ytIframeApiPromise?: Promise<void>;
  }
}

const YT_API_SRC = "https://www.youtube.com/iframe_api";

const ensureYouTubeApi = (): Promise<void> => {
  if (window.YT?.Player) {
    return Promise.resolve();
  }
  if (window.__ytIframeApiPromise) return window.__ytIframeApiPromise;

  window.__ytIframeApiPromise = new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${YT_API_SRC}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = YT_API_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };
  });

  return window.__ytIframeApiPromise;
};

export default function YouTubePlayer({
  videoId,
  title,
  className,
}: YouTubePlayerProps) {
  const wrapperRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubeApiPlayer | null>(null);
  const autoPausedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      await ensureYouTubeApi();
      if (cancelled || !containerRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
            if (cancelled) return;
            setIsReady(true);
            setIsPlaying(true);
          },
          onStateChange: (event) => {
            if (cancelled || !window.YT?.PlayerState) return;
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
          },
        },
      });
    };

    init();

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  useEffect(() => {
    if (!wrapperRef.current || !isReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry?.isIntersecting ?? false;

        if (!isVisible && isPlaying) {
          playerRef.current?.pauseVideo();
          autoPausedRef.current = true;
          return;
        }

        if (isVisible && autoPausedRef.current) {
          playerRef.current?.playVideo();
          autoPausedRef.current = false;
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [isReady, isPlaying]);

  const togglePlayback = () => {
    if (!isReady) return;
    autoPausedRef.current = false;
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) playerRef.current?.playVideo();
      else playerRef.current?.pauseVideo();
      return next;
    });
  };

  return (
    <button
      ref={wrapperRef}
      type="button"
      className="about-video-toggle"
      aria-label={isPlaying ? "Video pausieren" : "Video abspielen"}
      onClick={togglePlayback}
    >
      <div ref={containerRef} className={className} title={title} aria-label={title} />
    </button>
  );
}
