# CDK static website template

This is a template for easy static website hosting on AWS using CDK. The static website source code is located in `resources/dist`.

## Prerequesite

- An AWS account, you have to set both secrets in your repo settings `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` to get automatic deployments

## What it does

- Creates a public S3 bucket
- Configures Cloudfront (CDN) for faster access to your website
- Uploads your website source code to the S3 bucket
- Will deploy changes on every code push on main branch using Github Action

## Setup

1. Install nvm if you do not have it already: <https://github.com/nvm-sh/nvm>
2. In the root of the repository run `nvm use`, if the required node version is not installed please follow the instructions to install it
3. Once the required node version is installed, run `npm i` to install dependencies
4. That's it, makes changes to your website source code, every push on main branch will trigger a deployment. You can retrieve the CloudFront url from the CloudFront console or in Github action logs (Build, synth and deploy step)

## Useful commands

 * `npm run deploy`  builds, synthesize and deploy
 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
