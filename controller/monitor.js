const axios = require('axios');

setInterval(() => {
    axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    .then(({data}) => {
        let time = new Date(data.utc_datetime);
        console.log("hora de Bogota");
        console.log(time.getHours(), time.getMinutes(), time.getSeconds());
    })
    .catch(error=>{
        console.log(error);
    });
}, 1000); //60000 = 1 minuto