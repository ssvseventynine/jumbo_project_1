## 📸 Application Preview
![Dashboard Preview](resources/Jumbo_1.jpg)

## Enterprise Core Portal

> A robust enterprise product catalog and live inventory management system designed to ingest product specifications, sync transactional state with MySQL, and publish real-time stock updates across client sessions.

[![Build & Deploy](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=githubactions)](#)
[![Kubernetes](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5?logo=kubernetes&logoColor=white)](#)
[![Cloud Provider](https://img.shields.io/badge/Cloud-Microsoft%20Azure-0089D6?logo=microsoftazure&logoColor=white)](#)
[![Backend](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white)](#)
[![Frontend](https://img.shields.io/badge/Frontend-AngularJS-DD0031?logo=angularjs&logoColor=white)](#)

---

## 🌐 Live Application

* **Live Web Portal:** [http://57.158.142.238/index.html](http://57.158.142.238/index.html)

---

## 📐 System Architecture & Workflow

The system follows a monolith architecture containerized and deployed on **Kubernetes** hosted on **Microsoft Azure**. The AngularJS front-end communicates asynchronously via HTTP/REST endpoints with a Spring Boot back-end, which orchestrates transactional synchronization using Hibernate ORM with MySQL.

```
+------------------+         HTTP / REST         +-----------------------------+
|                  |  ------------------------>  |   Spring Boot Backend       |
|  AngularJS Client|                             |   (Port 8080)               |
|  (Catalog UI)    |  <------------------------  |                             |
+------------------+     Live Updates / JSON     +--------------+--------------+
                                                                |
                                                                | Hibernate ORM
                                                                v
                                                       +-----------------+
                                                       | MySQL Database  |
                                                       | (Port 3306)     |
                                                       +-----------------+
```

---

## ✨ Key Features & Capabilities

* **Catalog Input & Price Management:** Interactive client UI enabling structured input and real-time validation for adding products, pricing models, and SKU details.
* **Transactional Data Synchronization:** Back-end pipeline that ensures immediate data persistence and integrity across relational tables using Hibernate JPA mapping.
* **Real-Time Inventory Publishing:** Dynamic live update publishing mechanism that syncs product stock levels and updates web views instantaneously.
* **Automated CI/CD Pipeline:** Fully automated container build, test, and deployment pipeline leveraging GitHub Actions to target Kubernetes clusters on Azure.

---

## 🛠️ Tech Stack & Dependencies

* **Back-End:** Java JRE, Spring Boot, Hibernate ORM
* **Front-End:** AngularJS, HTML5/CSS3, JavaScript (ES6)
* **Database:** MySQL
* **Cloud & DevOps:** Microsoft Azure, Kubernetes (k8s), Docker, GitHub Actions CI/CD

---

## 🔌 Port Configuration & Environment Setup

| Component | Service | Default Port | Protocol |
| :--- | :--- | :--- | :--- |
| **Back-End API** | Spring Boot Service | `8080` | HTTP |
| **Database** | MySQL Data Source | `3306` | TCP |

---

## 💻 Local Getting Started

### Prerequisites
* Java Development Kit (JDK 8+)
* Apache Maven 3.6+
* MySQL Server 8.0+
* Docker Desktop (Optional, for containerized run)

### 1. Database Setup

Create the target MySQL database:

```sql
CREATE DATABASE enterprise_core_db;
```

Verify database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/enterprise_core_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### 2. Build and Run the Backend

Execute the following commands to build and start the server:

```bash
# Clone the repository
git clone https://github.com/your-username/enterprise-core-portal.git
cd enterprise-core-portal

# Build with Maven
mvn clean package -DskipTests

# Run the Spring Boot application
java -jar target/enterprise-core-portal-0.0.1-SNAPSHOT.jar
```

The application will be accessible locally at `http://localhost:8080`.

---

## 🚀 Deployment Pipeline

This repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) that automates deployment:
1. Triggers on every push to the `main` branch.
2. Builds the Java application using Maven and packages the Docker container image.
3. Pushes the container image to Microsoft Azure Container Registry (ACR).
4. Applies Kubernetes deployment manifests (`kubectl apply -f k8s/`) to update the live cluster on Azure Kubernetes Service (AKS).