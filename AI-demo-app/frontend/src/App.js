import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import AnimatedLogo from './components/AnimatedLogo';
import VideoBackground from './components/VideoBackground';
import Confetti from './components/Confetti';
import CatStats from './components/CatStats';
import ImageAnalysis from './components/ImageAnalysis';
import AudioAnalysis from './components/AudioAnalysis';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  padding: 20px;
`;

const LogoContainer = styled(motion.div)`
  margin-bottom: 30px;
  position: relative;
`;

const Title = styled(motion.h1)`
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.8),
    0 0 20px rgba(255, 105, 180, 0.6),
    0 0 30px rgba(255, 20, 147, 0.4);
  letter-spacing: 2px;
`;

const Subtitle = styled(motion.p)`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 40px;
  opacity: 0.9;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
`;

const ChatContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const QuestionInput = styled(motion.input)`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-family: 'Fredoka', cursive;
  outline: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:focus {
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.1),
      0 0 0 3px rgba(255, 105, 180, 0.3);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const AskButton = styled(motion.button)`
  padding: 15px 25px;
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Fredoka', cursive;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.6);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatsButton = styled(motion.button)`
  padding: 15px 25px;
  background: linear-gradient(45deg, #00bfff, #1e90ff);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Fredoka', cursive;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 191, 255, 0.6);
  }
