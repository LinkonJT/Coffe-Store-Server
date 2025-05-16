const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors());
app.use(express.json());


// এই কোডটি Express.js ব্যবহার করে একটি সার্ভার তৈরি করছে। 

// app.get('/', ...) অংশটি মূলত রুট ("/") এ কোনো ক্লায়েন্ট (যেমন ব্রাউজার) অনুরোধ করলে "coffee server is getting hotter" পাঠিয়ে দেয়। 

// app.listen(port, ...) অংশটি সার্ভারটি নির্দিষ্ট port-এ চালু করে এবং কনসোলে একটি বার্তা দেখায়: "Coffee server is running on port {port}"।

app.get('/', (req, res) => {
  res.send('coffee server is getting hotter')
});


app.listen(port, () => {
  console.log(`Coffee server is running on port ${port}`)
});



