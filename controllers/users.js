const User = require('../models/user');

const { parseDate } = require('../utils/helpers');

const getUsers = async (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users.map(({ username, _id }) => {
        return { username, _id }
      }));
    })
    .catch((err) => res.send(err));
}

const createUser = (req, res) => {
  User.create({ username: req.body.username })
    .then((user) => {
      const { username, _id } = user;
      res.send({ username, _id });
    })
    .catch((err) => {
      res.send(err);
    });
}

const getLogs = (req, res) => {
  const { id } = req.params;
  let { from = 0, to = '9999-12-25', limit = Infinity } = req.query;
  User.find({ _id: id })
    .lean()
    .populate({
      path: 'logs',
      select: '-_id description date duration',
      options: { limit: limit < Infinity && limit },
    })
    .then(([ user ]) => {
      const log = user.logs.filter((log, i) => {
        return new Date(from) <= log.date && log.date <= new Date(to);
      }).map((item) => { 
        return { ...item, date: parseDate(item.date) };
      })
      const result = { _id: user._id, username: user.username, log, count: log.length };
      result.from = new Date(from).getFullYear() > 1969 ? parseDate(from) : undefined;
      result.to = new Date(to).getFullYear() !== 9999 ? parseDate(to) : undefined;
      res.send(result);
    })    
    .catch((err) => console.log(err));
}

module.exports = { getUsers, createUser, getLogs }