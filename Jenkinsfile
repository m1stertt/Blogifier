pipeline {
    agent any
    environment {
        TIMESTAMP = sh(script: "date +%s", returnStdout: true).trim()
        SCREENSHOT_PATH = "screenshots/${TIMESTAMP}"
        TEST_FOLDER="TestCafe"
        TEST_FILES="/tests/Blogifiertest.ts"
    }
    stages {
        stage("Build UI") {
            steps {
                dir("src/Blogifier") {
                    sh "dotnet publish Blogifier.csproj -o ../../outputs"
                }
            }
        }
        stage("Reset test environment") {
            steps {
                sh "docker-compose down"
                sh "docker-compose up -d --build"
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute chromium testCafe tests") {
            steps {
                sh "docker run --rm -v `pwd`/${TEST_FOLDER}:/tests -v `pwd`/${SCREENSHOT_PATH}:/screenshots --network=host testcafe/testcafe chromium ${TEST_FILES} -s takeOnFails=true path=/screenshots/chromium"
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }
        stage("Execute firefox testCafe tests") {
            steps {
                sh "docker run --rm -v `pwd`/${TEST_FOLDER}:/tests -v `pwd`/${SCREENSHOT_PATH}:/screenshots --network=host testcafe/testcafe firefox ${TEST_FILES} -s takeOnFails=true path=/screenshots/firefox"
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }
    }
}