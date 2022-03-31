FROM mingc/android-build-box:latest

USER root

COPY . .

RUN ./gradlew.sh assembleDebug

RUN mkdir /mobile_app/

RUN cp /project/app/build/outputs/apk/debug/app-debug.apk /mobile_app/mobile.apk