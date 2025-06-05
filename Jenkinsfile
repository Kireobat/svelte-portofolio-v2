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
        stage('Deploy to Portainer') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'PORTAINER_PASSWORD', usernameVariable: 'PORTAINER_USERNAME')]) {
                    script {
                        // =============================================
                        // Define functions as closure variables FIRST
                        // =============================================
                        def getPortainerToken = { username, password ->
                            def response = httpRequest(
                                url: 'https://docker.kireobat.eu/api/auth',
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                requestBody: """{"username": "${username}", "password": "${password}"}"""
                            )
                            return readJSON(text: response.content).jwt
                        }

                        def findContainerByName = { token, name ->
                            def response = httpRequest(
                                url: "https://docker.kireobat.eu/api/endpoints/2/docker/containers/json",
                                httpMode: 'GET',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]]
                            )
                            def containers = readJSON(text: response.content)
                            containers.find { container ->
                                container.Names.any { it == "/${name}" }
                            }
                        }

                        def extractHostPort = { container ->
                            def portBindings = container.HostConfig?.PortBindings?.'3000/tcp'
                            portBindings ? portBindings[0].HostPort : null
                        }

                        def stopAndRemoveContainer = { token, containerId ->
                            httpRequest(
                                url: "https://docker.kireobat.eu/api/endpoints/2/docker/containers/${containerId}/stop",
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]]
                            )
                            httpRequest(
                                url: "https://docker.kireobat.eu/api/endpoints/2/docker/containers/${containerId}",
                                httpMode: 'DELETE',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]],
                                requestBody: '{"force": true}'
                            )
                        }

                        def createContainer = { token, name, hostPort ->
                            echo "hostPort: ${hostPort}"
                            def encodedName = URLEncoder.encode(name, 'UTF-8')
                            def deployResponse = httpRequest(
                                url: "https://docker.kireobat.eu/api/endpoints/2/docker/containers/create?name=${encodedName}",
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]],
                                requestBody: """{
                                    "Image": "kireobat/svelte-portofolio-v2:latest",
                                    "HostConfig": {
                                        "PortBindings": {
                                            "3000/tcp": [${hostPort ? '{"HostPort": "' + hostPort + '"}' : '{}'}]
                                        }
                                    }
                                }"""
                            )
                            readJSON(text: deployResponse.content).Id
                        }

                        def startContainer = { token, containerId ->
                            httpRequest(
                                url: "https://docker.kireobat.eu/api/endpoints/2/docker/containers/${containerId}/start",
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]]
                            )
                        }

                        // =============================================
                        // Main execution logic AFTER function definitions
                        // =============================================
                        def token = getPortainerToken(PORTAINER_USERNAME, PORTAINER_PASSWORD) // Fix credentials here
                        def containerName = "svelte-portofolio-v2"
                        def hostPort = null

                        def existingContainer = findContainerByName(token, containerName)
                        if (existingContainer) {
                            hostPort = extractHostPort(existingContainer)
                            stopAndRemoveContainer(token, existingContainer.Id)
                        }

                        def containerId = createContainer(
                            token,
                            containerName,
                            hostPort
                        )

                        startContainer(token, containerId)
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
