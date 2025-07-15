# Enterprise Administrative System - Backend

## Java Spring Boot Backend with SQL Database

### Project Structure
```
backend/
├── src/main/java/com/enterprise/admin/
│   ├── AdminApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── DatabaseConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── EmployeeController.java
│   │   ├── StudentController.java
│   │   └── FinanceController.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   ├── EmployeeDTO.java
│   │   ├── StudentDTO.java
│   │   └── TransactionDTO.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Employee.java
│   │   ├── Student.java
│   │   └── Transaction.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── EmployeeRepository.java
│   │   ├── StudentRepository.java
│   │   └── TransactionRepository.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── EmployeeService.java
│   │   ├── StudentService.java
│   │   └── FinanceService.java
│   └── security/
│       ├── JwtAuthenticationFilter.java
│       └── JwtTokenProvider.java
├── src/main/resources/
│   ├── application.properties
│   └── schema.sql
└── pom.xml
```

### Database Schema (PostgreSQL)

```sql
-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    position VARCHAR(100),
    department VARCHAR(100),
    salary DECIMAL(10,2),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    program VARCHAR(100),
    year INTEGER,
    gpa DECIMAL(3,2),
    enrollment_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    transaction_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles and permissions
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE role_permissions (
    role_id INTEGER REFERENCES roles(id),
    permission_id INTEGER REFERENCES permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('admin', 'Full system access'),
('hr_manager', 'HR management access'),
('finance_manager', 'Finance management access'),
('academic_manager', 'Academic management access');

-- Insert default permissions
INSERT INTO permissions (name, description) VALUES
('employee.read', 'Read employee data'),
('employee.write', 'Write employee data'),
('student.read', 'Read student data'),
('student.write', 'Write student data'),
('finance.read', 'Read financial data'),
('finance.write', 'Write financial data'),
('user.manage', 'Manage users');
```

### Maven Dependencies (pom.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.enterprise</groupId>
    <artifactId>admin-system</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.1</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### Key Backend Files

#### 1. Main Application Class
```java
package com.enterprise.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }
}
```

#### 2. Security Configuration
```java
package com.enterprise.admin.config;

import com.enterprise.admin.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/employees/**").hasAnyAuthority("admin", "hr_manager")
                .requestMatchers("/api/students/**").hasAnyAuthority("admin", "academic_manager")
                .requestMatchers("/api/finance/**").hasAnyAuthority("admin", "finance_manager")
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

### How to Run the Complete System

#### Prerequisites
1. Java 17 or higher
2. Node.js 18 or higher
3. PostgreSQL 12 or higher
4. Maven 3.6 or higher

#### Backend Setup
1. **Database Setup**:
   ```bash
   # Create PostgreSQL database
   createdb enterprise_admin
   
   # Run the schema.sql file
   psql -d enterprise_admin -f schema.sql
   ```

2. **Configure Database Connection**:
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/enterprise_admin
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   
   # JWT Configuration
   jwt.secret=mySecretKey
   jwt.expiration=86400000
   
   # Server Configuration
   server.port=8080
   server.servlet.context-path=/api
   ```

3. **Build and Run Backend**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend Setup
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Update API Base URL**:
   Edit `src/services/apiService.ts` to use real API endpoints instead of mock data.

3. **Run Frontend**:
   ```bash
   npm run dev
   ```

#### Production Deployment
1. **Build Frontend**:
   ```bash
   npm run build
   ```

2. **Deploy Backend**:
   ```bash
   mvn clean package
   java -jar target/admin-system-1.0.0.jar
   ```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/validate` - Validate token

#### Employee Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `GET /api/employees/{id}` - Get employee by ID
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

#### Student Management
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `GET /api/students/{id}` - Get student by ID
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

#### Finance Management
- `GET /api/finance/transactions` - Get transactions
- `POST /api/finance/transactions` - Create transaction
- `GET /api/finance/stats` - Get financial statistics
- `GET /api/finance/reports` - Generate reports

### Testing
```bash
# Run backend tests
mvn test

# Run frontend tests
npm test
```

This comprehensive system provides a complete enterprise administrative solution with role-based access control, modern UI, and robust backend architecture.