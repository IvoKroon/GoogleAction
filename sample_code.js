"use strict";

const { dialogflow } = require("actions-on-google");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = dialogflow({ debug: true });

admin.initializeApp();

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
const collectionRef = db.collection("facturen");

// UPDATE INVOICE
function updateArray(id, newItem) {
  return collectionRef
    .doc(id)
    .get()
    .then(snapshot => {
      let tasks = [];
      //   let hasTasks
      if (snapshot.data().tasks) {
        tasks = snapshot.data().tasks;
        tasks.push(newItem);
      } else {
        tasks.push(newItem);
      }
      collectionRef
        .doc(id)
        .set({ tasks })
        .then(data => {
          conv.ask(`Updated`);
        });
    });
}

app.intent("add_invoice", (conv, { title }) => {
  return collectionRef
    .add({
      title
    })
    .then(data => {
      console.log("The data is: ", data);
      conv.ask(`De factuur is toegevoegd`);
    })
    .catch(error => {
      console.log("error");
      conv.close(`There is an error!`);
    });
});

app.intent("add_task_to_invoice_quiestion", (conv, { title }) => {
    conv.contexts.set(AppContexts.NUMBER, 1)
});

//ADD TASK TO INVOICE
app.intent("add_task_to_invoice", (conv, { title }) => {
  const id = "uDBZJeFrJAOIL19isrnN";
  return collectionRef
    .doc(id)
    .get()
    .then(snapshot => {
      const taskName = snapshot.data().title;
      let tasks = [];
      //   let hasTasks
      if (snapshot.data().tasks) {
        tasks = snapshot.data().tasks;
        tasks.push(title);
      } else {
        tasks.push(title);
      }
      return collectionRef
        .doc(id)
        .update({ tasks })
        .then(data => {
          conv.close(`De taak ${taskName} is toegevoegd aan ${title}`);
        })
        .catch(err => {
          conv.close(`Error cancel stuff`);
        });
    })
    .catch(err => {
      conv.close(`Error`);
    });
});

app.intent("add_planet", (conv, { name }) => {
  return collectionRef
    .add({
      first: name
    })
    .then(data => {
      console.log("The data is: ", data);
      conv.ask(`DATA ADDED OF ZO `);
    })
    .catch(error => {
      console.log("error");
      conv.ask(`ERROR`);
    });
});

app.intent("add_planet", (conv, { name }) => {
  return collectionRef
    .add({
      first: name
    })
    .then(data => {
      console.log("The data is: ", data);
      conv.ask(`DATA ADDED OF ZO `);
    })
    .catch(error => {
      console.log("error");
      conv.ask(`ERROR`);
    });
});

app.intent("planet", conv => {
  // const term = planet.toLowerCase();
  const termRef = collectionRef.doc(`test`);

  return termRef
    .get()
    .then(snapshot => {
      const { definition, word } = snapshot.data();
      conv.ask(
        `Here you go, ${word}, ${definition}. ` +
          `What else do you want to know?`
      );
    })
    .catch(e => {
      console.log("error:", e);
      conv.close("Sorry, try again and tell me another planet.");
    });
});

exports.actionsOracle = functions.https.onRequest(app);
