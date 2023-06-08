# Principal SRE - Code Challenge

Welcome to the code challenge for the Site Reliability Engineer (SRE) role at BPP. This challenge will give you an opportunity to showcase your skills in Terraform, Git, and Shell scripting, as well as your understanding of AWS resources. The challenge is divided into three parts, each focusing on a specific aspect.

Good luck! We're excited to see your solutions and how you tackle each part of the challenge.

## Part 1 - Terraform: Create AWS EC2 Instance

### Acceptance Criteria

1. Create an AWS EC2 Linux Ubuntu instance with the following specifications:
   - Instance type: t2.micro
   - Use the default VPC and subnet provided by AWS
2. Attach two tags to the EC2 instance:
   - Tag 1: Key = "Name", Value = [Choose any appropriate name]
   - Tag 2: Key = "Environment", Value = [Choose any appropriate environment]
3. Define a security group resource for the EC2 instance with the following requirements:
   - Allow inbound traffic on port 22 (SSH) from any source IP address
   - Allow outbound traffic to any destination IP address on all ports

### Instructions

1. Create a new feature branch in the BPP GitHub repository to work on Part 1 of the code challenge.
2. Checkout the newly created branch in your local development environment.
3. Write the Terraform code to create an AWS EC2 instance and define the necessary resources according to the acceptance criteria.
4. Provide clear comments in your code, or verbally explain the purpose and functionality of each resource or configuration block.
5. Deploy your Terraform code to the BPP Interviews AWS Account using credentials supplied during the interview.
6. Commit and push your code changes to the remote branch.

## Part 2 - Terraform: Refactoring

### Acceptance Criteria

1. Refactor the Terraform code from Part 1 to a reusable opinionated Terraform module.
2. The refactored code should still create all the resources from Part 1, and:
   - Allows the Instance Type to be parameterised
   - Allows the Environment Tag to be parameterised
3. The Terraform state should not be modified during the refactoring process.

### Instructions

1. Use the same feature branch to make the Part 2 amends.
2. Modify the Terraform code to meet the necessary acceptance criteria.
3. Provide clear comments in your code, or verbally explain the purpose and functionality of each resource or configuration block.
4. Deploy your Terraform code to the BPP Interviews AWS Account using credentials supplied during the interview.
5. Commit and push your code changes to the remote branch.

## Part 3 - Shell Scripting: Recursive Text Search

### Acceptance Criteria

Write a Shell Script that:

1. Searches for a specific text pattern within all files of a given file type.
2. Takes in two command-line arguments:
   - Argument 1: The specific text pattern to search for (e.g., "ec2").
   - Argument 2: The file type to search within (e.g., ".tf").
3. Outputs the File Paths of all matching files.
4. Outputs the Total Count of files found.
5. Handles cases where no matching files are found gracefully, displaying an appropriate message.

### Instructions

1. Use the same feature branch to make the Part 3 amends.
2. Choose a shell scripting language (e.g., Bash, Zsh) that you prefer to use for this task.
3. Write a shell script that meets the acceptance criteria mentioned above.
4. Test your script locally to ensure it is working as expected.
5. Demonstrate the functionality of your script by searching for the text pattern "ec2" within all `.tf` files generated as part of the code written in Part 1 and Part 2.
6. Commit and push your code changes to the remote branch.
