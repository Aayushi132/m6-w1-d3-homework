const mongoose = require("mongoose");
// mongoose.set("useFindAndModify", false);
const Book = mongoose.model("Books");

exports.createInventory = (req, res) => {
  const inventory = new Book({
    prodname: req.body.prodname,
    author: req.body.author,
  });

  // Save an Inventory in MongoDB
  inventory
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail!",
        error: err.message,
      });
    });
};

exports.getInventory = (req, res) => {
  Book.findById(req.params.id)
    .select("-__v")
    .then((inventory) => {
      res.status(200).json(inventory);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Inventory not found with id " + req.params.id,
          error: err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Inventory with id " + req.params.id,
        error: err,
      });
    });
};

exports.inventories = (req, res) => {
  Book.find()
    .select("-__v")
    .then((inventoryInfos) => {
      res.status(200).json(inventoryInfos);
      console.log("inventoryInfos", inventoryInfos);
    })
    .catch((error) => {
      // log on console
      console.log(error);

      res.status(500).json({
        message: "Error!",
        error: error,
      });
    });
};

exports.deleteInventory = (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .select("-__v-_id")
    .then((inventory) => {
      if (!inventory) {
        res.status(404).json({
          message: "No inventory found with id = " + req.params.id,
          error: "404",
        });
      }
      res.status(200).json({});
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error -> Can't delete inventory with id = " + req.params.id,
        error: err.message,
      });
    });
};

exports.updateInventory = (req, res) => {
  //  Find inventory and update it
  Book.findByIdAndUpdate(
    req.body._id,
    {
      prodname: req.body.prodname,
      author: req.body.author,
    },
    { new: false }
  )
    .select("-__v")
    .then((inventory) => {
      if (!inventory) {
        return res.status(404).send({
          message:
            "Error -> Can't update an inventory with id = " + req.params.id,
          error: "Not Found!",
        });
      }
      res.status(200).json(inventory);
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          "Error -> Can't update an inventory with id = " + req.params.id,
        error: err.message,
      });
    });
};
