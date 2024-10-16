# Ollama Chat

Este repositorio contiene una aplicación de chat que interactúa con la API de Ollama. La aplicación permite a los usuarios enviar mensajes y recibir respuestas generadas por el modelo de lenguaje de Ollama.

## Estructura del Proyecto

- `index.html`: Archivo HTML principal que contiene la estructura del chat.
- `styles.css`: Archivo CSS que define los estilos de la aplicación.
- `script.js`: Archivo JavaScript que maneja la lógica del chat y las llamadas a la API de Ollama.

## Personalización

Puedes personalizar el modelo de lenguaje utilizado en `script.js` cambiando el valor de la propiedad `model` en el cuerpo de la solicitud de la API.

```js
const body = {
    model: 'llama3.1', // Reemplaza con el modelo que estés usando en Ollama
    prompt: message,
    stream: false
};
```

## Enlaces de Interes
* Ollama
    * https://ollama.com/
    * https://github.com/ollama/ollama
    * https://hub.docker.com/r/ollama/ollama
* LM Studio
    * https://lmstudio.ai/
* AnythingLLM
    * https://anythingllm.com/
* Hugging Face
    * https://huggingface.co/
* Extensiones Visual Studio Code
    * Continue: https://www.continue.dev/
    * CodeGPT: https://codegpt.co/
 
## Otros Recursos
* Pinokio (Instalación de Aplicaciones de IA)
    * https://pinokio.computer/
* Invoke (Plataforma para modelos de generación de imagenes)
    * https://www.invoke.com/

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para contribuir a este proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
