const server = require("./server");

server(process.env.PORT, (err) => {
  if (err) {
    console.log("Error on listen :", err);
    process.exit(1);
  }
  console.log(`Server is alive on port ${process.env.PORT}`);
});
