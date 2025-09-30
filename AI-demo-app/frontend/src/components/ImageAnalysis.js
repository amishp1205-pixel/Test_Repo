import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const AnalysisContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 30px;
  width: 100%;
  max-width: 1000px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  margin-top: 20px;
  position: relative;
`;

const Title = styled(motion.h2)`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 105, 180, 0.6),
    0 0 30px rgba(255, 20, 147, 0.4);
  letter-spacing: 2px;
`;

const ImageDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const CatImage = styled(motion.img)`
  max-width: 100%;
  max-height: 400px;
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 105, 180, 0.3);
  border: 3px solid #fff;
  object-fit: cover;
`;

const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const AnalysisCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #ff69b4;
`;

const CardTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
  font-family: 'Fredoka', cursive;
`;

const CardContent = styled.div`
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
  font-family: 'Fredoka', cursive;
  white-space: pre-line;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.6);
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #fff;
  font-size: 1.2rem;
  font-family: 'Fredoka', cursive;
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 20px;
  color: #ff4444;
  font-family: 'Fredoka', cursive;
  text-align: center;
`;

const ImageAnalysis = ({ isOpen, onClose, analysisData }) => {
  if (!isOpen) return null;

  const { image, mood, health_observations, recommendations, care_steps, loading, error } = analysisData;

  return (
    <AnimatePresence>
      <AnalysisContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <CloseButton
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </CloseButton>

        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🐱 Cat Analysis Report 🐱
        </Title>

        {image && (
          <ImageDisplay
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CatImage
              src={image}
              alt="Cat being analyzed"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </ImageDisplay>
        )}

        {loading && (
          <LoadingContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🔍 Analyzing your cat's mood and health...
          </LoadingContainer>
        )}

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </ErrorMessage>
        )}

        {!loading && !error && mood && (
          <AnalysisGrid>
            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle>😸 Current Mood</CardTitle>
              <CardContent>{mood}</CardContent>
            </AnalysisCard>

            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CardTitle>🏥 Health Observations</CardTitle>
              <CardContent>{health_observations}</CardContent>
            </AnalysisCard>

            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <CardTitle>💡 Recommendations</CardTitle>
              <CardContent>{recommendations}</CardContent>
            </AnalysisCard>

            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CardTitle>📋 Care Steps</CardTitle>
              <CardContent>{care_steps}</CardContent>
            </AnalysisCard>
          </AnalysisGrid>
        )}
      </AnalysisContainer>
    </AnimatePresence>
  );
};

export default ImageAnalysis;
