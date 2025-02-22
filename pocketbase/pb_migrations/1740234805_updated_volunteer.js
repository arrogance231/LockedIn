/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_896219203")

  // update collection data
  unmarshal({
    "name": "volunteers"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_896219203")

  // update collection data
  unmarshal({
    "name": "volunteer"
  }, collection)

  return app.save(collection)
})
