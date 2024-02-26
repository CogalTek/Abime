/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dts1f7zum7i804h",
    "created": "2024-02-26 08:44:35.331Z",
    "updated": "2024-02-26 08:44:35.331Z",
    "name": "Documentation",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q3pcarph",
        "name": "etat_name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dts1f7zum7i804h");

  return dao.deleteCollection(collection);
})
