import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

interface IUserCertificate {
    name: string;
    id: string;
    created_at: string;
    grade: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    //http://localhost:3000/verifyCertificate/{id}
    const { id } = event.pathParameters;

    const response = await document
        .query({
            TableName: 'users_certificate',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ":id": id
            }
        })
        .promise();

    const userCertifcate = response.Items[0] as IUserCertificate;

    if (userCertifcate) {
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Certificado válido",
                name: userCertifcate.name,
                url: `https://nome_bucket.s3.amazonaws.com/${id}.pdf`,
            })
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Certificado inválido!"
        })
    }
}