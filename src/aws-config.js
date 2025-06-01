const awsConfig = {
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_2Lc0H8NJ4',
  aws_user_pools_web_client_id: 'rig4g9km3h6t8n54eo4qn34q4',
  oauth: {
    domain: 'nhiyy9.auth.us-east-1.amazoncognito.com',
    scope: ['openid', 'email'],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/logout',
    responseType: 'code'
  },
  Auth: {
    identityPoolId: 'us-east-1:9596cff9-52e7-4ba9-883c-2f7e40df5ae0',
    region: 'us-east-1',
    mandatorySignIn: true
  },
  Storage: {
    AWSS3: {
      bucket: 'xyz-logistics-file-upload',
      region: 'us-east-1'
    }
  }
};

export default awsConfig;
