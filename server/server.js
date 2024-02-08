const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

router.route;

server.patch("/items/markdone/:id", (req, res) => {
  const toUpdate = { done: true, finishedAt: Date.now() };
  const idToUpdate = parseInt(req.params.id);
  router.db.get("items").find({ id: idToUpdate }).assign(toUpdate).write();
  res.send();
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
