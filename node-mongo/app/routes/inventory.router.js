module.exports = function (app) {
  var books = require("../controllers/inventory.controller.js");

  app.post("/api/books", books.createInventory);
  app.get("/api/book/:id", books.getInventory);
  app.get("/api/books", books.inventories);
  app.put("/api/books", books.updateInventory);
  app.delete("/api/book/:id", books.deleteInventory);
};
