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

const AudioDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const AudioPlayer = styled(motion.audio)`
  width: 100%;
  max-width: 400px;
  height: 60px;
  border-radius: 15px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 105, 180, 0.3);
  border: 3px solid #fff;
  
  &::-webkit-media-controls-panel {
    background: linear-gradient(45deg, #ff69b4, #ff1493);
    border-radius: 12px;
  }
`;

const AudioInfo = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 15px;
  margin-top: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #ff69b4;
  text-align: center;
`;

const AudioFileName = styled.p`
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Fredoka', cursive;
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

const AudioAnalysis = ({ isOpen, onClose, analysisData }) => {
  if (!isOpen) return null;

  const { audioUrl, fileName, sound_description, mood_analysis, health_concerns, recommendations, care_steps, loading, error } = analysisData;

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
          🎵 Cat Sound Analysis 🎵
        </Title>

        {audioUrl && (
          <AudioDisplay
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AudioPlayer
              controls
              src={audioUrl}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Your browser does not support the audio element.
            </AudioPlayer>
            {fileName && (
              <AudioInfo
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AudioFileName>🎵 {fileName}</AudioFileName>
              </AudioInfo>
            )}
          </AudioDisplay>
        )}

        {loading && (
          <LoadingContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🎧 Analyzing your cat's sounds...
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

        {!loading && !error && sound_description && (
          <AnalysisGrid>
            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle>🎵 Sound Description</CardTitle>
              <CardContent>{sound_description}</CardContent>
            </AnalysisCard>

            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CardTitle>😸 Mood Analysis</CardTitle>
              <CardContent>{mood_analysis}</CardContent>
            </AnalysisCard>

            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <CardTitle>🏥 Health Concerns</CardTitle>
              <CardContent>{health_concerns}</CardContent>
            </AnalysisCard>

            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CardTitle>💡 Recommendations</CardTitle>
              <CardContent>{recommendations}</CardContent>
            </AnalysisCard>

            <AnalysisCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ gridColumn: '1 / -1' }}
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

export default AudioAnalysis;
