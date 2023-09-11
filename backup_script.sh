#!/bin/bash

# Set the SSH server and login credentials
ssh_server="mahdiyar@iranartemia.com"
ssh_key="~/.ssh/id_rsa.pub"

# Set the path of the file to download on the remote server
remote_path="/home/mahdiyar/public_html/artemia/api/keystone.db"

# Set the directory to save the downloaded file
dir="./db_backups"

# Generate the current date in YYYY-MM-DD format
date=$(date +%Y-%m-%d)

# Download the file over SSH and save it with the current date as the filename
scp -i "$ssh_key" "$ssh_server:$remote_path" "$dir/$date.sqlite"