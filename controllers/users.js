const User = require('../models/user');

const { parseDate } = require('../utils/helpers');

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
      // filter log according to from and to - couldn't get it to work within .populate
      const log = user.logs.filter((log, i) => {
        return new Date(from) <= log.date && log.date <= new Date(to);
      });
      // build result to send to client
      const result = { _id: user._id, username: user.username, log, count: log.length };
      result.from = new Date(from).getFullYear() > 1969 && parseDate(from);
      result.to = new Date(to).getFullYear() !== 9999 && parseDate(to);
      res.send(result);
    })    
    .catch((err) => console.log(err));
}

module.exports = { createUser, getLogs }