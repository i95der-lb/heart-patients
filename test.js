
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Date?", function(date) {
        let res = new Date(date).toISOString()
        console.log(res)
        rl.close();
});
