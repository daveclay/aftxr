#!/bin/bash

mvn clean package
scp -i ~/.ssh/ec2-bitnami-daveclay.pem target/aftxr*.war aftxr.com:aftxr.war && ssh -i ~/.ssh/ec2-bitnami-daveclay.pem aftxr.com "./deploy-aftxr.sh"
