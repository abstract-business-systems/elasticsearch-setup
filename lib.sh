#!/bin/bash

executeUntillSucceeds() {
    while true; do
        "$@"
        
        if [ $? -eq 0 ]; then
            echo "Command succeeded"
            break
        else
            echo "Command failed, retrying in 5 seconds..."
            sleep 5
        fi
    done
}