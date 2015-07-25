#!/bin/bash

mvn clean package
scp -i ~/.ssh/ec2-bitnami-daveclay.pem target/aftxr*.war bitnami@aftxr.com:aftxr.war && ssh -i ~/.ssh/ec2-bitnami-daveclay.pem bitnami@aftxr.com "./deploy-aftxr.sh"
