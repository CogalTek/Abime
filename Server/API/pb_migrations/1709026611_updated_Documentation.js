/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dts1f7zum7i804h")

  collection.listRule = "@request.auth.id != \"\""
  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dts1f7zum7i804h")

  collection.listRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
})