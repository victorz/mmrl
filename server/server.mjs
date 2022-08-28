import express from "express";

const app = express();
const port = 3000;

app.get("/:id", async (req, res) => {
  console.log("requesting data...");
  const trackerResponse = await fetch(
    `https://api.tracker.gg/api/v2/rocket-league/standard/profile/steam/${req.params.id}`
  );

  const data = await trackerResponse.json();

  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.json(data);

  console.log(`${JSON.stringify(data).substring(0, 24)}...`);
});

app.listen(port, () => {
  console.log(`Tracker.gg relay listening on port ${port}`);
});
