# webapp
In this project, I will deploy different webapp applications on a local kubernetes cluster using declerative approach. 


## Nginx-based application

- A simbple site with index.html and its error pages are deployed. It displays a text at first and the message on error pages 404 and 50* are customized.

- Some static webpages based on css have been deployed. They show a nicer webpage. I have used here persistentVolumes and persistentVolumeClaims to copy the contents into pods. The contents should be on the node, where pods are running.
[Free CSS Templates](https://www.free-css.com/free-css-templates)

