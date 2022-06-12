import Request from "../Request.js";
import Render from "../Render.js";

const req = new Request({ url: "test.json", method: "GET", type: "text/plain", res: "json", data: null });

// req.push((response) => {
//     console.log(response);
// });
req.pull((response) => {
    console.log(response)
})

Render("body", "test.json", {
    datatype: "text",
    id: "0",
    resolve: (response) => {
        Render("body", "test.json", {
            datatype: "text",
            id: "3",
            resolve: (response) => {

            },
            err: (response) => {
                console.log(response)
            }
        }, false)
    },
    err: (response) => {
        console.log(response)
    }
}, true)