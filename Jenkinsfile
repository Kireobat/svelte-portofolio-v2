pipeline {
    agent any

    stages{
        stage('Checkout') {
            steps {
                git url: 'https://github.com/kireobat/svelte-portofolio-v2.git'
            }
        }
        stage('Build and Push Docker Image') {
            steps {
            script {
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
                        def token = sh(script: '''
                            curl -s -H "Content-Type: application/json" \
                            -d '{"username": "'${PORTAINER_USERNAME}'", "password": "'${PORTAINER_PASSWORD}'"}' \
                            -X POST http://docker.kireobat.eu/api/auth | jq -r .jwt
                        ''', returnStdout: true).trim()
                        sh '''
                            curl -H "Content-Type: application/json" \
                            -H "Authorization: Bearer ${token}" \
                            -X POST \
                            -d '{"Name": "svelte-portofolio-v2", "Image": "kireobat/svelte-portofolio-v2:latest"}' \
                            http://docker.kireobat.eu/api/endpoints/1/docker/containers/create
                        '''
                    }
                }
            }
        }
    }
}