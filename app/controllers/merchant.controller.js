const models = require("../../models/index");

function insertMerchant(req, res) {
  let data = req.body;
  models.Merchant.create(data);

  return res.send({ message: "Data has been Inserted", data: data });
}

async function listMerchant(req, res) {
  const result = await models.Merchant.findAll();
  if (result.length < 1) {
    return res.status(204).send({ message: "Data is Empty" });
  }
  return res.send({ message: "Data is found", data: result });
}

async function detailMerchant(req, res) {
  const result = await models.Merchant.findOne({ where: { id: req.params.id } });
  if (!result) {
    return res.status(204).send({ message: "Data is empty" });
  }
  return res.send({ message: "Data is found", data: result });
}

function updateMerchant(req, res) {
  let data = req.body;
  models.Merchant.update(data, { where: { id: req.params.id } });
  return res.send({ message: "Data has been Updated", data: req.body });
}

function deleteMerchant(req, res) {
  models.Merchant.destroy({ where: { id: req.params.id } });
  return res.send({ message: "Data has been Deleted" });
}

module.exports = {
  insertMerchant,
  listMerchant,
  detailMerchant,
  updateMerchant,
  deleteMerchant,
};
