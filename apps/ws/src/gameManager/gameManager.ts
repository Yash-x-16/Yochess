import WebSocket from "ws"

export class gameManager {
   //@ts-ignore
    private games :Game[] 
    //@ts-ignore
    private pendingUser : WebSocket ;  
    private users:WebSocket[]
   
    constructor() {
        this.games = [] 
        this.users=[]
    } 


    addUser (   socket:WebSocket){
        this.users.push(socket)
    }

    removeUser (   socket:WebSocket){
        this.users.filter(x =>x!=socket) 
    }

    private handleMessage (socket:WebSocket){

    }
}