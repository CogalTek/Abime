pipeline {
    agent any
    stages {
        stage("Build") {
            steps {
                echo "Building the app..."
                sh "docker-compose -f ./Server/docker-compose.yml build"
                sh "docker-compose -f ./Server/docker-compose.yml up -d"
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
                sh "docker-compose -f ./Server/docker-compose.yml down"
                sh "docker-compose -f ./Server/docker-compose.yml pull"
                sh "docker-compose -f ./Server/docker-compose.yml up -d"
            }
        }
    }
}
