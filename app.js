const app = require("express")();
const { Worker } = require("worker_threads");
let counter = 0;
app.get("/", (req, res) => {
  counter++;
  res.status(200).json({ counter });
});

app.get("/heavy", (req, res) => {
  const worker = new Worker("./worker.js");
  worker.on("message", (data) => {
    res.status(200).json({ total: data });
  });
});
app.listen(5000, () => {
  console.log(`server is running`);
});
