#!/bin/sh

echo 'EXECUTANDO ENTRYPOINT'

cd /usr/share/nginx/html

grep -lir -e "VUE_APP_API_URL_ARG" . | xargs -I{}  sed -i "s|VUE_APP_API_URL_ARG|${VUE_APP_API_URL}|g" {}

exec nginx -g 'daemon off;'