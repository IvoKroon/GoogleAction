const db = require('./firebaseInit')();

const invoiceRef = db.collection("facturen");

const getLastAddedRecord = function() {
  return new Promise(function(resolve, reject) {
    invoiceRef
      .orderBy("created_at", "desc")
      .limit(1)
      .get()
      .then(function(prevSnapshot) {
        prevSnapshot.docs.map(doc => {
          const data = doc.data();
          resolve(data);
        });
      });
  });
};

const getLastAddedRecordId = function() {
  return new Promise(function(resolve, reject) {
    invoiceRef
      .orderBy("created_at", "desc")
      .limit(1)
      .get()
      .then(function(prevSnapshot) {
        prevSnapshot.docs.map(doc => {
          const id = doc.id;
          resolve(id);
        });
      });
  });
};

const addTaskToLatest = function(newItem) {
  return new Promise(function(resolve, reject) {
    invoiceRef
      .orderBy("created_at", "desc")
      .limit(1)
      .get()
      .then(function(prevSnapshot) {

        // console.log(prevSnapshot.docs.data());
        prevSnapshot.docs.map(doc => {
          const id = doc.id;
          let tasks = [];
          //   let hasTasks
          //   console.log("DATA - ");
          //   console.log(snapshot.data().tasks);
          if (doc.data().tasks) {
            // console.log("JUP");
            tasks = doc.data().tasks;
            tasks.push(newItem);
          } else {
            tasks.push(newItem);
          }
          invoiceRef
            .doc(id)
            .update({ tasks })
            .then(data => {
              console.log("UPDATED");
              resolve(true);
            })
            .catch(err => {
              console.log(err);
            });
          //   resolve(id);
        });
      });
  });
};

const test = function() {
  console.log("test");
};
const testSecond = function() {
  console.log("TEST SECOND");
};

module.exports = {
  addTaskToLatest,
  getLastAddedRecord,
  getLastAddedRecordId,
  test,
  testSecond
};
