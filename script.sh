#!/bin/bash

#expo signin -u $1 -p $2

expo ba -t apk --no-wait

APK=`expo bs | head -9 | grep APK`
echo "apk = $APK"

while [[ "$APK" == "" ]]
do
    sleep 60
    APK=`expo bs | head -9 | grep APK`
    if [[ "$APK" != ' ' ]]; then
        echo "apk = $APK"
        continue
    fi
done

LINK=`echo "$APK" | cut -d' ' -f 2`
echo "link = $LINK"

wget -c "$LINK" -O app.apk

mkdir /mobile_app/
cp app.apk /mobile_app/