let colorByLabel = {
  "red-ish": [],
  "green-ish": [],
  "blue-ish": [],
  "orange-ish": [],
  "yellow-ish": [],
  "pink-ish": [],
  "purple-ish": [],
  "brown-ish": [],
  "grey-ish": [],
};

function setup() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC69rRq7UQmma_1jijbxm5EC7wiiAZfsZg",
    authDomain: "color-classifier-18084.firebaseapp.com",
    databaseURL: "https://color-classifier-18084.firebaseio.com",
    projectId: "color-classifier-18084",
    storageBucket: "color-classifier-18084.appspot.com",
    messagingSenderId: "193168813606",
    appId: "1:193168813606:web:07dd195856f07d306100e7",
    measurementId: "G-0SH2LV3JX1",
  };
  firebase.initializeApp(config);
  database = firebase.database();

  //   authPromise = firebase.auth().signInAnonymously();

  createCanvas(400, 400);

  let ref = database.ref("colors");
  ref.once("value", gotData);
}

function gotData(results) {
  let data = results.val();

  // Processing the data
  let keys = Object.keys(data);
  console.log(keys.length);

  for (let key of keys) {
    let record = data[key];

    let col = color(record.r, record.g, record.b);
    colorByLabel[record.label].push(col);
  }

  console.log(colorByLabel);

  let blues = colorByLabel["green-ish"];
  let x = 0;
  let y = 0;

  for (let index = 0; index < blues.length; index++) {
    fill(blues[index]);
    rect(x, y, 50, 50);
    x += 50;
    if (x >= width) {
      x = 0;
      y += 50;
    }
  }

  // let uid_bycount = {};
  // let users = [];

  // for (let key of keys) {
  //   let record = data[key];
  //   let id = record.uid;

  //   if (!uid_bycount[id]) {
  //     uid_bycount[id] = 1;
  //     users.push(id);
  //   } else {
  //     uid_bycount[id]++;
  //   }
  // }

  // users.sort((a, b) => {
  //   return uid_bycount[a] - uid_bycount[b];
  // });

  // for (let id of users) {
  //   console.log(`user ${id} submitted ${uid_bycount[id]}`);
  // }

  // console.log(uid_bycount);
}
