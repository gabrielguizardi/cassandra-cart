const cassandra = require('cassandra-driver');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

function cassandraConnection(req, res, next) {
  const client = new cassandra.Client({
    contactPoints: ['172.17.0.2'],
    localDataCenter: 'datacenter1',
    keyspace: 'loja'
  });

  req.conn = client;

  next();
}

module.exports = {
  notFound,
  errorHandler,
  cassandraConnection
};
