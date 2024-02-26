/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dts1f7zum7i804h")

  // remove
  collection.schema.removeField("oikfwnfi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wyx9va0h",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dts1f7zum7i804h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oikfwnfi",
    "name": "description",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("wyx9va0h")

  return dao.saveCollection(collection)
})
