output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "backend_instance_1_private_ip" {
  description = "Private IP of backend instance 1"
  value       = aws_instance.backend_1.private_ip
}

output "backend_instance_2_private_ip" {
  description = "Private IP of backend instance 2"
  value       = aws_instance.backend_2.private_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}
