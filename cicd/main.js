const express = require("express");
const { exec } = require("child_process");

const app = express();

const PORT = 8081;

app.post("/update-github", (req, res) => {
  const script = exec("/bin/bash script.sh", (error, stdout, stderr) => {
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    if (error) console.log(`exec error: ${error}`);
  });
  return res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
