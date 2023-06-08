# Principal SRE - Code Challenge

## Create AWS EC2 Instance with Terraform

Welcome to the code challenge for the Site Reliability Engineer (SRE) role at BPP. For this challenge you will be required to write Terraform code that creates an AWS EC2 instance to a set of specifications. This test will assess your ability to provision infrastructure using Terraform, your Git and Shell scripting knowledge and your understanding of AWS resources.

### Terraform Tasks

Write Terraform code that does the following:

1. Creates an AWS EC2 Linux Ubuntu instance with the following specifications:
   - Instance type: t2.micro
   - Use the default VPC and subnet provided by AWS
2. Attaches two tags to the EC2 instance:
   - Tag 1: Key = "Name", Value = [Choose any appropriate name]
   - Tag 2: Key = "Environment", Value = [Choose any appropriate environment]
3. Defines a security group resource for the EC2 instance with the following requirements:
   - Allow inbound traffic on port 22 (SSH) from any source IP address
   - Allow outbound traffic to any destination IP address on all ports

### Instructions

To complete this code challenge, follow these instructions:

1. Create a new feature branch in the BPP GitHub repository to work on the code challenge.
2. Checkout the newly created branch in your local development environment.
3. Write the Terraform code to create an AWS EC2 instance and define the necessary resources according to the task specifications.
4. Provide clear comments in your code to explain the purpose and functionality of each resource or configuration block.
5. Test your Terraform code locally to ensure it is working as expected.
6. Deploy your Terraform code to the BPP Interviews AWS Account using following credentials:
   1. XXXXXX
7. Commit and push your code changes to the remote branch.

### Good luck!

###

-
