const models = require("../../models/index");

function insertProduct(req, res) {
  let data = req.body;
  models.Product.create(data);

  return res.send({ message: "Data has been Inserted", data: data });
}

async function listProduct(req, res) {
  const result = await models.Product.findAll();
  if (result.length < 1) {
    return res.status(204).send({ message: "Data is Empty" });
  }
  return res.send({ message: "Data is found", data: result });
}

async function detailProduct(req, res) {
  const result = await models.Product.findOne({ where: { id: req.params.id } });
  if (!result) {
    return res.status(204).send({ message: "Data is empty" });
  }
  return res.send({ message: "Data is found", data: result });
}

function updateProduct(req, res) {
  let data = req.body;
  models.Product.update(data, { where: { id: req.params.id } });
  return res.send({ message: "Data has been Updated", data: req.body });
}

function deleteProduct(req, res) {
  models.Product.destroy({ where: { id: req.params.id } });
  return res.send({ message: "Data has been Deleted" });
}

module.exports = {
  insertProduct,
  listProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
};
