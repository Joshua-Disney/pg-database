const db = require("../database/dbconfig.js");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove
};
function insert(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
function find() {
  return db("users");
}
function findBy(filter) {
  return db("users").where(filter);
}
function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
function update(id, changed) {
  return db("users")
    .where({ id })
    .update(changed);
}
function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
