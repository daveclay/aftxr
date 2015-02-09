#!/bin/bash

scp -i ~/.ssh/ec2-bitnami-daveclay.pem target/aftxr-1.1-SNAPSHOT.war bitnami@aftxr.com:aftxr.war && ssh -i ~/.ssh/ec2-bitnami-daveclay.pem bitnami@aftxr.com "./deploy-aftxr.sh"
