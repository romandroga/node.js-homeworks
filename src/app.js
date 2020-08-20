const server = require("./server");


server(process.env.PORT, () => {
  console.log(`Server is alive on port ${process.env.PORT}`);
})

