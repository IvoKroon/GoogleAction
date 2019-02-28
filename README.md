# Test action for the Google Home
This file is created to test the development for a Google action.

## Usage
I use a Firebase Function and Firebase Firestore as database.

```
const db = function() {
  var admin = require("firebase-admin");
  var serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "YOUR LINK HERE"
  });
  admin.firestore().settings({ timestampsInSnapshots: true });
  var db = admin.firestore();
  return db;
};

module.exports = db;

```

Start with 
```
npm install
```

