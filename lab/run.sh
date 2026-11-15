#!/usr/bin/env bash
# Run both live test scripts against real Asterisk versions in Docker.
#
#   npm run build
#   lab/run.sh                                  # every image in IMAGES
#   IMAGES="andrius/asterisk:23" lab/run.sh     # just one
#
# Each image gets the configuration in lab/asterisk copied in, the manager port
# published on 127.0.0.1 only, and is removed afterwards. Results land in
# lab/results/. The secret in lab/asterisk/manager.conf is for the lab only.
set -uo pipefail
cd "$(dirname "$0")/.."
IMAGES="${IMAGES:-andrius/asterisk:18-current andrius/asterisk:20 pbx-verify-asterisk:lts andrius/asterisk:23}"
PORT="${PORT:-5058}"
NAME=amilink-lab
SECRET=lab-only-not-a-real-secret
mkdir -p lab/results
[ -f dist/index.js ] || { echo "run npm run build first"; exit 2; }
overall=0
for image in $IMAGES; do
  docker rm -f "$NAME" >/dev/null 2>&1
  echo "=================== $image"
  docker create --name "$NAME" -p "127.0.0.1:$PORT:5038" "$image" >/dev/null || { echo "could not create $image"; overall=1; continue; }
  docker cp lab/asterisk/. "$NAME:/etc/asterisk/" >/dev/null
  docker cp lab/moh/. "$NAME:/var/lib/asterisk/moh/amilink/" >/dev/null 2>&1 || { docker exec "$NAME" true 2>/dev/null; }
  docker start "$NAME" >/dev/null
  booted=no
  for _ in $(seq 1 120); do
    if docker exec "$NAME" asterisk -rx "core waitfullybooted" 2>/dev/null | grep -q "fully booted"; then booted=yes; break; fi
    sleep 1
  done
  if [ "$booted" != yes ]; then echo "Asterisk did not boot"; docker logs "$NAME" 2>&1 | tail -20; overall=1; continue; fi
  version=$(docker exec "$NAME" asterisk -V | awk '{print $2}')
  sleep 2
  export AMI_HOST=127.0.0.1 AMI_PORT=$PORT AMI_USERNAME=amilink AMI_SECRET=$SECRET
  node scripts/live-check.mjs > "lab/results/asterisk-$version-live-check.txt" 2>&1
  check=$?
  echo "live-check: $(grep -c '^ok' "lab/results/asterisk-$version-live-check.txt") ok, $(grep -c '^FAIL' "lab/results/asterisk-$version-live-check.txt") failed"
  grep '^FAIL' "lab/results/asterisk-$version-live-check.txt"
  RESULT_FILE="lab/results/asterisk-$version.json" node scripts/live-conformance.mjs > "lab/results/asterisk-$version-conformance.txt" 2>&1
  conf=$?
  grep -E '^(FAIL|skip) |^[0-9]+ ok' "lab/results/asterisk-$version-conformance.txt"
  [ $check -ne 0 ] || [ $conf -ne 0 ] && overall=1
  docker logs "$NAME" > "lab/results/asterisk-$version-server.log" 2>&1
  docker rm -f "$NAME" >/dev/null
done
exit $overall
