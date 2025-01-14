pipeline {
    agent {
        docker {
            image 'docker:20.10'
        }
    }
    tools {
        nodejs 'node_20.11.0'
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from the repository
                    git branch: 'main', url: 'https://github.com/kireobat/svelte-portofolio-v2.git'
                }
            }
        }
        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Build and push the Docker image
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        def app = docker.build("kireobat/svelte-portofolio-v2")
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('Deploy to Portainer') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'PORTAINER_PASSWORD', usernameVariable: 'PORTAINER_USERNAME')]) {
                    script {
                        // Obtain JWT token for Portainer API
                        def response = httpRequest(
                            url: 'https://docker.kireobat.eu/api/auth',
                            httpMode: 'POST',
                            contentType: 'APPLICATION_JSON',
                            requestBody: """{"username": "${PORTAINER_USERNAME}", "password": "${PORTAINER_PASSWORD}"}"""
                        )

                        def token = readJSON(text: response.content).jwt

                        // Deploy the container to Portainer
                        def deployResponse = httpRequest(
                            url: 'https://docker.kireobat.eu/api/endpoints/2/docker/containers/create',
                            httpMode: 'POST',
                            contentType: 'APPLICATION_JSON',
                            customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]],
                            requestBody: """{
                                "Name": "svelte-portofolio-v2", 
                                "Image": "kireobat/svelte-portofolio-v2:latest",
                                "HostConfig": {
                                    "PortBindings": {
                                        "3000/tcp": [
                                            {
                                                "HostPort": ""
                                            }
                                        ]
                                    }
                                }
                                }"""
                        )

                        def deployResponseContent = deployResponse.content.toString()

                        // Check response for success or failure
                        if (deployResponseContent.contains("error")) {
                            error "Failed to deploy to Portainer: ${response}"
                        } else {
                            echo "Successfully deployed to Portainer."
                        }

                        // Extract the container ID from the response
                        def containerId = new groovy.json.JsonSlurper().parseText(deployResponse.content).Id

                        // Start the container
                        def startResponse = httpRequest(
                            url: "https://docker.kireobat.eu/api/endpoints/2/docker/containers/${containerId}/start",
                            httpMode: 'POST',
                            contentType: 'APPLICATION_JSON',
                            customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]]
                        )

                        // Check response for success or failure
                        if (startResponse.status != 204) {
                            error "Failed to start the container: ${startResponse.content}"
                        } else {
                            echo "Container started successfully."
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            // Clean up any resources or perform actions regardless of success or failure
            echo "Pipeline completed."
        }
    }
}
