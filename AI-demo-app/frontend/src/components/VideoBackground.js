import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: hue-rotate(300deg) saturate(2) brightness(1.2);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    rgba(255, 105, 180, 0.4) 0%, 
    rgba(255, 20, 147, 0.4) 25%, 
    rgba(255, 105, 180, 0.4) 50%, 
    rgba(255, 20, 147, 0.4) 75%, 
    rgba(255, 105, 180, 0.4) 100%);
  animation: overlayShift 4s ease-in-out infinite;
  
  @keyframes overlayShift {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.6; }
  }
`;

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5; // Slow down the video
    }
  }, []);

  return (
    <VideoContainer>
      <Video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
      >
        {/* You can add a cat video here if you have one */}
        {/* For now, we'll create a CSS-based animated background */}
      </Video>
      <Overlay />
    </VideoContainer>
  );
};

export default VideoBackground;

