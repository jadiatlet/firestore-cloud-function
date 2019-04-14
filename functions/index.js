const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/contacts", async (req, res) => {
  // firebaseHelper.firestore.createNewDocument(db, contactsCollection, req.body);
  const contacts = await db.collection("contacts").doc();
  contacts.set({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age
  });
  await db
    .collection("contacts")
    // .doc()
    .get()
    .then(snapshoot => {
      let datas = [];
      snapshoot.forEach(doc => {
        datas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      res.send(datas);
      return datas;
    })
    .catch(err => {
      return res.status(500).send(err.toString);
    });
});

app.get("/contacts", async (req, res) => {
  await db
    .collection("contacts")
    // .doc()
    .get()
    .then(snapshoot => {
      let datas = [];
      snapshoot.forEach(doc => {
        datas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      res.send(datas);
      return datas;
    })
    .catch(err => {
      return res.status(500).send(err.toString);
    });
});

app.patch("/contacts/:id", async (req, res) => {
  // firebaseHelper.firestore.createNewDocument(db, contactsCollection, req.body);
  const contacts = await db.collection("contacts").doc(req.params.id);
  contacts.set({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age
  });
  await db
    .collection("contacts")
    // .doc()
    .get()
    .then(snapshoot => {
      let datas = [];
      snapshoot.forEach(doc => {
        datas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      res.send(datas);
      return datas;
    })
    .catch(err => {
      return res.status(500).send(err.toString);
    });
});

app.delete("/contacts/:id", async (req, res) => {
  await db
    .collection("contacts")
    .doc(req.params.id)
    .delete();
  await db
    .collection("contacts")
    // .doc()
    .get()
    .then(snapshoot => {
      let datas = [];
      snapshoot.forEach(doc => {
        datas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      res.send(datas);
      return datas;
    })
    .catch(err => {
      return res.status(500).send(err.toString);
    });
});

exports.webApi = functions.https.onRequest(app);
