const { Router } = require('express');
const {createNewinstance} = require('../controller/monitor');

const router = Router();

//aqui van los servicios

router.get('/instance', createNewinstance);

module.exports = router;