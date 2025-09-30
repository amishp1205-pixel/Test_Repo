import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogoContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

const Logo = styled(motion.img)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 0.5),
    0 0 40px rgba(255, 105, 180, 0.7),
    0 0 60px rgba(255, 20, 147, 0.5);
  object-fit: cover;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
`;

const GlowRing = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4) border-box;
  background-clip: border-box;
  animation: rotate 3s linear infinite;
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
    border-radius: 50%;
    opacity: 0.3;
  }
`;

const SparkleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const AnimatedLogo = () => {
  const sparkles = [
    { id: 1, x: 20, y: 15, delay: 0 },
    { id: 2, x: 80, y: 25, delay: 0.5 },
    { id: 3, x: 60, y: 70, delay: 1 },
    { id: 4, x: 25, y: 80, delay: 1.5 },
    { id: 5, x: 75, y: 85, delay: 2 },
  ];

  return (
    <LogoContainer
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <GlowRing />
      <Logo 
        src="/logo.png" 
        alt="KatGPT Logo"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <SparkleContainer>
        {sparkles.map((sparkle) => (
          <Sparkle
            key={sparkle.id}
            style={{
              top: `${sparkle.y}%`,
              left: `${sparkle.x}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </SparkleContainer>
    </LogoContainer>
  );
};

export default AnimatedLogo;

