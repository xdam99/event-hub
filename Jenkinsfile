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

        // stage('Lint') {
        //     steps {
        //         dir('back') {
        //             sh 'npx eslint src/ || true'
        //         }
        //     }
        // }

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
                sh "docker build -t eventhub-backend ./back"
                sh "docker build -t eventhub-frontend ./front"
            }
        }

        // stage('Docker Push') {
        //     when { branch 'main' }
        //     steps {
        //         withCredentials([usernamePassword(
        //             credentialsId: 'dockerhub-creds',
        //             usernameVariable: 'DOCKER_USER',
        //             passwordVariable: 'DOCKER_PASS'
        //         )]) {
        //             sh '''
        //                 echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
        //                 docker tag eventhub-backend:${IMAGE_TAG} ${DOCKER_USER}/eventhub-backend:${IMAGE_TAG}
        //                 docker tag eventhub-frontend:${IMAGE_TAG} ${DOCKER_USER}/eventhub-frontend:${IMAGE_TAG}
        //                 docker push ${DOCKER_USER}/eventhub-backend:${IMAGE_TAG}
        //                 docker push ${DOCKER_USER}/eventhub-frontend:${IMAGE_TAG}
        //             '''
        //         }
        //     }
        // }

        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh '''
                    docker compose down || true
                    docker compose up -d --build
                '''
            }
        }
    }

    post {
        success { echo 'Déploiement réussi !' }
        failure { echo 'Le pipeline a échoué.' }
        always { sh 'docker system prune -f || true' }
    }
}