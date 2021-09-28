const axios = require('axios');
const shell = require('shelljs');
const PATH = process.cwd();
let connections_amount = 0;
let api_time;
let my_time;
var offset;
let gaps_amount = 0;

function berkeleysAverage(gaps_list) {
    let avg_gap = 0;
    for (let i = 0; i < gaps_list; i++) {
        avg_gap += gaps_list[i].desfase;
    }
    let final_avg = avg_gap / gaps_list.length;
    my_time.setSeconds(api_time.getSeconds() - final_avg);
    let adjusts_list = [];
    for (let i = 0; i < gaps_list; i++) {
        const adjust_object = { id: gaps_list[i].id, adjustment: (my_time - (api_time + gaps_list[i])) }
        adjusts_list.push();
    }
    return adjusts_list;
}

function initTimeRunner() {
    console.log('me iniciaron xd');
    setInterval(() => {
        my_time.setSeconds(my_time.getSeconds() + 1);
    }, 1000);
}

var instancesList = []
const sendTime = (socket) => {
    connections_amount++;
    socket.on("Hello", (msg) => {
        console.log(msg);
    });

    setInterval(() => {
        axios.get("http://worldtimeapi.org/api/timezone/America/Bogota")
            .then(({ data }) => {
                api_time = new Date(data.utc_datetime);
                if (!my_time) {
                    my_time = new Date(data.datetime);
                    initTimeRunner();
                }
                offset = data.utc_offset;
                socket.emit("timeServer", {
                    time: api_time,
                    format: "UTC",
                    offset: offset
                });
            })
            .catch(error => {
                console.log("Error en api");
            });
    }, 5000); //5s

    socket.on("desfase", (message) => {
        gaps_amount++;
        instancesList.push(message);
        if (gaps_amount == connections_amount) {
            let adjusts_list = berkeleysAverage(instancesList);
            console.log(instancesList)
            for (let i = 0; i < adjusts_list.length; i++) {
                const io = require('../controller/io').io();
                io.to(adjusts_list[i].id).emit("ajuste", adjusts_list[i].adjustment);
            }
            gaps_amount = 0;
            instancesList = [];
        }
    });
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