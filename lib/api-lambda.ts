import { Handler, Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
        message: 'hello world',
    }),
  };
};