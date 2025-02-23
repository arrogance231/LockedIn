/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number999795048",
    "max": null,
    "min": null,
    "name": "long",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number822707298",
    "max": null,
    "min": null,
    "name": "lang",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // remove field
  collection.fields.removeById("date2862495610")

  // remove field
  collection.fields.removeById("number999795048")

  // remove field
  collection.fields.removeById("number822707298")

  return app.save(collection)
})
