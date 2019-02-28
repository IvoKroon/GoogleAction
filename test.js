// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");
const {
  addTaskToLatest,
  test,
  testSecond,
  getLastAddedRecord,
  getLastAddedRecordId
} = require("./requests");

// updateInvoiceTask();
// addInvoice();
test();
testSecond();
addTaskToLatest("new").then(data => console.log("melding", data));

getLastAddedRecordId().then(data => {
  console.log(data);
});

// getLastAddedRecord();

// function getLastAddedRecord(){
//   const collectionRef = db.collection("facturen");
//   collectionRef.orderBy('created_at', 'desc').limit(1).get().then(function(prevSnapshot){
//     prevSnapshot.docs.map(doc => {
//       console.log(doc.data());
//     })
//   })
// }

function updateInvoiceTask() {
  const collectionRef = db.collection("facturen");
  const id = "AXMqoGueSw2QPldGPy01";
  const newItem = "item";
  return collectionRef
    .doc(id)
    .get()
    .then(snapshot => {
      let tasks = [];
      //   let hasTasks
      console.log("DATA - ");
      console.log(snapshot.data().tasks);
      if (snapshot.data().tasks) {
        console.log("JUP");
        tasks = snapshot.data().tasks;
        tasks.push(newItem);
      } else {
        tasks.push(newItem);
      }
      collectionRef
        .doc(id)
        .update({ tasks })
        .then(data => {
          console.log("UPDATED");
          //   conv.ask(`Updated`);
        })
        .catch(err => {
          console.log(err);
        });
    });
}

function getInvoice() {
  var cityRef = db.collection("Facatures").doc("test");
  var getDoc = cityRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", doc.data());
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
}

function addInvoice(agent, { name }) {
  var docRef = db.collection("Facatures").doc("test");

  var setAda = docRef.set({
    first: name,
    last: "Lovelace",
    born: 1815
  });

  //   agent.add("Factuur added");
}
