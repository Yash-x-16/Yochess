import { WebSocketServer } from "ws";
import { gameManager } from "./gameManager/gameManager.js";

const wss = new WebSocketServer({port:8080}) 

const gM = new gameManager() 

wss.on("connection",(socket , req)=>{ 
    gM.addUser(socket)

    socket.on("close",()=>{
        gM.removeUser(socket)
    })
})



wss.on("close",()=>{
    console.log("connection closed") ; 
})


wss.on("error",(e)=>{
    console.log("error in websocket server ",e) ; 
}) 


console.log("yash from ws")