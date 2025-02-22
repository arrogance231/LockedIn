/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_896219203")

  // remove field
  collection.fields.removeById("number2735487308")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "json3986902180",
    "maxSize": 0,
    "name": "completed_events",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_896219203")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number2735487308",
    "max": null,
    "min": null,
    "name": "events_completed",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("json3986902180")

  return app.save(collection)
})
