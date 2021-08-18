import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkPersonalWebsite from '../lib/cdk-static-website-template-stack';

test('Exact Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkPersonalWebsite.CdkPersonalWebsiteStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {
        "StaticWebsiteBucket2625C9A4": {
          "Type": "AWS::S3::Bucket",
          "Properties": {
            "CorsConfiguration": {
              "CorsRules": [
                {
                  "AllowedHeaders": [
                    "*"
                  ],
                  "AllowedMethods": [
                    "GET",
                    "HEAD"
                  ],
                  "AllowedOrigins": [
                    "*"
                  ],
                  "ExposedHeaders": [
                    "ETag",
                    "x-amz-meta-custom-header",
                    "Authorization",
                    "Content-Type",
                    "Accept"
                  ]
                }
              ]
            },
            "VersioningConfiguration": {
              "Status": "Enabled"
            },
            "WebsiteConfiguration": {
              "ErrorDocument": "error.html",
              "IndexDocument": "index.html"
            }
          },
          "UpdateReplacePolicy": "Delete",
          "DeletionPolicy": "Delete"
        },
        "StaticWebsiteBucketPolicy146BAEE4": {
          "Type": "AWS::S3::BucketPolicy",
          "Properties": {
            "Bucket": {
              "Ref": "StaticWebsiteBucket2625C9A4"
            },
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": "s3:GetObject",
                  "Effect": "Allow",
                  "Principal": {
                    "AWS": "*"
                  },
                  "Resource": {
                    "Fn::Join": [
                      "",
                      [
                        {
                          "Fn::GetAtt": [
                            "StaticWebsiteBucket2625C9A4",
                            "Arn"
                          ]
                        },
                        "/*"
                      ]
                    ]
                  }
                },
                {
                  "Action": [
                    "s3:GetBucket*",
                    "s3:List*",
                    "s3:DeleteObject*"
                  ],
                  "Effect": "Allow",
                  "Principal": {
                    "AWS": {
                      "Fn::GetAtt": [
                        "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
                        "Arn"
                      ]
                    }
                  },
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "StaticWebsiteBucket2625C9A4",
                        "Arn"
                      ]
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          {
                            "Fn::GetAtt": [
                              "StaticWebsiteBucket2625C9A4",
                              "Arn"
                            ]
                          },
                          "/*"
                        ]
                      ]
                    }
                  ]
                }
              ],
              "Version": "2012-10-17"
            }
          }
        },
        "StaticWebsiteBucketAutoDeleteObjectsCustomResource6AAF902D": {
          "Type": "Custom::S3AutoDeleteObjects",
          "Properties": {
            "ServiceToken": {
              "Fn::GetAtt": [
                "CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F",
                "Arn"
              ]
            },
            "BucketName": {
              "Ref": "StaticWebsiteBucket2625C9A4"
            }
          },
          "DependsOn": [
            "StaticWebsiteBucketPolicy146BAEE4"
          ],
          "UpdateReplacePolicy": "Delete",
          "DeletionPolicy": "Delete"
        },
        "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092": {
          "Type": "AWS::IAM::Role",
          "Properties": {
            "AssumeRolePolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "lambda.amazonaws.com"
                  }
                }
              ]
            },
            "ManagedPolicyArns": [
              {
                "Fn::Sub": "arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
              }
            ]
          }
        },
        "CustomS3AutoDeleteObjectsCustomResourceProviderHandler9D90184F": {
          "Type": "AWS::Lambda::Function",
          "Properties": {
            "Code": {
              "S3Bucket": {
                "Ref": "AssetParameters4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392S3BucketBF7A7F3F"
              },
              "S3Key": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392S3VersionKeyFAF93626"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392S3VersionKeyFAF93626"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            },
            "Timeout": 900,
            "MemorySize": 128,
            "Handler": "__entrypoint__.handler",
            "Role": {
              "Fn::GetAtt": [
                "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092",
                "Arn"
              ]
            },
            "Runtime": "nodejs12.x",
            "Description": {
              "Fn::Join": [
                "",
                [
                  "Lambda function for auto-deleting objects in ",
                  {
                    "Ref": "StaticWebsiteBucket2625C9A4"
                  },
                  " S3 bucket."
                ]
              ]
            }
          },
          "DependsOn": [
            "CustomS3AutoDeleteObjectsCustomResourceProviderRole3B1BD092"
          ]
        },
        "DistributionCFDistribution882A7313": {
          "Type": "AWS::CloudFront::Distribution",
          "Properties": {
            "DistributionConfig": {
              "DefaultCacheBehavior": {
                "AllowedMethods": [
                  "GET",
                  "HEAD"
                ],
                "CachedMethods": [
                  "GET",
                  "HEAD"
                ],
                "Compress": true,
                "ForwardedValues": {
                  "Cookies": {
                    "Forward": "none"
                  },
                  "QueryString": false
                },
                "TargetOriginId": "origin1",
                "ViewerProtocolPolicy": "redirect-to-https"
              },
              "DefaultRootObject": "index.html",
              "Enabled": true,
              "HttpVersion": "http2",
              "IPV6Enabled": true,
              "Origins": [
                {
                  "ConnectionAttempts": 3,
                  "ConnectionTimeout": 10,
                  "DomainName": {
                    "Fn::GetAtt": [
                      "StaticWebsiteBucket2625C9A4",
                      "RegionalDomainName"
                    ]
                  },
                  "Id": "origin1",
                  "S3OriginConfig": {}
                }
              ],
              "PriceClass": "PriceClass_100",
              "ViewerCertificate": {
                "CloudFrontDefaultCertificate": true
              }
            }
          }
        },
        "DeployWebsiteAwsCliLayer17DBC421": {
          "Type": "AWS::Lambda::LayerVersion",
          "Properties": {
            "Content": {
              "S3Bucket": {
                "Ref": "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3BucketAEADE8C7"
              },
              "S3Key": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3VersionKeyE415415F"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3VersionKeyE415415F"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            },
            "Description": "/opt/awscli/aws"
          }
        },
        "DeployWebsiteCustomResourceD116527B": {
          "Type": "Custom::CDKBucketDeployment",
          "Properties": {
            "ServiceToken": {
              "Fn::GetAtt": [
                "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536",
                "Arn"
              ]
            },
            "SourceBucketNames": [
              {
                "Ref": "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787S3BucketC67E8D08"
              }
            ],
            "SourceObjectKeys": [
              {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787S3VersionKeyAA2CF22B"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787S3VersionKeyAA2CF22B"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            ],
            "DestinationBucketName": {
              "Ref": "StaticWebsiteBucket2625C9A4"
            },
            "Prune": true,
            "DistributionId": {
              "Ref": "DistributionCFDistribution882A7313"
            }
          },
          "UpdateReplacePolicy": "Delete",
          "DeletionPolicy": "Delete"
        },
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265": {
          "Type": "AWS::IAM::Role",
          "Properties": {
            "AssumeRolePolicyDocument": {
              "Statement": [
                {
                  "Action": "sts:AssumeRole",
                  "Effect": "Allow",
                  "Principal": {
                    "Service": "lambda.amazonaws.com"
                  }
                }
              ],
              "Version": "2012-10-17"
            },
            "ManagedPolicyArns": [
              {
                "Fn::Join": [
                  "",
                  [
                    "arn:",
                    {
                      "Ref": "AWS::Partition"
                    },
                    ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                  ]
                ]
              }
            ]
          }
        },
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF": {
          "Type": "AWS::IAM::Policy",
          "Properties": {
            "PolicyDocument": {
              "Statement": [
                {
                  "Action": [
                    "s3:GetObject*",
                    "s3:GetBucket*",
                    "s3:List*"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:",
                          {
                            "Ref": "AWS::Partition"
                          },
                          ":s3:::",
                          {
                            "Ref": "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787S3BucketC67E8D08"
                          }
                        ]
                      ]
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:",
                          {
                            "Ref": "AWS::Partition"
                          },
                          ":s3:::",
                          {
                            "Ref": "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787S3BucketC67E8D08"
                          },
                          "/*"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "Action": [
                    "s3:GetObject*",
                    "s3:GetBucket*",
                    "s3:List*",
                    "s3:DeleteObject*",
                    "s3:PutObject*",
                    "s3:Abort*"
                  ],
                  "Effect": "Allow",
                  "Resource": [
                    {
                      "Fn::GetAtt": [
                        "StaticWebsiteBucket2625C9A4",
                        "Arn"
                      ]
                    },
                    {
                      "Fn::Join": [
                        "",
                        [
                          {
                            "Fn::GetAtt": [
                              "StaticWebsiteBucket2625C9A4",
                              "Arn"
                            ]
                          },
                          "/*"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "Action": [
                    "cloudfront:GetInvalidation",
                    "cloudfront:CreateInvalidation"
                  ],
                  "Effect": "Allow",
                  "Resource": "*"
                }
              ],
              "Version": "2012-10-17"
            },
            "PolicyName": "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF",
            "Roles": [
              {
                "Ref": "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265"
              }
            ]
          }
        },
        "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536": {
          "Type": "AWS::Lambda::Function",
          "Properties": {
            "Code": {
              "S3Bucket": {
                "Ref": "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3Bucket55EFA30C"
              },
              "S3Key": {
                "Fn::Join": [
                  "",
                  [
                    {
                      "Fn::Select": [
                        0,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3VersionKey60329B70"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Fn::Select": [
                        1,
                        {
                          "Fn::Split": [
                            "||",
                            {
                              "Ref": "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3VersionKey60329B70"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                ]
              }
            },
            "Role": {
              "Fn::GetAtt": [
                "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265",
                "Arn"
              ]
            },
            "Handler": "index.handler",
            "Layers": [
              {
                "Ref": "DeployWebsiteAwsCliLayer17DBC421"
              }
            ],
            "Runtime": "python3.6",
            "Timeout": 900
          },
          "DependsOn": [
            "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF",
            "CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265"
          ]
        }
      },
      "Parameters": {
        "AssetParameters4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392S3BucketBF7A7F3F": {
          "Type": "String",
          "Description": "S3 bucket for asset \"4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392\""
        },
        "AssetParameters4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392S3VersionKeyFAF93626": {
          "Type": "String",
          "Description": "S3 key for asset version \"4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392\""
        },
        "AssetParameters4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392ArtifactHashE56CD69A": {
          "Type": "String",
          "Description": "Artifact hash for asset \"4cd61014b71160e8c66fe167e43710d5ba068b80b134e9bd84508cf9238b2392\""
        },
        "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3BucketAEADE8C7": {
          "Type": "String",
          "Description": "S3 bucket for asset \"e9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68\""
        },
        "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68S3VersionKeyE415415F": {
          "Type": "String",
          "Description": "S3 key for asset version \"e9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68\""
        },
        "AssetParameterse9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68ArtifactHashD9A515C3": {
          "Type": "String",
          "Description": "Artifact hash for asset \"e9882ab123687399f934da0d45effe675ecc8ce13b40cb946f3e1d6141fe8d68\""
        },
        "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3Bucket55EFA30C": {
          "Type": "String",
          "Description": "S3 bucket for asset \"c24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cf\""
        },
        "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfS3VersionKey60329B70": {
          "Type": "String",
          "Description": "S3 key for asset version \"c24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cf\""
        },
        "AssetParametersc24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cfArtifactHash85F58E48": {
          "Type": "String",
          "Description": "Artifact hash for asset \"c24b999656e4fe6c609c31bae56a1cf4717a405619c3aa6ba1bc686b8c2c86cf\""
        },
        "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787S3BucketC67E8D08": {
          "Type": "String",
          "Description": "S3 bucket for asset \"6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787\""
        },
        "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787S3VersionKeyAA2CF22B": {
          "Type": "String",
          "Description": "S3 key for asset version \"6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787\""
        },
        "AssetParameters6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787ArtifactHash19316E58": {
          "Type": "String",
          "Description": "Artifact hash for asset \"6436f69f66729d0f2d81452951e7bdd4a56cdcf8bb73a4897cbb631ebfc64787\""
        }
      },
      "Outputs": {
        "DistributionDomainName": {
          "Value": {
            "Fn::GetAtt": [
              "DistributionCFDistribution882A7313",
              "DomainName"
            ]
          }
        }
      }
    }, MatchStyle.EXACT))
});
