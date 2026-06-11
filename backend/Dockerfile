FROM maven:3.9-eclipse-temurin-22 AS build
WORKDIR /app
COPY backend/ .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:22-jre
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD java -jar app.jar