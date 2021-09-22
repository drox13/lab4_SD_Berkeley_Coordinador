const axios = require('axios');

setInterval(() => {
    axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    .then(({data}) => {
        var time = new Date(data.datetime);
        console.log(data.datetime);
        console.log(time.getHours(), time.getMinutes(), time.getSeconds());
        console.log(time , "tiempo");
    })
    .catch(error=>{
        console.log(error);
      });
}, 1000); //60000 = 1 minuto


var timeApi = axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
    .then(({data}) => {
        var time = new Date(data.datetime);
        console.log(data.datetime);
        console.log(time.getHours(), time.getMinutes(), time.getSeconds())
    })
    .catch(error=>{
        console.log(error);
      });