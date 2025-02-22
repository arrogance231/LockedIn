/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("text715337560")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "select715337560",
    "maxSelect": 1,
    "name": "usertype",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "volunteer",
      "organization"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text715337560",
    "max": 0,
    "min": 0,
    "name": "usertype",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select715337560")

  return app.save(collection)
})
