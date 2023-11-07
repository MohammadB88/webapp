const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const { response } = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");

const configuration = new Configuration({
    organization: "org-N2293Mp3NctevcuCfH1iBtU5",
    apiKey: "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",
    // apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Say this is a test",
//   max_tokens: 7,
//   temperature: 0,
// });


// async function callAPI(){
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: "Say this is a test",
    //     max_tokens: 7,
    //     temperature: 0,
    //   });
    // console.log(response.data.choices[0].text)
// }

// callAPI()


const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req, res) => {
    const { message, currentModel } = req.body;
    console.log(message, "message")
    console.log(currentModel, "currentModel")
    const response = await openai.createCompletion({
        model: `${currentModel}`, //`${currentModel}`, //"text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
    // console.log(response.data.choices[0].text)
    // console.log(response.data)
    res.json({
        // data: response.data
        // data: message,
        message: response.data.choices[0].text,
    })
});

app.get('/models', async (req, res) => {
    const response = await openai.listEngines();
    console.log(response)
    res.json({
        models: response.data
    })
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
});