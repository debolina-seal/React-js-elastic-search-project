const express = require("express");
const bodyParser = require("body-parser");
const elasticClient = require("./elastic-client");
require("express-async-errors");

const app = express();

app.use(bodyParser.json());
//in order to avoid CORS error
app.get("/", (req, res) => {
  res.redirect("http://localhost:3001/");
});

const securedRouter = express.Router();

securedRouter.post("/create-post", async (req, res) => {
  const result = await elasticClient.index({
    index: "Document",
    document: {
      title: req.body.title,
      type: req.body.type,
      author: req.body.author,
      content: req.body.content,
      date: req.body.date,
    },
  });

  res.send(result);
});

securedRouter.delete("/remove-post", async (req, res) => {
  const result = await elasticClient.delete({
    index: "Document",
    id: req.query.id,
  });

  res.json(result);
});

securedRouter.get("/search", async (req, res) => {
  const result = await elasticClient.search({
    index: "Document",
    query: {
      bool: {
        must: [
          {
            match: {
              title: {
                query: req.query.query,
                fuzziness: 2,
              },
            },
          },
        ],
        filter: {
          bool: {
            should: [
              { match: { type: "Shoes" } },
              { match: { type: "Electronics" } },
            ],
          },
        },
      },
    },
  });

  res.json(result);
});

securedRouter.get("/posts", async (req, res) => {
  const result = await elasticClient.search({
    index: "Document",
    query: { match_all: {} },
  });

  res.send(result);
});

app.use(securedRouter);
app.listen(8080);
