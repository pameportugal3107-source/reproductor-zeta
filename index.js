const express = require('express');
const yts = require('yt-search');

const app = express();

app.use(express.json());

app.post('/api/alexa', async (req, res) => {
try {
const requestType = req.body?.request?.type;

```
if (requestType === 'LaunchRequest') {
  return res.json({
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Bienvenido a Reproductor Zeta. Dime qué canción quieres buscar."
      },
      shouldEndSession: false
    }
  });
}

const intent = req.body?.request?.intent;

if (intent && intent.name === 'PlayVideoIntent') {
  const query = intent.slots?.videoQuery?.value || '';

  console.log('BUSCANDO:', query);

  const result = await yts(query);

  if (!result.videos || result.videos.length === 0) {
    return res.json({
      version: "1.0",
      response: {
        outputSpeech: {
          type: "PlainText",
          text: `No encontré resultados para ${query}`
        },
        shouldEndSession: true
      }
    });
  }

  const video = result.videos[0];

  console.log('ENCONTRADO:', video.title);

  return res.json({
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: `Encontré ${video.title}`
      },
      shouldEndSession: true
    }
  });
}

return res.json({
  version: "1.0",
  response: {
    outputSpeech: {
      type: "PlainText",
      text: "No entendí la solicitud."
    },
    shouldEndSession: true
  }
});
```

} catch (err) {
console.error(err);

```
return res.json({
  version: "1.0",
  response: {
    outputSpeech: {
      type: "PlainText",
      text: "Ocurrió un error buscando en YouTube."
    },
    shouldEndSession: true
  }
});
```

}
});

app.get('/', (req, res) => {
res.send('Reproductor Zeta funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Servidor iniciado en puerto ${PORT}`);
});
