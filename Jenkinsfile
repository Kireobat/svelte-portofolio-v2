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
                    docker.withRegistry('https://docker.kireobat.eu', 'docker') {
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
                        def token = sh(script: """
                            curl -s -H "Content-Type: application/json" \
                            -d '{"username": "${PORTAINER_USERNAME}", "password": "${PORTAINER_PASSWORD}"}' \
                            -X POST https://docker.kireobat.eu/api/auth | jq -r .jwt
                        """, returnStdout: true).trim()

                        // Deploy the container to Portainer
                        def response = sh(script: """
                            curl -s -H "Content-Type: application/json" \
                            -H "Authorization: Bearer ${token}" \
                            -X POST \
                            -d '{"Name": "svelte-portofolio-v2", "Image": "kireobat/svelte-portofolio-v2:latest"}' \
                            https://docker.kireobat.eu/api/endpoints/2/docker/containers/create
                        """, returnStdout: true).trim()

                        // Check response for success or failure
                        if (response.contains("error")) {
                            error "Failed to deploy to Portainer: ${response}"
                        } else {
                            echo "Successfully deployed to Portainer."
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
