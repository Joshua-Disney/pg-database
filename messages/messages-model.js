const db = require("../database/dbconfig.js");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove
};

function insert(message) {
  return db("messages")
    .insert(message, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
function find() {
  return db("messages");
}
function findBy(filter) {
  return db("messages").where(filter);
}
function findById(id) {
  return db("messages")
    .where({ id })
    .first();
}
function update(id, changed) {
  return db("messages")
    .where({ id })
    .update(changed);
}
function remove(id) {
  return db("messages")
    .where({ id })
    .del();
}
