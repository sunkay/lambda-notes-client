export default{
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-uploads-takecontrol"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://qe8tboe8t6.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_T6iwjFwNf",
        APP_CLIENT_ID: "65u7cvs4r772fe9f0t052gjaqq",
        IDENTITY_POOL_ID: "us-east-1:5965f837-1c29-4bde-bf71-ed3f17c40812"
    }
}