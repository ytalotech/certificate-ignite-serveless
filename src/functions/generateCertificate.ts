import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

interface ICreateCertificate {
    id: string;
    name: string;
    grade: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const {id, name, grade} = JSON.parse(event.body) as ICreateCertificate;
    
    // Para inserir informações na tabela
    await document.put({
        TableName: "users_certificate",
        Item: {
            id,
            name,
            grade,
            created_at: new Date().getTime(),
        }
    }).promise();

    // Buscar informação pois o put não trás, rele sempre tras vários valores
    const response = await document.query({
        TableName: "users_certificate",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(response.Items[0])
    }
}