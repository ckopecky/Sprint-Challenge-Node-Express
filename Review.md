# Review Questions

## What is Node.js?
A tool that allows us to run JavaScript outside the browser

## What is Express?
A framework that wraps around the HTTP server module. It takes away a lot of the repetitiveness that exists in traditional Web API's so that we can build a server in less time. Express runs on Node JS

## Mention two parts of Express that you learned about this week.
API's and Middleware

## What is Middleware?
The liaison between the server and the client. 

## What is a Resource?
data that exists at endpoints

## What can the API return to help clients know if a request was successful?
status code 200 or 201 to let them know that it was OK or that something was created.

## How can we partition our application into sub-applications?
I'm not sure I understand the question being asked. We use create-react-app to create different components of our application. In express, I suppose we would use different HTTP methods that point to different domain names to create the same effect. 

## What is CORS and why do we need it?
cross-origin resource sharing allows for other sites to access information not on their domain. We use it now to allow our react-app (localhost:3000) to access our API (localhost:5000);
