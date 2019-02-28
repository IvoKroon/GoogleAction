"use strict";

const { dialogflow } = require("actions-on-google");
const functions = require("firebase-functions");
// const admin = require("firebase-admin");
const app = dialogflow({ debug: true });

const { addTaskToLatest } = require("./requests");

// admin.initializeApp();

// const db = admin.firestore();
// db.settings({ timestampsInSnapshots: true });
// const collectionRef = db.collection("facturen");

// app.intent("test_ngrok", conv => {
//   return conv.close("HUH!");
// });

app.intent("add_task_to_invoice - yes", conv => {
  // CONTEXT = add_task_to_invoice-followup
  const parameters = conv.contexts.get("add_task_to_invoice-followup")
    .parameters;
  let { title } = parameters;
  return addTaskToLatest(title).then(data => {
    if (data) {
      conv.close(`De taak ${title} is toegevoegd!`);
    } else {
      conv.close("Er is iets fout gegaan!");
    }
  });
});

// UPDATE INVOICE
app.intent("Create_Invoice - custom - yes", conv => {
  const parameters = conv.contexts.get("create_invoice-custom-followup")
    .parameters;
  let { title } = parameters;
  title.charAt(0).toUpperCase();

  // return context;ßl1

  // return conv.close(`De factuur ????? is toegevoegd! -  Context ${context}`);
  return collectionRef
    .add({
      title,
      created_at: Date.now()
    })
    .then(data => {
      console.log("The data is: ", data);
      conv.ask(`De factuur ${title} is toegevoegd`);
    })
    .catch(error => {
      console.log("error");
      conv.close(`There is an error!`);
    });
});

exports.actionsOracle = functions.https.onRequest(app);
