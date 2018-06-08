const express = require("express");
const cors = require("cors");

const actionModel = require('./data/helpers/actionModel');
const projectModel = require('./data/helpers/projectModel');

const server = express();

const port = 5000;
const sendUserError = (status, message, res) =>{
    res.status(status).json({Error: message});
    return;
}




server.use(express.json());
server.use(cors());


server.get('/api/projects', (req, res) => {
    projectModel
        .get()
        .then(result =>{
            if(result.length===0){
                sendUserError(404, "Projects Not Found", res);
            }
            res.status(200).json(result);
        })
        .catch(err =>{
            sendUserError(500, "Projects' information could not be retrieved", res);
        });
});

server.get('/api/actions', (req, res) =>{
    actionModel
        .get()
        .then(response =>{
            if(response.length===0){
                sendUserError(404, "Actions Not Found", res);
            }
            res.status(200).json(response)
        })
        .catch(err =>{
            sendUserError(500, "Actions' information could not be retrieved", res);
        });
});

server.get('/api/projects/:id', (req, res) =>{
    const { id } = req.params;
    projectModel
        .get(id)
        .then(project =>{
            if(!project){
                sendUserError(404, "The requested project could not be found", res);
            }
            res.status(200).json(project);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in retrieving project", res)
        });
});

server.get('/api/actions/:id', (req, res) =>{
    const { id } = req.params;
    actionModel
        .get(id)
        .then(action =>{
            if(!action){
                sendUserError(404, "The requested action could not be found", res);
            }
            res.status(200).json(action);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in retrieving action", res);
        });
});

server.post('/api/projects', (req, res) =>{
    const { name, description } = req.body;
    if(!name || !description){
        sendUserError(400, "Post requires a name and a description", res)
    }
    projectModel
        .insert({ name, description })
            .then(newProject =>{
                res.status(201).json(newProject);
            })
            .catch(err =>{
                sendUserError(500, "There was an error in saving project", res);
            });
});

server.post('/api/actions', (req, res) =>{
    const { project_id, description, notes, completed } = req.body;
    if(!project_id || !description){
        sendUserError(400, "Project ID and Description must be included", res);
    }
    actionModel
        .insert({ project_id, description, notes, completed }) 
        .then(newAction =>{
            res.status(201).json(newAction);
        })
        .catch(err =>{
            sendUserError(500, "There was an error in saving action" ,res)
        });
});


server.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});