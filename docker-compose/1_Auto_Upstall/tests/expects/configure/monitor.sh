#!/usr/bin/expect -f

# Configure timeout for each expect command
set timeout 10

# Start your main script
set env(PATH) "$env(WORKING_DIR)/mocks:$env(PATH)"

spawn bash ../../noco.sh

expect "Do you want to reinstall ClairView*"
send "N\r"

expect "Enter your choice: "
send "7\r"

send \x03

expect "Enter your choice: "
send "0\r"

expect EOF