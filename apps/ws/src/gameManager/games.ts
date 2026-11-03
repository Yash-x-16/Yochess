import WebSocket from "ws";
import { Chess } from "chess.js"; 
import { gameOver } from "./messages";


export class Games{ 
    public player1 : WebSocket 
    public player2 : WebSocket 
    public board :Chess 
    private moves:string[] 
    private startTime:Date 

    constructor (player1:WebSocket, player2:WebSocket) {
        this.player1 = player1 
        this.player2 = player2 
        this.board = new Chess()
        this.moves = [] 
        this.startTime = new Date()
    } 

    makeMove(socket:WebSocket , move:{
        from:string , 
        to :string
    })
    {       //validate the type of move using zod  
        if(this.board.move.length %2 === 0 && socket != this.player1){
            return 
        }
       
        if(this.board.move.length %2 === 1 && socket != this.player2){
            return 
        }
        try {

            this.board.move(move) 
        
        } catch (error) {
            return 
        }
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:gameOver ,  
                payload :{
                    winner : this.board.turn()==="w"? "black" :"white"   
                }
            }))
        } 

        if(this.board.moves.length % 2 === 0 ){
            this.player2.send(JSON.stringify({
                type:"move" , 
                payload : move
            }))
        
        }else{
            this.player1.send(JSON.stringify({
                type:"move" , 
                payload:move
            }))
        }
    }
}