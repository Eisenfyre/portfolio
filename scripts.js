const express = require('express');
const app = express();
const port = 5500;

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.listen(port, () => {
  console.log("Your server is now running. Your port number is: ", port);
})
