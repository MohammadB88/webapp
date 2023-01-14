# webapp
In this project, I will deploy different webapp applications on a local kubernetes cluster using declerative approach. 


## Simple and Static Applications

- A simbple site with index.html and its error pages are deployed. It displays a text at first and the message on error pages 404 and 50* are customized.

- Some static webpages based on css have been deployed. They show a nicer webpage. I have used here persistentVolumes and persistentVolumeClaims to copy the contents into pods. The contents should be on the node, where pods are running.
[Free CSS Templates](https://www.free-css.com/free-css-templates)


## Application with Ingress and Secret

- This application is based on GO and will save the username and its message in a database and desplay it on the browser. More information can be found on [Deploying An Application On Kubernetes From A to Z](https://www.weave.works/blog/deploying-an-application-on-kubernetes-from-a-to-z).

Since I am running the application on a local server without load-balancing function, it is possible to reach the application using 

```
kubectl port-forward TYPE/NAME LOCAL_PORT:REMOTE_PORT
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80

```

which forwards the traffic to one or more local ports to a deployment port more precisely pod port.

This application is running without problem on the kubernetes cluster, but its content can not be found. Hence, I will come back to it later.


## Fullstack Application with all the possible microservices
- There is MYSQL database and its service
- There is an API-backend (NodeJS) which talks to the database through the db-service
- There is a Frontend (React) to respond to the user's request
I have looked into and used the example from [Build and Dockerize a Fullstack React app with Node.js, MySQL and Nginx](https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/). However, since it was prepared for docker and docker-compose, I have vastly modified the files so that it could be deployed on Kubernetes. I will further build upon this application, by
- Using secrets
- More Configmaps
- PersistentVolumes for database
- A nicer User Interface.

### Use the whole DevOps package for the FullStack Application
- Use Jenkins to build the image and push it to the dockerhub
- Use ArgoCD to deploy the new application
- Use ELK to monitor and analyze the cluster behaviour (not implemented)

Here, I use the appoach explained in [Saha Rajdeep Repo](https://github.com/saha-rajdeep/kubernetescode), where he uses two jenkins pipelines, one for Continuous Integration/Deployment (CI) and another one for Continuous Delivery (CD). 

In the first pipeline, the images will be build and pushed to the dockerhub, and then the next pipeline will be triggered. The second pipeline will make the necessary modifications to the kubernetes resources and then push them to the corresponding repository.

ArgoCD will regularly (every 30s) monitor the repository for any changes and trigger an update of the deployment. I have implemented the whole lifecycle for nginx part.

