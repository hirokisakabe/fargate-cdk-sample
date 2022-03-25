import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";

export class FargateCdkSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "MyVpc", { maxAzs: 2 });
    const cluster = new ecs.Cluster(this, "Cluster", { vpc });

    const repository = ecr.Repository.fromRepositoryName(
      this,
      "SampleRepository",
      "sample-node-web-app"
    );

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "FargateService",
      {
        cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromEcrRepository(repository),
        },
      }
    );
  }
}
