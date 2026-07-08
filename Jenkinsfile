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

                        def findContainerIdByName = { token, name ->
                            def response = httpRequest(
                                url: "https://docker.kireobat.eu/api/environments/0/containers?search=${name}",
                                httpMode: 'GET',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]]
                            )
                            return readJSON(text: response.content.data[0].id)
                            
                        }

                        def updateContainer = { token, containerId ->
                            def response = httpRequest(
                                url: "https://docker.kireobat.eu/api/environments/0/containers/${containerId}/update",
                                httpMode: 'POST',
                                contentType: 'APPLICATION_JSON',
                                customHeaders: [[name: 'Authorization', value: "Bearer ${token}"]],
                            )
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
