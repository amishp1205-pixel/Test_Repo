import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const ConfettiPiece = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.color || '#ff69b4'};
`;

const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ffa0e6', '#ff91e7'];

const Confetti = ({ trigger }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (trigger) {
      createConfetti();
    }
  }, [trigger]);

  const createConfetti = () => {
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      });
    }
    setConfetti(pieces);

    // Clear confetti after animation
    setTimeout(() => {
      setConfetti([]);
    }, 3000);
  };

  return (
    <ConfettiContainer>
      <AnimatePresence>
        {confetti.map((piece) => (
          <ConfettiPiece
            key={piece.id}
            color={piece.color}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: 0,
              scale: 1,
            }}
            animate={{
              x: piece.x + (Math.random() - 0.5) * 200,
              y: window.innerHeight + 100,
              rotate: piece.rotation + 360 * 3,
              scale: [1, 1.2, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </ConfettiContainer>
  );
};

export default Confetti;

