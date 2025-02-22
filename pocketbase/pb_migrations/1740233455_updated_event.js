/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // update field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2524325754",
    "hidden": false,
    "id": "relation1542800728",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "organized_by",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // update field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2524325754",
    "hidden": false,
    "id": "relation1542800728",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "field",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
