pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        SONAR_TOKEN = credentials('sonarqube-token')
    }

    stages {
        stage('Install') {
            parallel {
                stage('Backend Deps') {
                    steps {
                        dir('eventhub-backend') { sh 'npm ci' }
                    }
                }
                stage('Frontend Deps') {
                    steps {
                        dir('eventhub-frontend') { sh 'npm ci' }
                    }
                }
            }
        }

        stage('Tests') {
            parallel {
                stage('Backend Unit Tests') {
                    steps {
                        dir('eventhub-backend') { sh 'npm run test' }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('eventhub-frontend') { sh 'npm run test' }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner' 
                    withSonarQubeEnv('SonarQube') {
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=eventhub \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/*.test.ts
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                build 'BuildEventhubJob'
            }
        }
    }

    post {
        success { echo 'Déploiement réussi !' }
        failure { echo 'Le pipeline a échoué.' }
        always { sh 'docker system prune -f || true' }
    }
}