import type { AWS } from "@serverless/typescript";
import { proxyHandlers } from './src/functions/proxy/index';

const serverlessConfiguration: AWS = {
  service: "serverless",
  frameworkVersion: "3",
  plugins: [
    'serverless-esbuild',
    "serverless-dotenv-plugin",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    stage: "development",
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: {
    ...proxyHandlers.functions,
  },
};

module.exports = serverlessConfiguration; 