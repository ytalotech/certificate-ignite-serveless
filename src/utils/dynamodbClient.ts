import { DynamoDB } from "aws-sdk";

const options = {
    region: "localhost",
    endpoint: "http://localhost:8000"
}

const isOffline = () => {
    return process.env.isOffline;
}

export const document = isOffline() ? new DynamoDB.DocumentClient(options) : new DynamoDB.DocumentClient();