const axios = require('axios');

var time = "vacio"
var offset;

setInterval(() => {
    axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    .then(({data}) => {
        time = new Date(data.utc_datetime);
        offset = data.utc_offset;
        //console.log(time.getUTCHours());
        // console.log("hora de Bogota");
        // console.log(time.getHours(), time.getMinutes(), time.getSeconds());
    })
    .catch(error=>{
        console.log(error);
    });
}, 1000); //60000 = 1 minuto


const sendTime = (socket) => {

   socket.on("Hello", (msg)=>{
       console.log(msg);
   });

   setInterval(()=>{
        //broadcast
        socket.emit("timeServer", {
            time: time,
            format: "UTC",
            offset: offset
        });

    }, 1500);

    socket.on("desface", (message)=>{
        console.log(message, "esto es el desface")
    });
}
module.exports = {
    sendTime
};