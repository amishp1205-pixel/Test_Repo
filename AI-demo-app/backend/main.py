from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from typing import Optional
import uvicorn
from dotenv import load_dotenv
import base64

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="KatGPT API", description="Cat Q&A API powered by GPT-4o", version="1.0.0")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str
    success: bool

class ImageAnalysisResponse(BaseModel):
    mood: str
    health_observations: str
    recommendations: str
    care_steps: str
    success: bool

class AudioAnalysisResponse(BaseModel):
    sound_description: str
    mood_analysis: str
    health_concerns: str
    recommendations: str
    care_steps: str
    success: bool

@app.get("/")
async def root():
    return {"message": "🐱 KatGPT API is running! Ask me anything about cats!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "KatGPT API"}

@app.post("/ask", response_model=AnswerResponse)
async def ask_cat_question(request: QuestionRequest):
    try:
        if not os.getenv("OPENAI_API_KEY"):
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        # Create a cat-focused prompt
        cat_prompt = f"""You are KatGPT, an expert on all things cats! You're enthusiastic, knowledgeable, and love sharing cat facts and advice. 
        
        User question: {request.question}
        
        Please provide a helpful, informative, and engaging response about cats. If the question isn't directly about cats, try to relate it back to cats in a fun way. 
        Use cat emojis and be enthusiastic! Keep responses concise but informative (2-3 paragraphs max)."""
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": cat_prompt},
                {"role": "user", "content": request.question}
            ],
            max_tokens=300,
            temperature=0.7
        )
        
        answer = response.choices[0].message.content
        
        return AnswerResponse(answer=answer, success=True)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

