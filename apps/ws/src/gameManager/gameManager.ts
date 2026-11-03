import WebSocket from "ws"
import { INIT_GAME } from "./messages.js";
import { Games } from "./game.js";
export class gameManager {
   //@ts-ignore
    private games :Game[] 
    private pendingUser : WebSocket | null;  
    private users:WebSocket[]
   
    constructor() {
        this.games = [] 
        this.users=[] 
        this.pendingUser = null
    } 


    addUser (   socket:WebSocket){
        this.users.push(socket) 
        this.handleMessage(socket) ; 
    }

    removeUser (   socket:WebSocket){
        this.users.filter(x =>x!=socket) 
    }

    private handleMessage (socket:WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString()) 
            
            if(message.type===INIT_GAME){
                if(this.pendingUser){
                    const Game = new Games(socket , this.pendingUser) ;  
                    this.games.push(Game) ; 
                    this.pendingUser = null
                }else{
                     this.pendingUser = socket
                }
            }
        })
    }


}