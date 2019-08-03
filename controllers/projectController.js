const express = require('express');
const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

const sendUserError = (status, message, res) =>{
    res.status(status).json({Error: message});
    return;
}

const getProjects = (req, res) => {
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
};

const getProjectById = (req, res) =>{
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
};

const postProject = (req, res) =>{
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
};

const deleteProject = (req, res) =>{
    const { id } = req.params;
    projectModel
        .remove(id)
        .then(response =>{
            if(!response){
                sendUserError(400, "This project could not be removed, possibly due to it being open in another program or folder")
            }
            res.status(204).json({Success: "This Project has been successfully removed"})
        })
        .catch(err =>{
            sendUserError(500, "There was an error in removing this project", res);
        });
};

const updateProject = (req, res) =>{
    const { id } = req.params;
    const { name, description } = req.body;

    projectModel
        .get(id)
        .then(project =>{
            if(!project){
                sendUserError(404, "The specified Project could not be found", res);
            }
            else{
                if(!name || !description){
                    sendUserError(400, "Name and Description are required", res);
                }
                projectModel
                    .update(id, { name, description })
                    ,then(updated =>{
                        res.status(200).json(updated)
                    })
                    .catch(err =>{
                        sendUserError(500, "There was an error in updating information", res);
                    })

            }
        });
}

const getProjectActions = (req, res) =>{
    const { id } = req.params;
    const { project_id, description, notes, completed  } = req.body;
   
    projectModel
        .getProjectActions(id)
            .then(result =>{
                if (result.length > 0){
                    res.json(result);
                }
                else{
                    sendUserError(404, "Project Action is not found", res);
                }
            })
            .catch(err =>{
                sendUserError(500, `There was an error in retrieving #${id}'s actions.`, res)
            });
};

router.route('/')
    .get(getProjects)
    .post(postProject);
router.route("/:id")
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject);
router.route("/:id/actions")
    .get(getProjectActions)


module.exports = router;