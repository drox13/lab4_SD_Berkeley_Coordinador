const axios = require('axios');
let connections_amount = 0;
var time = "vacio"
let my_time = 'tiempo del coordinador';
var offset;

setInterval(() => {
    axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    .then(({data}) => {
        time = new Date(data.utc_datetime);
        offset = data.utc_offset;
    })
    .catch(error=>{
        console.log(error);
    });
}, 1000); //60000 = 1 minuto

function berkeleysAverage (gaps_list) {
    let api_time = 0; //AQUÍ TOCA SACAR EL TIEMPO DE LA API XD
    let local_gap_time = (time - api_time)/1000; //AQUÍ EL DESFASE DEL COORDINADOR
    let avg_gap = 0; // AQUÍ VAMOS A CALCULAR EL PROMEDIO DE TODOS LOS DESFASES (INCLUIDO EL DEL COORDINADOR)
    for(let i = 0; i < gaps_list; i++) {
        avg_gap += gaps_list[i].desfase;
    }
    avg_gap += local_gap_time; //SE INCLUYE EL DESFASE DEL COORDINADOR, TODO ESTÁ EN SEGUNDOS
    let final_avg = avg_gap/(gaps_list.length+1); // SE DIVIDE EN LA CANTIDAD DE INSTANCIAS + 1 (POR EL COORDINADOR)
    my_time += final_avg; //SE AJUSTA EL TIEMPO DEL COORDINADOR CON final_avg
    let adjusts_list = []; //acá vamos a guardar los ajustes para las demás instancias
    for(let i = 0; i < gaps_list; i++) {
        const adjust_object = {id: gaps_list[i].id, adjustment: (my_time - (api_time + gaps_list[i])) } // acá vamos a calcular esos ajustes para cada instancia, y añadimos su respectivo ID a cada ajuste
        adjusts_list.push(); // vamos agretando cada desajuste con su id a la lista
    }
    return adjusts_list; // aquí va la lista de objetos así [{id,desajuste}, {id,desajuste}, {id,desajuste}...]
}


const sendTime = (socket) => {

   socket.on("Hello", (msg)=>{
       console.log(msg);
   });

   setInterval(()=>{
        socket.broadcast.emit("timeServer", {
            time: time,
            format: "UTC",
            offset: offset
        });
    }, 5000);

    socket.on("desface", (message)=>{
        console.log(message, "esto es el desface")
    });
}
module.exports = {
    sendTime
};