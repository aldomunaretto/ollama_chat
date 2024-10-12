FROM ollama/ollama:latest 

RUN nohup bash -c "ollama serve &" && sleep 5 && ollama pull llama3.2