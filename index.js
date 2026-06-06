const express = require('express');

const app = express();
app.use(express.json());

app.post('/api/alexa', (req, res) => {
  res.json({
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Hola, Reproductor Zeta está funcionando correctamente."
      },
      shouldEndSession: true
    }
  });
});

app.get('/', (req, res) => {
  res.send('Reproductor Zeta funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
