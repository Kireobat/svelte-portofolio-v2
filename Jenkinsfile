pipeline {
    agent any
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
        stage('Deploy to Arcane') {
            steps {
                withCredentials([string(credentialsId: 'jenkins-arcane-api-key', variable: 'ARCANE_API_KEY')]) {
                    script {
                        echo "Starting deployment to Arcane..."

                        def findContainerIdByName = { token, name ->
                            echo "Looking up Arcane container: ${name}"
                            def response = httpRequest(
                                url: "https://docker.kireobat.eu/api/environments/0/containers?search=${name}",
                                httpMode: 'GET',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'X-API-Key', value: token]]
                            )
                            def body = readJSON(text: response.content)
                            return body?.data?.get(0)?.id
                            
                        }

                        def createContainer = { token, name, image, ports ->
                            echo "Creating Arcane container: ${name} with image: ${image}"
                            def payload = [
                                name: name,
                                image: image,
                                ports: ports
                            ]
                            def response = httpRequest(
                                url: "https://docker.kireobat.eu/api/environments/0/containers",
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                requestBody: writeJSON(returnText: true, json: payload),
                                customHeaders: [[name: 'X-API-Key', value: token]]
                            )
                            def body = readJSON(text: response.content) 
                            return body?.data?.id
                        }

                        def redeployContainer = { token, containerId ->
                            echo "Triggering Arcane redeployment for container ID: ${containerId}"
                            def response = httpRequest(
                                url: "https://docker.kireobat.eu/api/environments/0/containers/${containerId}/redeploy",
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'X-API-Key', value: token]]
                            )
                            echo "Arcane redeployment request completed for container ID: ${containerId}"
                        }

                        def containerName = 'svelte-portofolio-v2'
                        def ports = [
                            {
                                "ip": "0.0.0.0"
                                "privatePort": 3000, // container port
                                "publicPort": 30013, // host port
                                "type": "tcp"
                            },
                            {
                                "ip": "::"
                                "privatePort": 3000, // container port
                                "publicPort": 30013, // host port
                                "type": "tcp"
                            }
                        ]

                        def containerId = findContainerIdByName(ARCANE_API_KEY, containerName)
                        if (!containerId) {
                            echo "Arcane container ${containerName} not found. Creating a new container..."
                            containerId = createContainer(ARCANE_API_KEY, containerName, "kireobat/${containerName}:latest", ports)
                            echo "Created Arcane container ${containerName} with ID: ${containerId}"
                        } else {
                            echo "Found Arcane container ${containerName} with ID: ${containerId}"
                            redeployContainer(ARCANE_API_KEY, containerId)
                        }
                        echo "Deployment to Arcane finished."

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
