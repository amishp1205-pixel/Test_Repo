from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="Czech Republic History", description="A simple API showing Czech Republic history")

@app.get("/", response_class=HTMLResponse)
async def get_czech_history():
    """
    Returns a paragraph about Czech Republic history
    """
    history_paragraph = """
    <html>
    <head>
        <title>Czech Republic History</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 50px auto; 
                padding: 20px;
                line-height: 1.6;
            }
            h1 { color: #2c3e50; }
            .history-content { 
                background-color: #f8f9fa; 
                padding: 20px; 
                border-radius: 8px; 
                border-left: 4px solid #e74c3c;
            }
        </style>
    </head>
    <body>
        <h1>Czech Republic History</h1>
        <div class="history-content">
            <p>The Czech Republic, located in Central Europe, has a rich and complex history that spans over a millennium. 
            The region was first inhabited by Celtic tribes, followed by Germanic tribes, and then Slavic peoples who 
            arrived in the 6th century. The medieval Kingdom of Bohemia emerged as a powerful state under the Přemyslid 
            dynasty, reaching its peak during the reign of Charles IV (1346-1378), who made Prague the capital of the 
            Holy Roman Empire. The 15th century brought the Hussite Wars, a religious conflict that challenged Catholic 
            authority and established Czech religious independence. Following the Battle of White Mountain in 1620, the 
            Czech lands came under Habsburg rule for nearly 300 years. The 20th century saw the creation of 
            Czechoslovakia in 1918 after World War I, the Nazi occupation during World War II, and communist rule 
            from 1948 to 1989. The peaceful Velvet Revolution in 1989 ended communist rule, and in 1993, Czechoslovakia 
            peacefully split into the Czech Republic and Slovakia. Today, the Czech Republic is a democratic, 
            prosperous member of the European Union, known for its beautiful architecture, rich cultural heritage, 
            and contributions to science, literature, and the arts.</p>
        </div>
    </body>
    </html>
    """
    return history_paragraph

@app.get("/api/history")
async def get_czech_history_json():
    """
    Returns Czech Republic history as JSON
    """
    return {
        "country": "Czech Republic",
        "history": "The Czech Republic, located in Central Europe, has a rich and complex history that spans over a millennium. The region was first inhabited by Celtic tribes, followed by Germanic tribes, and then Slavic peoples who arrived in the 6th century. The medieval Kingdom of Bohemia emerged as a powerful state under the Přemyslid dynasty, reaching its peak during the reign of Charles IV (1346-1378), who made Prague the capital of the Holy Roman Empire. The 15th century brought the Hussite Wars, a religious conflict that challenged Catholic authority and established Czech religious independence. Following the Battle of White Mountain in 1620, the Czech lands came under Habsburg rule for nearly 300 years. The 20th century saw the creation of Czechoslovakia in 1918 after World War I, the Nazi occupation during World War II, and communist rule from 1948 to 1989. The peaceful Velvet Revolution in 1989 ended communist rule, and in 1993, Czechoslovakia peacefully split into the Czech Republic and Slovakia. Today, the Czech Republic is a democratic, prosperous member of the European Union, known for its beautiful architecture, rich cultural heritage, and contributions to science, literature, and the arts."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
