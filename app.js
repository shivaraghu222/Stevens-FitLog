import * as users from "./data/user.js";
async function main() {
    try {
        await users.get("abcdeaed346d0a92d7e49840"); 
    } catch(e) {
        console.log("Should have caught error: Error: Invalid id: abcdeaed346d0a92d7e49840");
    }
}

main();
