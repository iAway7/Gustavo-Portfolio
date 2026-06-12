#!/bin/zsh
# Double-click this file to start the portfolio at http://localhost:3010
cd "$(dirname "$0")"
echo "Starting portfolio at http://localhost:3010 ..."
echo "Keep this window open. Close it to stop the site."
(sleep 4 && open "http://localhost:3010") &
npm run dev
