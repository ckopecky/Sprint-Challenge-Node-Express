const express = require('express');
const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error: message});
    return;
}

const getActions = (req, res) =>{
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
};

const getActionById = (req, res) =>{
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
};

const postAction = (req, res) =>{
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
};

const deleteAction = (req, res) =>{
    const { id } = req.params;
    actionModel
        .remove(id)
        .then(result =>{
            if(!result){
                sendUserError(400, "This action could not be removed, possibly due to it being open elsewhere");
            }
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing this action", res);
        });
};

const updateAction = (req, res) =>{
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;

    projectModel
        .get(id)
        .then(action =>{
            if(!action){
                sendUserError(404, "The specified Project could not be found", res);
            }
            else{
                if(!project_id || !description){
                    sendUserError(400, "Name and Description are required", res);
                }
                projectModel
                    .update(id, { project_id, description, notes, completed})
                    ,then(updatedAction =>{
                        res.status(200).json(updatedAction)
                    })
                    .catch(err =>{
                        sendUserError(500, "There was an error in updating information", res);
                    })

            }
        });
}

router.route('/')
    .get(getActions)
    .post(postAction);
router.route('/:id')
    .get(getActionById)
    .put(updateAction)
    .delete(deleteAction)



module.exports = router;