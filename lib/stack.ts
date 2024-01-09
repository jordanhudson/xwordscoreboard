import * as cdk from 'aws-cdk-lib';
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Construct } from 'constructs';
import * as path from 'path'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class XwordScoreboardStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const apiGatewayLambda = new cdk.aws_lambda.Function(this, 'ApiLambda', {
    //   runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
    //   handler: 'index.handler',
    //   code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, 'api-lambda')),
    // });

    const apiLambda = new NodejsFunction(this, 'api-lambda', {
      entry: path.join(__dirname, 'api-lambda.ts')
    });

    const httpApi = new apigwv2.HttpApi(this, 'HttpApi');
    httpApi.addRoutes({
      path: '/',
      methods: [ apigwv2.HttpMethod.ANY ],
      integration: new HttpLambdaIntegration('lambdaIntegration', apiLambda),
    });

    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: httpApi.url!,
    });
  }
}
