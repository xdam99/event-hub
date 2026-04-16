pipeline {
    agent any
    stage('Preparation') {
        catchError(buildResult: 'SUCCESS') {
            sh 'docker stop eventhub_frontend'
            sh 'docker stop eventhub_backend'
            sh 'docker rm eventhub_frontend'
            sh 'docker rm eventhub_backend'
        }
    }
    stage ('Build') {
        build 'BuildEventhubJob'
    }
    stage('Results') {
        build 'TestEventHubJob'
    }
}
