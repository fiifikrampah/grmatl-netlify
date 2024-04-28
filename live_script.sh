#!/bin/bash

# Check if the YouTube live URL argument is provided
if [ "$1" != "" ]; then
    echo "YouTube Live URL Provided. Executing script..."
    # Extract the video ID from the provided URL
    youtube_id=$(echo $1 | grep -o "live/[a-zA-Z0-9_-]*" | sed 's/live\///')

    # Append any URL parameters, if present
    url_params=$(echo $1 | grep -o "\?.*$")

    # Check if the video ID was successfully extracted
    if [ "$youtube_id" != "" ]; then
        echo "YouTube Video ID: $youtube_id"
        # Replace the existing YouTube embed URL with the new one in the HTML file
        # Adding '' for macOS sed compatibility
        sed -i '' "s~https://www.youtube.com/embed/[a-zA-Z0-9_-]*[?].*~https://www.youtube.com/embed/$youtube_id$url_params~" Live.html
        # Add the changes to git, commit, and push to the master branch
        git add Live.html && git commit -m "Update to GRM Live with YouTube video $youtube_id" && git push origin master
    else
        echo "Error: Failed to extract YouTube video ID from the URL."
    fi
else
    echo "Please provide the full URL of the YouTube live video like so: ./update_live_video.sh 'https://www.youtube.com/live/video_id?si=params'"
fi
