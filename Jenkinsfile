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
    }
}