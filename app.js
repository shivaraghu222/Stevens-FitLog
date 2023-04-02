import express from 'express';

import * as users from "./data/user.js";
import * as workout from "./data/workout.js";
import * as fitnessProgress from "./data/fitnessProgress.js";

const app = express();
app.use(express.static('html'));

app.listen(8080, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:8080');
});

async function main() {
    try {
        const first_user = await users.get("64276ac7f55567f1578959c5"); 
        console.log(first_user);
    } catch(e) {
        console.log(e);
    }

    try {
      const map = await workout.getWeights("64276ac7f55567f1578959c5");
      console.log(map);
  } catch(e) {
      console.log(e);
  }
}

main();
