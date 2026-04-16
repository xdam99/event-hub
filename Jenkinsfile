pipeline {
    agent any
    stages {
        stage('Preparation') {
            steps {
                catchError(buildResult: 'SUCCESS') {
                    sh 'docker stop eventhub_frontend'
                    sh 'docker stop eventhub_backend'
                    sh 'docker rm eventhub_frontend'
                    sh 'docker rm eventhub_backend'
                }
            }
        }
        
        stage('Build') {
            steps {
                build 'BuildEventhubJob'
            }
        }
        
        stage('Results') {
            steps {
                build 'TestEventHubJob'
            }
        }  

        stage('Tests') {
            steps {
                dir('eventhub-backend') {
                    sh '''
                    docker run --rm -v "\$(pwd):/app" -w /app node:20 sh -c "npm install && npm run test"
                    '''
                }
            }
        }
    }
    post {
        always { echo 'Pipeline completed.' }
        success { echo 'Pipeline succeeded.' }
        failure { echo 'Pipeline failed.' }
    }
}