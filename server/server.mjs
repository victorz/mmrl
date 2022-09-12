import express from "express";

async function relay(url, res) {
  const r = await fetch(url);
  const { data: json } = await r.json();
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.json(json);
  console.log(`${JSON.stringify(json).substring(0, 24)}...`);
}

const app = express();
const port = 3000;

app.get("/profile/:platformId", (req, res) => {
  const { platformId } = req.params;
  relay(
    `https://api.tracker.gg/api/v2/rocket-league/standard/profile/steam/${platformId}`,
    res
  );
});

app.get("/mmr/:playerId", (req, res) => {
  const { playerId } = req.params;
  relay(
    `https://api.tracker.gg/api/v1/rocket-league/player-history/mmr/${playerId}`,
    res
  );
});

app.get("/distribution/:playlistId", (req, res) => {
  const { playlistId } = req.params;
  const { playlist } = req.query;
  relay(
    `https://api.tracker.gg/api/v1/rocket-league/distribution/${playlistId}${
      playlist ? `?playlist=${playlist}` : ""
    }`,
    res
  );
});

app.listen(port, () => {
  console.log(`tracker.gg relay listening on port ${port}`);
});