`;

const UploadButton = styled(motion.button)`
  padding: 15px 25px;
  background: linear-gradient(45deg, #ff8c00, #ffa500);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Fredoka', cursive;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 140, 0, 0.6);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const AudioUploadButton = styled(motion.button)`
  padding: 15px 25px;
  background: linear-gradient(45deg, #32cd32, #00ff00);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Fredoka', cursive;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(50, 205, 50, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(50, 205, 50, 0.6);
  }
`;

const HiddenAudioInput = styled.input`
  display: none;
`;

const AnswerContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #ff69b4;
`;

const AnswerText = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-family: 'Fredoka', cursive;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #fff;
  font-size: 1.1rem;
`;

const LoadingDots = styled(motion.div)`
  display: inline-flex;
  gap: 5px;
  margin-left: 10px;
  
  span {
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 15px;
  padding: 15px;
  margin-top: 20px;
  color: #ff4444;
  font-family: 'Fredoka', cursive;
`;

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showImageAnalysis, setShowImageAnalysis] = useState(false);
  const [imageAnalysisData, setImageAnalysisData] = useState({
    image: null,
    mood: '',
    health_observations: '',
    recommendations: '',
    care_steps: '',
    loading: false,
    error: ''
  });
  const [showAudioAnalysis, setShowAudioAnalysis] = useState(false);
  const [audioAnalysisData, setAudioAnalysisData] = useState({
    audioUrl: null,
    fileName: '',
    sound_description: '',
    mood_analysis: '',
    health_concerns: '',
    recommendations: '',
    care_steps: '',
    loading: false,
    error: ''
  });

  const askQuestion = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setError('');
    setAnswer('');
    
    try {
      const response = await axios.post('/ask', {
        question: question.trim()
      });
      
      setAnswer(response.data.answer);
      // Trigger confetti celebration!
      setShowConfetti(true);
    } catch (err) {
      setError('Oops! Something went wrong. Make sure the backend is running and try again! 🐱');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      askQuestion();
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageAnalysisData(prev => ({
        ...prev,
        error: 'Please upload an image file (PNG, JPG, etc.)'
      }));
      setShowImageAnalysis(true);
      return;
    }

    // Create image URL for preview
    const imageUrl = URL.createObjectURL(file);

    // Update state with image and start loading
    setImageAnalysisData({
      image: imageUrl,
      mood: '',
      health_observations: '',
      recommendations: '',
      care_steps: '',
      loading: true,
      error: ''
    });
    setShowImageAnalysis(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Send to backend for analysis
      const response = await axios.post('/analyze-cat-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setImageAnalysisData(prev => ({
          ...prev,
          mood: response.data.mood,
          health_observations: response.data.health_observations,
          recommendations: response.data.recommendations,
          care_steps: response.data.care_steps,
          loading: false,
          error: ''
        }));
        // Trigger confetti for successful analysis!
        setShowConfetti(true);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      console.error('Error analyzing image:', err);
      setImageAnalysisData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to analyze image. Please try again! 🐱'
      }));
    }
  };

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['audio/m4a', 'audio/mp3', 'audio/wav', 'audio/ogg'];
    const validExtensions = ['.m4a', '.mp3', '.wav', '.ogg'];
    const isValidType = validTypes.includes(file.type) || validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!isValidType) {
      setAudioAnalysisData(prev => ({
        ...prev,
        error: 'Please upload an audio file (m4a, mp3, wav, ogg)'
      }));
      setShowAudioAnalysis(true);
      return;
    }

    // Create audio URL for preview
    const audioUrl = URL.createObjectURL(file);

    // Update state with audio and start loading
    setAudioAnalysisData({
      audioUrl: audioUrl,
      fileName: file.name,
      sound_description: '',
      mood_analysis: '',
      health_concerns: '',
      recommendations: '',
      care_steps: '',
      loading: true,
      error: ''
    });
    setShowAudioAnalysis(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Send to backend for analysis
      const response = await axios.post('/analyze-cat-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setAudioAnalysisData(prev => ({
          ...prev,
          sound_description: response.data.sound_description,
          mood_analysis: response.data.mood_analysis,
          health_concerns: response.data.health_concerns,
          recommendations: response.data.recommendations,
          care_steps: response.data.care_steps,
          loading: false,
          error: ''
        }));
        // Trigger confetti for successful analysis!
        setShowConfetti(true);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      console.error('Error analyzing audio:', err);
      setAudioAnalysisData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to analyze audio. Please try again! 🐱'
      }));
    }
  };

  return (
    <AppContainer>
      <VideoBackground />
      <LogoContainer
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <AnimatedLogo />
      </LogoContainer>

      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        🐱 KatGPT 🐱
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Ask Us anything about cats! I'm powered by AI 🚀
      </Subtitle>

      <ChatContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <InputContainer>
          <QuestionInput
            type="text"
            placeholder="What would you like to know about cats? 🐾"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            whileFocus={{ scale: 1.02 }}
          />
          <AskButton
            onClick={askQuestion}
            disabled={loading || !question.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Asking...' : 'Ask KatGPT!'}
          </AskButton>
          <StatsButton
            onClick={() => setShowStats(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 Cat Stats
          </StatsButton>
          <UploadButton
            onClick={() => document.getElementById('file-upload').click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📸 Upload Cat
          </UploadButton>
          <HiddenFileInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <AudioUploadButton
            onClick={() => document.getElementById('audio-upload').click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎵 Upload Audio
          </AudioUploadButton>
          <HiddenAudioInput
            id="audio-upload"
            type="file"
            accept="audio/m4a,audio/mp3,audio/wav,audio/ogg,.m4a,.mp3,.wav,.ogg"
            onChange={handleAudioUpload}
          />
        </InputContainer>

        <AnimatePresence>
          {loading && (
            <LoadingContainer
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              KatGPT is thinking
              <LoadingDots>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </LoadingDots>
            </LoadingContainer>
          )}

          {answer && (
            <AnswerContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnswerText>{answer}</AnswerText>
            </AnswerContainer>
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
        </AnimatePresence>
      </ChatContainer>
      
      <Confetti trigger={showConfetti} />
      
      <CatStats 
        isOpen={showStats} 
        onClose={() => setShowStats(false)} 
      />
      
      <ImageAnalysis 
        isOpen={showImageAnalysis} 
        onClose={() => setShowImageAnalysis(false)}
        analysisData={imageAnalysisData}
      />
      
      <AudioAnalysis 
        isOpen={showAudioAnalysis} 
        onClose={() => setShowAudioAnalysis(false)}
        analysisData={audioAnalysisData}
      />
    </AppContainer>
  );
}

export default App;