@app.get("/cat-stats")
async def get_cat_stats():
    """Get cat statistics data for charts"""
    try:
        # Sample cat statistics data
        global_stats = [
            {"Year": "2015", "Estimated_Global_Cats": 600000000, "Estimated_Pet_Cats": 300000000, "Number_of_Households": 1500000000, "Cats_per_Household": 0.20, "Cats_in_Shelters_Intake": 2000000, "Cats_Adopted_From_Shelters": 1200000, "Adoption_Fee_USD": 50},
            {"Year": "2016", "Estimated_Global_Cats": 620000000, "Estimated_Pet_Cats": 310000000, "Number_of_Households": 1520000000, "Cats_per_Household": 0.205, "Cats_in_Shelters_Intake": 2100000, "Cats_Adopted_From_Shelters": 1300000, "Adoption_Fee_USD": 55},
            {"Year": "2017", "Estimated_Global_Cats": 640000000, "Estimated_Pet_Cats": 320000000, "Number_of_Households": 1540000000, "Cats_per_Household": 0.208, "Cats_in_Shelters_Intake": 2200000, "Cats_Adopted_From_Shelters": 1350000, "Adoption_Fee_USD": 60},
            {"Year": "2018", "Estimated_Global_Cats": 660000000, "Estimated_Pet_Cats": 330000000, "Number_of_Households": 1560000000, "Cats_per_Household": 0.212, "Cats_in_Shelters_Intake": 2300000, "Cats_Adopted_From_Shelters": 1400000, "Adoption_Fee_USD": 65},
            {"Year": "2019", "Estimated_Global_Cats": 680000000, "Estimated_Pet_Cats": 340000000, "Number_of_Households": 1580000000, "Cats_per_Household": 0.215, "Cats_in_Shelters_Intake": 2400000, "Cats_Adopted_From_Shelters": 1450000, "Adoption_Fee_USD": 70},
            {"Year": "2020", "Estimated_Global_Cats": 700000000, "Estimated_Pet_Cats": 350000000, "Number_of_Households": 1600000000, "Cats_per_Household": 0.219, "Cats_in_Shelters_Intake": 2500000, "Cats_Adopted_From_Shelters": 1500000, "Adoption_Fee_USD": 75},
            {"Year": "2021", "Estimated_Global_Cats": 720000000, "Estimated_Pet_Cats": 360000000, "Number_of_Households": 1620000000, "Cats_per_Household": 0.222, "Cats_in_Shelters_Intake": 2600000, "Cats_Adopted_From_Shelters": 1550000, "Adoption_Fee_USD": 80},
            {"Year": "2022", "Estimated_Global_Cats": 740000000, "Estimated_Pet_Cats": 370000000, "Number_of_Households": 1640000000, "Cats_per_Household": 0.226, "Cats_in_Shelters_Intake": 2700000, "Cats_Adopted_From_Shelters": 1600000, "Adoption_Fee_USD": 90},
            {"Year": "2023", "Estimated_Global_Cats": 760000000, "Estimated_Pet_Cats": 380000000, "Number_of_Households": 1660000000, "Cats_per_Household": 0.229, "Cats_in_Shelters_Intake": 2800000, "Cats_Adopted_From_Shelters": 1650000, "Adoption_Fee_USD": 100},
            {"Year": "2024", "Estimated_Global_Cats": 780000000, "Estimated_Pet_Cats": 390000000, "Number_of_Households": 1680000000, "Cats_per_Household": 0.232, "Cats_in_Shelters_Intake": 2900000, "Cats_Adopted_From_Shelters": 1700000, "Adoption_Fee_USD": 120},
            {"Year": "2025", "Estimated_Global_Cats": 800000000, "Estimated_Pet_Cats": 400000000, "Number_of_Households": 1700000000, "Cats_per_Household": 0.235, "Cats_in_Shelters_Intake": 3000000, "Cats_Adopted_From_Shelters": 1750000, "Adoption_Fee_USD": 150}
        ]
        
        country_stats = [
            {"Country": "United States", "Estimated_Cats_millions": 74.1},
            {"Country": "China", "Estimated_Cats_millions": 53.1},
            {"Country": "Russia", "Estimated_Cats_millions": 23.1},
            {"Country": "Germany", "Estimated_Cats_millions": 15.2},
            {"Country": "France", "Estimated_Cats_millions": 14.9},
            {"Country": "Brazil", "Estimated_Cats_millions": 22.1},
            {"Country": "Australia", "Estimated_Cats_millions": 5.3},
            {"Country": "United Kingdom", "Estimated_Cats_millions": 12.0}
        ]
        
        return {
            "global_stats": global_stats,
            "country_stats": country_stats,
            "success": True
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching cat stats: {str(e)}")

@app.post("/analyze-cat-image", response_model=ImageAnalysisResponse)
async def analyze_cat_image(file: UploadFile = File(...)):
    """Analyze a cat image and provide insights about the cat's mood, health, and care recommendations"""
    try:
        if not os.getenv("OPENAI_API_KEY"):
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and encode the image
        image_data = await file.read()
        image_base64 = base64.b64encode(image_data).decode('utf-8')
        
        # Create a detailed prompt for cat analysis
        analysis_prompt = """You are KatGPT, an expert cat behaviorist and veterinarian assistant. Analyze this cat image and provide insights in the following format:

1. MOOD: How is the cat feeling? (happy, relaxed, stressed, playful, etc.)
2. HEALTH_OBSERVATIONS: What do you notice about the cat's physical condition, posture, eyes, fur, etc.?
3. RECOMMENDATIONS: What could the pet owner do to make this cat feel better or happier?
4. CARE_STEPS: Specific actionable steps the owner should take (numbered list)

Be enthusiastic, use cat emojis, and provide practical, caring advice. Focus on the cat's wellbeing and happiness."""
        
        # Use GPT-4 Vision to analyze the image
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": analysis_prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{image_base64}",
                                "detail": "high"
                            }
                        }
                    ]
                }
            ],
            max_tokens=800,
            temperature=0.7
        )
        
        analysis_text = response.choices[0].message.content
        
        # Parse the response into structured format
        sections = analysis_text.split('\n\n')
        mood = "Happy and content! 😸"
        health_observations = "The cat appears to be in good spirits! 🐱"
        recommendations = "Continue providing love and care! ❤️"
        care_steps = "1. Keep showering with affection\n2. Maintain regular feeding schedule\n3. Provide enrichment activities"
        
        # Try to extract sections from the response
        for section in sections:
            if section.startswith('1. MOOD:'):
                mood = section.replace('1. MOOD:', '').strip()
            elif section.startswith('2. HEALTH_OBSERVATIONS:'):
                health_observations = section.replace('2. HEALTH_OBSERVATIONS:', '').strip()
            elif section.startswith('3. RECOMMENDATIONS:'):
                recommendations = section.replace('3. RECOMMENDATIONS:', '').strip()
            elif section.startswith('4. CARE_STEPS:'):
                care_steps = section.replace('4. CARE_STEPS:', '').strip()
        
        return ImageAnalysisResponse(
            mood=mood,
            health_observations=health_observations,
            recommendations=recommendations,
            care_steps=care_steps,
            success=True
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing image: {str(e)}")

@app.post("/analyze-cat-audio", response_model=AudioAnalysisResponse)
async def analyze_cat_audio(file: UploadFile = File(...)):
    """Analyze a cat audio file and provide insights about the cat's mood, health, and care recommendations"""
    try:
        if not os.getenv("OPENAI_API_KEY"):
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        # Validate file type
        if not file.content_type.startswith('audio/') and not file.filename.endswith(('.m4a', '.mp3', '.wav', '.ogg')):
            raise HTTPException(status_code=400, detail="File must be an audio file (m4a, mp3, wav, ogg)")
        
        # Read the audio file
        audio_data = await file.read()
        
        # Use OpenAI Whisper to transcribe the audio
        audio_file = client.audio.transcriptions.create(
            model="whisper-1",
            file=("audio.m4a", audio_data, "audio/m4a"),
            response_format="text"
        )
        
        transcription = audio_file
        
        # Use GPT-4 to analyze the transcribed cat sounds
        analysis_prompt = f"""You are KatGPT, an expert cat behaviorist and veterinarian assistant. Analyze this cat sound transcription and provide insights in the following format:

Cat Sound Transcription: "{transcription}"

Please provide analysis in this exact format:

1. SOUND_DESCRIPTION: Describe what type of cat sound this is (meow, purr, hiss, chirp, etc.) and its characteristics
2. MOOD_ANALYSIS: How is the cat feeling based on this sound? (happy, distressed, hungry, playful, etc.)
3. HEALTH_CONCERNS: Are there any potential health issues indicated by this sound?
4. RECOMMENDATIONS: What could the pet owner do to make this cat feel better or address the situation?
5. CARE_STEPS: Specific actionable steps the owner should take (numbered list)

Be enthusiastic, use cat emojis, and provide practical, caring advice. Focus on the cat's wellbeing and happiness."""
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": analysis_prompt}
            ],
            max_tokens=800,
            temperature=0.7
        )
        
        analysis_text = response.choices[0].message.content
        
        # Parse the response into structured format
        sections = analysis_text.split('\n\n')
        sound_description = "Cat vocalization detected! 🐱"
        mood_analysis = "The cat seems to be communicating! 😸"
        health_concerns = "No immediate health concerns detected."
        recommendations = "Continue monitoring and providing care! ❤️"
        care_steps = "1. Monitor the cat's behavior\n2. Ensure basic needs are met\n3. Provide comfort and attention"
        
        # Try to extract sections from the response
        for section in sections:
            if section.startswith('1. SOUND_DESCRIPTION:'):
                sound_description = section.replace('1. SOUND_DESCRIPTION:', '').strip()
            elif section.startswith('2. MOOD_ANALYSIS:'):
                mood_analysis = section.replace('2. MOOD_ANALYSIS:', '').strip()
            elif section.startswith('3. HEALTH_CONCERNS:'):
                health_concerns = section.replace('3. HEALTH_CONCERNS:', '').strip()
            elif section.startswith('4. RECOMMENDATIONS:'):
                recommendations = section.replace('4. RECOMMENDATIONS:', '').strip()
            elif section.startswith('5. CARE_STEPS:'):
                care_steps = section.replace('5. CARE_STEPS:', '').strip()
        
        return AudioAnalysisResponse(
            sound_description=sound_description,
            mood_analysis=mood_analysis,
            health_concerns=health_concerns,
            recommendations=recommendations,
            care_steps=care_steps,
            success=True
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing audio: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
