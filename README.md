# Test action for the Google Home
This file is created to test the development for a Google action.

## Usage
I use a Firebase Function and Firebase Firestore as database.
To connect to database use this file.
Also add th serviceAccountKey which you can find on firebase.

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

Install the modules
```
npm install
```

