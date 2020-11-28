const express = require("express");
const body = require("body-parser");
const morgan = require("morgan");

const http = require("http");
const path = require("path");

/* Application configuration */
const app = (() => {
  /* Express instance */
  const app = express();

  /* Logging setup */
  app.use( morgan("dev") );

  /* Body parsing setup */
  app.use( body.json() );

  /* Resources serving */
  app.use( express.static(path.join(__dirname, 'public')) );

  /* View engine */
  app.set('view engine', 'ejs');
  app.set('views', 'views');

  return app;
})();

/* Routing config */

// Dev routes
const DevRoutes = require("./routes/dev");
app.use("/dev", DevRoutes);

// Default fallback
app.use((req, res) => {
  res.send("Salut Jason!");
});

/* Main routine */
const getLANAddress = () => {
  return Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])[0];
}

const server = http.createServer(app);
console.log("RPI Home Audio v0.1");
server.listen(667, getLANAddress(), () => {
  const addr = server.address();
  console.log("# LAN:   http://" + getLANAddress() + ":" + addr.port);
  console.log("# Local: http://127.0.0.1:" + addr.port);
});