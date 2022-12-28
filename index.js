//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
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-3yEwguW0LVvw4M810VtPGnO8",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

//create a simple express api that calls the function above
const app = express();
const port = 3080;

app.use(bodyParser.json());
app.use(cors()); //allow send message from domains to domains

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  //   console.log(message);
  const response = await openai.createCompletion({
    model: `${currentModel}`,//"text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    // data: message,
    message: response.data.choices[0].text,
  });
  console.log(response.data.choices[0].text);
});

app.get('/models', async(req,res) => {
    const response = await openai.listEngines();
    // console.log(response.data.data);
    res.json({
        models: response.data.data
    })
})

app.listen(port, () => {
  console.log("App Listening at Port");
});
