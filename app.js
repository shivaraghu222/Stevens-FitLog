import * as users from "./data/user.js";
async function main() {


    try {
        const first_user = await users.get("64276ac7f55567f1578959c5"); 
        console.log(first_user);
    } catch(e) {
        console.log("Couldn't find user");
    }
}

main();
