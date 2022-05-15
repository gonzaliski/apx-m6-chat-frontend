import firebase from "firebase"
const API_BASE_URL = "http://localhost:3000"
const app = firebase.initializeApp({
    apiKey:"VRP0w8RRtyt2fGLNFtJuYz0EkCpVHv9tVTI8WBbv",
    dataBaseURL: "https://firestore-m6-default-rtdb.firebaseio.com/",
    projectId:"firestore-m6",
    authDomain:"firestore-m6.firebaseapp.com"
})

const database = firebase.database();

const username = prompt("Please Tell Us Your Name");
document.getElementById("message-form").addEventListener("submit", sendMessage);

// const fetchChat = database.ref("/chatrooms/1234/messages/");    
// fetchChat.on("child_added", function (snapshot) {
//     const messages = snapshot.val();
//     console.log(messages);
    
//     const message = `<li class=${
//       username === messages.username ? "sent" : "receive"
//     }><span>${messages.username}: </span>${messages.message}</li>`;
//     // append the message on the page
//     document.getElementById("messages").innerHTML += message;
//   });

function sendMessage(e){
    e.preventDefault();

    // get values to be submitted
  //  const timestamp = Date.now();
    const messageInput = document.getElementById("message-input") as HTMLInputElement ;
    const message = messageInput.value;
    console.log("mensaje:",message, "de:",username);
    
    document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  
  // create db collection and send in the data
  fetch(API_BASE_URL + "/messages", {
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
      body:JSON.stringify({
        message:message,
        username:username,
      })
  })
}

function conectarAlChatroom(){
    fetch(API_BASE_URL + "/chatroom",{
        method:"post",
    })
        .then((res)=>{
            return res.json()
        })
            .then((data)=>{
                const chatroomRef = database.ref("/chatrooms/" + data.id);
                chatroomRef.on("value",(snapshot)=>{
                    const valor = snapshot.val();
                    console.log(valor)
                    document.querySelector(".root").innerHTML=JSON.stringify(valor)
                })
            })
}

(function(){
    const button = document.querySelector(".button__connect")
    button.addEventListener("click", conectarAlChatroom)
})();