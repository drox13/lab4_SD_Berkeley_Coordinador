const axios = require('axios');
const shell = require('shelljs');
const PATH = process.cwd();
let connections_amount = 0;

var api_time;
let new_time = 'tiempo base para coordinar';
var offset;

setInterval(() => {
    axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    .then(({data}) => {
        api_time = new Date(data.utc_datetime);
        offset = data.utc_offset;
    })
    .catch(error=>{
        //console.log(error);
        console.log("Error en api");
    });

}, 1000); //60000 = 1 minuto

function berkeleysAverage (gaps_list) {
   // let api_time = 0; //AQUÍ TOCA SACAR EL TIEMPO DE LA API XD
    //let local_gap_time = (time - api_time)/1000; //AQUÍ EL DESFASE DEL COORDINADOR
    
    let avg_gap = 0; // AQUÍ VAMOS A CALCULAR EL PROMEDIO DE TODOS LOS DESFASES
    for(let i = 0; i < gaps_list; i++) {
        avg_gap += gaps_list[i].desfase;
    }
    //avg_gap += local_gap_time; //SE INCLUYE EL DESFASE DEL COORDINADOR, TODO ESTÁ EN SEGUNDOS
    let final_avg = avg_gap/(gaps_list.length); // SE DIVIDE EN LA CANTIDAD DE INSTANCIAS
    new_time = api_time - final_avg; //SE AJUSTA EL TIEMPO DEL COORDINADOR CON final_avg
    //let adjusts_list = []; //acá vamos a guardar los ajustes para las demás instancias
    for(let i = 0; i < gaps_list; i++) {
        let temp = api_time - gaps_list[i].desfase; //aca vamos a guardar el tiempo que tenia la instancia
        adjustment = new_time - temp // se calcula el cade para la intacia implicada
         // to individual socketid (private message)
        io.to(gaps_list[i].id).emit("ajuste", adjustment); //aca estamos enviando a cada instancia el ajuste
        const adjust_object = {id: gaps_list[i].id, adjustment: adjustment } // acá vamos a calcular esos ajustes para cada instancia, y añadimos su respectivo ID a cada ajuste
        //adjusts_list.push(); // vamos agretando cada desajuste con su id a la lista
    }
    //return adjusts_list; // aquí va la lista de objetos así [{id,desajuste}, {id,desajuste}, {id,desajuste}...]
}

var instancesList = []
const sendTime = (socket) => {

   socket.on("Hello", (msg)=>{
       console.log(msg);
   });

   setInterval(()=>{
        socket.broadcast.emit("timeServer", {
            time: api_time,
            format: "UTC",
            offset: offset
        });
    }, 5000);

    socket.on("desfase", (message)=>{
        console.log(message, "esto es el desfase")
        instancesList.push(message);
    });

    berkeleysAverage(instancesList);
}

var numberInstance = 4;
const createNewinstance = (req, res) => {
	try {
		//let numberInstance = fs.readFileSync(PATH + '/docker/counter.tmp', 'utf8');
		// circularList.addNode(new Node(`instancia${numberInstance}`));
		//circularList.showList();
		shell.exec(PATH + `/docker/newInstance.sh ${numberInstance}`);
		//fs.writeFileSync(PATH + '/docker/counter.tmp', numberInstance)
		res.send({
            msg: 'New instance created',
            numberInstance: numberInstance,
            ipIntancia: `119.18.0.${numberInstance}`,
            port: `5000`
        });
        numberInstance++
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
    sendTime,
    createNewinstance
};