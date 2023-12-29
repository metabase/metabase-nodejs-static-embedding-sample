const jwt = require("jsonwebtoken");
const express = require('express');
const app = express();
const port = 8080;

const METABASE_EMBEDDING_SECRET = process.env.METABASE_EMBEDDING_SECRET;
const METABASE_SITE_URL = process.env.METABASE_SITE_URL || 'http://localhost:3000';
const METABASE_EMBED_DASHBOARD_ID= parseInt(process.env.METABASE_EMBED_DASHBOARD_ID);

app.get('/', (req, res) => {
  const payload = {
    resource: { dashboard: METABASE_EMBED_DASHBOARD_ID },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_EMBEDDING_SECRET);

  const iframeUrl = new URL("/embed/dashboard/" + token, METABASE_SITE_URL);
  iframeUrl.hash = "bordered=true&titled=true";
  res.send(
    `<iframe src="${iframeUrl}" frameborder="0" width="1280" height="1000" allowtransparency></iframe>`
  );

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
