const { app } = require("./server");

app.listen(process.env.PORT, () => {
  console.log(`Server is alive on port ${process.env.PORT}`);
});
