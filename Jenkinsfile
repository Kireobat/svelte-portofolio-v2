pipeline {
    agent {
        dockerContainer {
            image 'docker:20.10'
        }
    }
    tools {
        nodejs 'node_20.11.0'
    }
    stages{
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kireobat/svelte-portofolio-v2.git'
            }
        }
        stage('Build and Push Docker Image') {
                steps {
                script {
                        dockerContainer.withRegistry('https://docker.kireobat.eu', 'docker') {
                            def app = dockerContainer.build("kireobat/svelte-portofolio-v2")
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
                        def token = sh(script: """
                            curl -s -H "Content-Type: application/json" \
                            -d '{"username": "'${PORTAINER_USERNAME}'", "password": "'${PORTAINER_PASSWORD}'"}' \
                            -X POST https://docker.kireobat.eu/api/auth | jq -r .jwt
                        """, returnStdout: true).trim()
                        sh """
                            curl -H "Content-Type: application/json" \
                            -H "Authorization: Bearer ${token}" \
                            -X POST \
                            -d '{"Name": "svelte-portofolio-v2", "Image": "kireobat/svelte-portofolio-v2:latest"}' \
                            https://docker.kireobat.eu/api/endpoints/2/docker/containers/create
                        """
                    }
                }
            }
        }
    }
}