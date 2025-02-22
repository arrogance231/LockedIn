/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
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
      "volunteers",
      "organization"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
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
})
