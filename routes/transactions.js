/**
 * @dev Importing database schemas from ./database/index.js
 */
const { Users, Items, Transactions } = require('../database');
const { Types } = require('mongoose');

/**
 * @dev This function will GET and return all transactions associated with the given user_id
 * @param {user_id} req user_id is the user from which you want to retrieve transaction data for
 * @param {*} res On successful GET a 200 status code will be sent
 */
const getTransactions = async (req, res) => {

  let user = req.query.user_id;
  let count = Number(req.query.count) || 5;
  let page = Number(req.query.page) || 0;
  let sort = { updatedAt : -1 };

  const response = {
    user : user,
    page : page,
    count : count,
    results : [],
  }
  let fetchTransactions = await Transactions.find({ $or : [
    { 'from.user_id' : new Types.ObjectId(req.query.user_id) },
    { 'to.user_id' : new Types.ObjectId(req.query.user_id) }
  ] })
    .limit(count)
    .skip(page * count)
    .sort(sort)

  response.results = fetchTransactions;

  res.status(200).send(response);

}

/**
 * @dev This function will add a new transaction to the database
 * @param {from_user_id} req from_user_id is the ID for the user initiating the transaction
 * @param {from_item_id} req from_item_id is the ID for the item that from_user_id is offering
 * @param {to_user_id} req to_user_id is the ID for the user that from_user_id is initiating the transaction with
 * @param {to_item_id} req to_item_id is the ID for the item that to_user_id is offering in the transaction
 * @param {*} res on successful POST a 201 status code will be sent. On error a 422 code will be sent
 */
const addTransaction = async (req, res) => {

  const newTransaction = new Transactions({
    from : {
      user_id : new Types.ObjectId(req.query.from_user_id),
      item_id : new Types.ObjectId(req.query.from_item_id),
    },
    to : {
      user_id : new Types.ObjectId(req.query.to_user_id),
      item_id : new Types.ObjectId(req.query.to_item_id),
    }
  })

  newTransaction.save()
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(422))

}

/**
 * @dev This function will mark the given transactiion_id a "complete"
 * @param {transaction_id} req this is the ID for the transaction that will be marked "complete"
 * @param {*} res on successful update a status code of 204 will be returned. On error code 422 will be sent
 */
const completeTransaction = async (req, res) => {

  Transactions.updateOne({ _id: new Types.ObjectId(req.params.transaction_id) },
  { $set :
    { status : "completed" }
  })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(422))

}

/**
 * @dev This function will mark the given transactiion_id a "cancelled"
 * @param {transaction_id} req this is the ID for the transaction that will be marked "cancelled"
 * @param {*} res on successful update a status code of 204 will be returned. On error code 422 will be sent
 */
const cancelTransaction = async (req, res) => {

  Transactions.updateOne({ _id: new Types.ObjectId(req.params.transaction_id) },
  { $set :
    { status : "cancelled" }
  })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(422))

}

module.exports = {
  getTransactions,
  addTransaction,
  completeTransaction,
  cancelTransaction
}