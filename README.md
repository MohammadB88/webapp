# **Web Application**
In this project, I will deploy different Web applications on a local Kubernetes or Minikube cluster using declarative approach. 

# **Table of Content**
- [**Web Application**](#web-application)
- [**Table of Content**](#table-of-content)
  - [**Simple and Static Applications**](#simple-and-static-applications)
  - [**Application with Ingress and Secret**](#application-with-ingress-and-secret)
  - [**Fullstack Application**](#fullstack-application)
    - [**DevOps Packages** - Complete ***Kubernetes*** Setup](#devops-packages---complete-kubernetes-setup)
    - [**DevOps Packages** - Complete ***Minikube*** Setup](#devops-packages---complete-minikube-setup)

## **Simple and Static Applications**

- A simbple site with index.html and its error pages are deployed. It displays a text at first and the message on error pages 404 and 50* are customized.

- Some static webpages based on css have been deployed. They show a nicer webpage. I have used here persistentVolumes and persistentVolumeClaims to copy the contents into pods. The contents should be on the node, where pods are running.
[Free CSS Templates](https://www.free-css.com/free-css-templates)


## **Application with Ingress and Secret**

- This application is based on GO and will save the username and its message in a database and desplay it on the browser. More information can be found on [Deploying An Application On Kubernetes From A to Z](https://www.weave.works/blog/deploying-an-application-on-kubernetes-from-a-to-z).

Since I am running the application on a local server without load-balancing function, it is possible to reach the application using 

```
kubectl port-forward TYPE/NAME LOCAL_PORT:REMOTE_PORT
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80

```

which forwards the traffic to one or more local ports to a deployment port more precisely pod port.

This application is running without problem on the kubernetes cluster, but its content can not be found. Hence, I will come back to it later.


## **Fullstack Application**
In a fullstack application, there are usually at least three components. A database to store data, a backned part to communicate with the database and prepare response for the user, and a frontend, which displays the results to and communicate with the customer. Here, I will prepare a "Book Review App", containing all these three elements. 

![Architecture of the fullstack application](Application_Architecture.png)

In a modern architecture, each part will be containerized using Docker and deployed as a microservice usually on a container orchestrator platform like Kubernetes. Then, they are connected through an object called *service*. For this application, I have used templates from [Moses Maina](https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/). However, since it was prepared for docker and docker-compose, I have vastly modified the files and further developed it, digging in the google :smiley: and with the help of [ChatGPT](https://chat.openai.com/), so that at the end it could be deployed on Kubernetes.

For example, I have put the database credentials in *secret* files and used *Configmaps* objects to deploy the initial database script and reverse proxy configurations. The created microservices are called Database (MySQL), Backend (Node.JS), and Frontend (React). In addition, there is a nginx microservice as reverse proxy and an administrative microservice (adminer) for direct access to the database. I will further build upon this application, by making use of *PersistentVolumes* and *PersistentVolumeClaims* to not lose any book reviews. Besides, a nicer ***user interface (UI)*** and a ***login page*** will make the application even more appealing.

When the application is containerized in separated microservices, it is time to prepare the platform to deploy the app. 
There are some possibilities, among which I have chosen first to create a complete Kubernetes cluster and then I tried  a Minikube setup. It is on the agenda to deploy the app on *AWS* and also an *OpenShift* cluster.

### **DevOps Packages** - Complete ***Kubernetes*** Setup
I have created three virtual machines in hyper-V and installed Ubuntu on them; one being the controlplane and the other two are worker nodes. 
- Use Jenkins in the Kubernetes complete setup inside hyper-V and GitHub Actions in the minikube setup to build the image and push it to the dockerhub
- Use ArgoCD to deploy the new application
- Use Prometheus and Grafana to monitor different clsuter metrices
- ??? Use ELK to monitor and analyze the cluster behaviour (not implemented)

Here, I use the appoach explained in [Saha Rajdeep Repo](https://github.com/saha-rajdeep/kubernetescode), where he uses two jenkins pipelines, one for Continuous Integration/Deployment (CI) and another one for Continuous Delivery (CD). 

In the first pipeline, the images will be build and pushed to the dockerhub, and then the next pipeline will be triggered. The second pipeline will make the necessary modifications to the kubernetes resources and then push them to the corresponding repository.

ArgoCD will regularly (every 30s) monitor the repository for any changes and trigger an update of the deployment. I have implemented the whole lifecycle for nginx part.

I have used [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) to deploy all the required components to monitor the behaviour of different cluster resources like nodes, deployments, services and ....


### **DevOps Packages** - Complete ***Minikube*** Setup
- Use GitHub Actions in the minikube setup to build the image and push it to the dockerhub
- Use ArgoCD to deploy the new application
- ??? Use Prometheus and Grafana to monitor different clsuter metrices
- ??? Use ELK to monitor and analyze the cluster behaviour (not implemented)

??? Here, I use the appoach explained in [Saha Rajdeep Repo](https://github.com/saha-rajdeep/kubernetescode), where he uses two jenkins pipelines, one for Continuous Integration/Deployment (CI) and another one for Continuous Delivery (CD). 

??? In the first pipeline, the images will be build and pushed to the dockerhub, and then the next pipeline will be triggered. The second pipeline will make the necessary modifications to the kubernetes resources and then push them to the corresponding repository.

ArgoCD will regularly (every 30s) monitor the repository for any changes and trigger an update of the deployment. I have implemented the whole lifecycle for nginx part.

??? I have used [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) to deploy all the required components to monitor the behaviour of different cluster resources like nodes, deployments, services and ....


The application and argocd UI can be reached via port-forwarding feature of Kubernetes:
```
kubectl port-forward svc/nginx-svc 3050:3050
kubectl port-forward svc/adminer-svc 8000:8000

kubectl port-forward svc/argocd-server -n argocd 8443:443
```