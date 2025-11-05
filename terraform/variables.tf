variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID for EC2 instances"
  type        = string
  default     = "ami-0c55b159cbfafe1f0"
}

variable "project_name" {
  description = "Project name for resource tagging"
  type        = string
  default     = "jwt-auth"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}
