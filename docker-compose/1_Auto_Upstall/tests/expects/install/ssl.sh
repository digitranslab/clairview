#!/usr/bin/expect -f

# Configure timeout for each expect command
set timeout 10

set random_number [lindex $argv 0]

# Start your main script
set env(PATH) "$env(WORKING_DIR)/mocks:$env(PATH)"

spawn bash ../../noco.sh

# Respond to script prompts
expect "Enter the IP address or domain name for the ClairView instance (default: localhost):"
send "${random_number}.ssl.clairview.dev\r"

expect "Show Advanced Options*"
send "y\r"

expect "Do you want to configure SSL*"
send "y\r"

expect "Choose Community or Enterprise Edition*"
send "\r"

expect "Do you want to enabled Redis for caching*"
send "Y\r"

expect "Do you want to enabled Watchtower for automatic updates*"
send "\r"

expect "How many instances of ClairView do you want to run*"
send "\r"

expect "Do you want to start the management menu*"
send "N\r"

expect eof
