FROM alpine:3.18 AS base
RUN apk update && apk upgrade --no-cache libcrypto3 libssl3 && apk add --no-cache openjdk8-jre-base

FROM base AS backend
COPY ./backend/build/libs/dev-school-app-1.0-SNAPSHOT.jar /app/back.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/back.jar"]

FROM base AS frontend
COPY ./frontend/devschool-front-app-server/build/libs/devschool-front-app-server-1.0.0.jar \
  /app/front.jar
EXPOSE 8081
CMD ["sh", "-c", "java -jar /app/front.jar -P:ktor.backend.host=backend"]
