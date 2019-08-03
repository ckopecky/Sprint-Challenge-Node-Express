const express = require("express");
const server = express();
const cors = require("cors");

const projectController = require('./controllers/projectController');
const actionController = require('./controllers/actionController');

const port = 5000;

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectController);
server.use('/api/actions', actionController);

server.get('/', (req, res) => {
    res.send({Success: "sanity check..."})
})

server.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});