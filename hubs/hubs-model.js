const db = require("../database/dbconfig.js");

module.exports = {
  find,
  findBy,
  findById,
  findHubMessages,
  insert,
  update,
  remove
};
function insert(hub) {
  return db("hubs")
    .insert(hub, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
function find() {
  return db("hubs");
}
function findBy(filter) {
  return db("hubs").where(filter);
}
function findById(id) {
  return db("hubs")
    .where({ id })
    .first();
}
function findHubMessages(id) {
  return db("messages as m")
    .join("hubs as h", "m.hub_id", "h.id")
    .select("m.message", "h.name")
    .where({ "m.hub_id": id });
}

function update(id, changed) {
  return db("hubs")
    .where({ id })
    .update(changed);
}
function remove(id) {
  return db("hubs")
    .where({ id })
    .del();
}
