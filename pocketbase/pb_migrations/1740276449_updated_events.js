/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // remove field
  collection.fields.removeById("select105650625")

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text105650625",
    "max": 0,
    "min": 0,
    "name": "category",
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
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select105650625",
    "maxSelect": 1,
    "name": "category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Youth Education",
      "Disaster Response",
      "Public Health",
      "Coast Cleanup"
    ]
  }))

  // remove field
  collection.fields.removeById("text105650625")

  return app.save(collection)
})
