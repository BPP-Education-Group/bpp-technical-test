# SRE - Code Challenge

Welcome to the code challenge for the Site Reliability Engineer (SRE) role at BPP. This challenge will give you an opportunity to showcase your skills in Terraform, Git, and Shell scripting, as well as your understanding of AWS resources. The challenge is divided into three parts, each focusing on a specific aspect.

Good luck! We're excited to see your solutions and how you tackle each part of the challenge.

## Part 1 - Terraform: Create AWS EC2 Instance

### Instructions

1. Clone the repo.
2. Write the Terraform code to create an AWS EC2 instance and define the necessary resources according to the acceptance criteria.
3. Provide clear comments in your code, or verbally explain the purpose and functionality of each resource or configuration block.
4. Deploy your Terraform code to the _BPP Interviews AWS Account_.
   - AWS credentials will be provided.

### Acceptance Criteria

1. Create an AWS EC2 Linux Ubuntu instance with the following specifications:
   - Instance type: t2.micro
   - Use the default VPC and subnet provided by AWS
2. Attach two tags to the EC2 instance:
   - Tag 1: Key = "Name", Value = [Choose any appropriate name]
   - Tag 2: Key = "Environment", Value = [Choose any appropriate environment]
3. Define a security group resource for the EC2 instance with the following requirements:
   - Allow inbound traffic on port 1337 from any source IP address
   - Allow outbound traffic to any destination IP address on all ports
4. Resources are deployed to the _BPP Interviews AWS Account_.

## Part 2 - Terraform: Refactoring

### Instructions

1. Refactoring can be tricky. Consider committing your code.
2. Modify the Terraform code to meet the necessary acceptance criteria.
3. Provide clear comments in your code, or verbally explain the purpose and functionality of each resource or configuration block.
4. Deploy your Terraform code to the _BPP Interviews AWS Account_.
5. Once accepted, destroy the infrastructure.

### Acceptance Criteria

1. Refactor the Terraform code from Part 1 to a reusable opinionated Terraform module.
2. Use this opinionated module from the root module.
3. The refactored code should still create all the resources from Part 1, and:
   - Allows the Instance Type to be parameterised
   - Allows the Environment Tag to be parameterised
4. The existing AWS resources should not be modified or destroyed during the refactoring process but must remain managed by Terraform.

## Part 3 - Shell Scripting: Recursive Text Search

### Instructions

1. Choose a shell scripting language (e.g., Bash, Zsh) that you prefer to use for this task.
2. Write a shell script that meets the acceptance criteria mentioned above.
3. Test your script locally to ensure it is working as expected.
4. Demonstrate the functionality of your script by searching for the text pattern "ec2" within all `.tf` files generated as part of the code written in Part 1 and Part 2.

### Acceptance Criteria

Write a Shell Script that:

1. Searches for a specific text pattern within all files of a given file type.
2. Takes in two command-line arguments:
   - Argument 1: The specific text pattern to search for (e.g., "ec2").
   - Argument 2: The file type to search within (e.g., ".tf").
3. Outputs the File Paths of all matching files.
4. Outputs the Total Count of files found.
5. Handles cases where no matching files are found gracefully, displaying an appropriate message.
