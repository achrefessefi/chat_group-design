
var db= require('../database/database')
var socketIo = require('socket.io')



function socketIO(server) {
    const io = socketIo(server);
  
    io.on("connection",(socket)=>{
        console.log("user connected with socket id"+socket.id);
        // Extract the username from the query parameters
    const username = socket.handshake.query.username || 'Anonymous';

    // Broadcast "new user is connected" message to other users
    socket.broadcast.emit("msg", JSON.stringify({ username: username, message: ' joined the chat' }));
        
       
       
       
      //  afficher le msg pour tout le monde et le stocker dans la bdd
        socket.on("send-msg",async (data)=>{
            console.log(data);
            io.emit("msg",data)
            const { Chat }= await db()
            const content = data
            await Chat.create({ content })   
          })
      //user is Typing 
        socket.on("uTyping",(data)=>{
          socket.broadcast.emit("msg-typing",data)
        })

        socket.on('disconnect',()=>{
          io.emit('msg', JSON.stringify({ username: username, message: ' left the chat' }));
          });

         
      })
  
    return io;
  }











  async function showChats(req,res,next){

    res.render('chat',{ title: 'My chats'})
    }
   
async function findAllChats(req,res,next){
const { Chat }= await db();
const chats = await Chat.findAll();
res.render('chats',{ title: 'My chats', chats: chats})
}

async function createChat(req,res,next){
    const { Chat }= await db()
    const { content }= req.body
    await Chat.create({ content })
    res.redirect('/chats')
}
module.exports= { socketIO, showChats, findAllChats, createChat }
