const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
const port = process.env.PORT || 8080;
const app = express();

app.use(serveStatic(path.join(__dirname, "dist"), 
{
   maxAge: 7200000
}
));

app.listen(port);

console.log("%s Server started...", new Date().toISOString());
