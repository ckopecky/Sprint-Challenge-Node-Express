# E press and Node.js Sprint Challenge

##endpoints

##### Projects

* `name`: string, up to 128 characters long, required.
* `description`: string, up to 128 characters long, required.
* `completed`: boolean to indicate if the project has been completed, not required

##### Actions

* `project_id`: number, required, must be the id of an existing project.
* `description`: string, up to 128 characters long, required.
* `notes`: string, no size limit, not required. Used to record additional notes ore requirements to complete the action.
* `completed`: boolean to indicate if the action has been completed, not required


method      | *endpoint*               | what it is         |route handler  |client err |server err|
----        | ----                     | :----:             | ----:| ----      | ----|
|get:       | `/api/projects `            |   list of projects    |   X   |      X     |  X   |
|get:       | `/api/projects/:id`         |  A project            |   X   |      X     |  X   |
|post:      | `/api/projects`             | add project           |   X    |     X     |  X   |
|delete:    | `/api/projects/:id`         | delete a project      |      |           |     |
|get:       | `/api/actions`              |  list of actions      |  X    |      X     |  X   |
|get:       | `/api/actions/:id`          | An action             |  X    |      X     |  X   |
|post:      | `/api/actions`              | add action            |  X    |      X     |  X   |
|delete:    | `/api/actions/:id`          | delete a action       |      |           |     |
|put:       | `/api/projects/:id`         |  A project            |      |           |     |
|put:       | `/api/actions/:id`          | An action             |      |           |     |





## Assignments

Please open the `Review.md` file and answer the questions. DONE

Use Node.js and Express to design and build an API that performs CRUD operations on **projects** and **actions**.

### Download Project Files and Install Dependencies

* **Fork** and **Clone** this repository. X
* **CD into the folder** where you cloned the repository. X
* Code!

### Implement Requirements

* Take the steps necessary to create a `package.json` to keep a record of all dependencies. X
* use _yarn_ or _npm_ to add **knex** and **sqlite3** as dependencies to the project. **This is required for database access**. X
* Configure an _npm script_ named _"start"_ that will execute your code using _nodemon_ so that the **server restarts on changes**. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production. X
* Design and build a set of endpoints that satisfy the API requirements.
* **Use  postman_ to test the API as you work through the exercises.**

### Database Persistence Helpers

The `/data/helpers` folder includes helper files that you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

* `get()`: calling get returns an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
* `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
* `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
* `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an e tra method called `getProjectActions()` that when passed a _project id_ as it's only argument, returns a list of all the _actions_ for the _project_.

**All these helper methods return a promise.**

#### Database Schemas

The _schemas_ (properties and data type of each property) used to store and retrieve the resources inside the included database (`lambda.sqlite3`) is described below.

##### Projects

* `id`: number, no need to provide it when creating projects, the database will generate it.
* `name`: string, up to 128 characters long, required.
* `description`: string, up to 128 characters long, required.
* `completed`: boolean to indicate if the project has been completed, not required

##### Actions

* `id`: number, no need to provide it when creating actions, the database will automatically generate it.
* `project_id`: number, required, must be the id of an existing project.
* `description`: string, up to 128 characters long, required.
* `notes`: string, no size limit, not required. Used to record additional notes ore requirements to complete the action.
* `completed`: boolean to indicate if the action has been completed, not required

We have provided test data for all the resources.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Design and Build Endpoints

Design and build the necessary endpoints to:

* perform CRUD operations on _projects_ and _actions_.
* retrieve the list of actions for a project.

## Stretch Goal

* Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
* From the React application show a list of all _projects_ using the API you built.
* Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
* Add styling! Perhaps with `styled-components`.
