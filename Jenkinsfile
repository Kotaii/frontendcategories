pipeline {
    agent any

    //tools {nodejs "NodeJS"}
  
    stages {
        stage('Source') {
            steps {
                // Get  code from a GitHub repository
                git 'https://github.com/latifb2022/estore-admin-dashboard.git'

                // Run npm install
                sh "npm install"

                echo 'Source Stage Finished'
            }
        }

        stage('Test') {
            steps {
                // Run ng test command
                //sh "npm run ng test --browsers ChromeHeadless --watch=false"
                echo 'Test Stage Finished'
            }
        }

        stage('Build') {
            steps {
                // Run ng build command
                sh "npm run ng build"
                echo 'Test Stage Finished'
            }
        }

        stage('Containerize') {
            steps {

                // Run docker command to build a container
                sh "docker build -t estore-admin ."

                echo 'Containerizing the App with Docker'
            }
        }

        stage('Deploy') {
            steps {

                // Run the image in port 9090 and local port 8080 is blocked
                sh "docker run -d -p 9080:80 estore-admin"

                echo 'Deploy the App with Docker'
            }
        } 
    }
}
