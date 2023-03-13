const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();
const { readFileSync } = require('fs');

const app = express();

const target_URL = 'http://localhost:3000';

app.use(createProxyMiddleware({
    target: target_URL,
    changeOrigin: true,
    selfHandleResponse: true,
}));

if(process.env.CERTIFICATE_PATH) {
  const options = {
    key: readFileSync(path.join(process.env.CERTIFICATE_PATH, 'privkey.pem')),
    cert: readFileSync(path.join(process.env.CERTIFICATE_PATH, 'fullchain.pem')),
  };
  
  const server = https.createServer(options, app);
  
  // Start the server and listen on port 443
  server.listen(443, () => {
    console.log('HTTPS server listening on port 443');
  });
}
