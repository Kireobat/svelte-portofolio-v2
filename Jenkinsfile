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
                                customHeaders: [[name: 'Authorization', value: 'Bearer ' + token]]
                            )
                            def body = readJSON(text: response.content)
                            return body?.data?.get(0)?.id
                            
                        }

                        def redeployContainer = { token, containerId ->
                            echo "Triggering Arcane redeployment for container ID: ${containerId}"
                            def response = httpRequest(
                                url: "https://docker.kireobat.eu/api/environments/0/containers/${containerId}/redeploy",
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: 'Bearer ' + token]]
                            )
                            echo "Arcane redeployment request completed for container ID: ${containerId}"
                        }

                        def containerName = 'svelte-portofolio-v2'
                        def containerId = findContainerIdByName(ARCANE_API_KEY, containerName)
                        echo "Found Arcane container ${containerName} with ID: ${containerId}"
                        redeployContainer(ARCANE_API_KEY, containerId)
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
