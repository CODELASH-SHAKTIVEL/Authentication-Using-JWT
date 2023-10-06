import http from "http";
import gfName from "./features.js";
import { gfName2 } from "./features.js";
import { gfName3 } from "./features.js";
import { genenratePercent } from "./features.js";

console.log(gfName);
console.log(gfName2);
console.log(gfName3);
console.log(genenratePercent()); // u can export function also in the node .js
// dont callback parentthesis in function


// just for explaination 
// const server = http.createServer((req,res)=>{
//     console.log(req.url); // will print whatever u  will type in url section 
//     res.end("<h1>First Backend</h1>");
// });


// ************************************ // 

// WE ARE DOING SERVER ROUTING NOT FONTEND ROUTING (MANUAL ROUTING )

const server = http.createServer((req,res)=>{
    if (req.url ==="/"){
     res.end(`<h1>HOME PAGE ${genenratePercent()}</h1>`)
    }
    else if (req.url ==="/about"){
    res.end("<h1>ABOUT PAGE</h1>")
   }
    else if (req.url ==="/contact"){
    res.end("<h1>CONTACT PAGE</h1>")
   }
    else if (req.url ==="/HELP"){
    res.end("<h1>HELP ME OUT</h1>")
   }
   else{
    res.end("<h1>Page is not working </h1>")
   }
});


// ************************************//

// Will show in nodemon terminal as soon as the server starts
server.listen(5000, () => {
    console.log("server is working"); 
}); 
