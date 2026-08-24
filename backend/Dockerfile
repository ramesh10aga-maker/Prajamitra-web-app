# Multi-stage build for PrajaMitra Spring Boot backend
# Stage 1: Build with Maven + JDK 17
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy POM first for dependency layer caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build the JAR (skip tests in image build)
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime with JRE 17 only (no secrets baked in)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy only the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# JVM options suitable for containers; secrets come from env at runtime
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
