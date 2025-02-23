/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // remove field
  collection.fields.removeById("file383471497")

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text383471497",
    "max": 0,
    "min": 0,
    "name": "picture",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file383471497",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "picture",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // remove field
  collection.fields.removeById("text383471497")

  return app.save(collection)
})
