// Mock API service for demonstration
// In a real application, this would make actual HTTP requests to your Java backend

class ApiService {
  private baseUrl = 'http://localhost:8080/api';
  
  // Mock data for demonstration
  private mockUsers = [
    { id: '1', username: 'admin', password: 'admin123', role: 'admin', email: 'admin@company.com', permissions: ['*'] },
    { id: '2', username: 'hr_manager', password: 'hr123', role: 'hr_manager', email: 'hr@company.com', permissions: ['hr.*'] },
    { id: '3', username: 'finance_manager', password: 'finance123', role: 'finance_manager', email: 'finance@company.com', permissions: ['finance.*'] },
    { id: '4', username: 'academic_manager', password: 'academic123', role: 'academic_manager', email: 'academic@company.com', permissions: ['students.*'] }
  ];

  private mockEmployees = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', position: 'Software Engineer', department: 'Engineering', salary: 85000, hireDate: '2023-01-15', status: 'active' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', position: 'Product Manager', department: 'Product', salary: 95000, hireDate: '2022-08-20', status: 'active' },
    { id: '3', firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@company.com', position: 'Designer', department: 'Design', salary: 75000, hireDate: '2023-03-10', status: 'active' },
    { id: '4', firstName: 'Sarah', lastName: 'Wilson', email: 'sarah.wilson@company.com', position: 'HR Specialist', department: 'HR', salary: 65000, hireDate: '2022-11-05', status: 'active' },
    { id: '5', firstName: 'David', lastName: 'Brown', email: 'david.brown@company.com', position: 'Financial Analyst', department: 'Finance', salary: 70000, hireDate: '2023-02-28', status: 'active' }
  ];

  private mockStudents = [
    { id: '1', firstName: 'Alice', lastName: 'Cooper', email: 'alice.cooper@university.edu', studentId: 'STU001', program: 'Computer Science', year: 3, gpa: 3.8, enrollmentDate: '2022-09-01', status: 'active' },
    { id: '2', firstName: 'Bob', lastName: 'Taylor', email: 'bob.taylor@university.edu', studentId: 'STU002', program: 'Business Administration', year: 2, gpa: 3.5, enrollmentDate: '2023-09-01', status: 'active' },
    { id: '3', firstName: 'Carol', lastName: 'Davis', email: 'carol.davis@university.edu', studentId: 'STU003', program: 'Engineering', year: 4, gpa: 3.9, enrollmentDate: '2021-09-01', status: 'active' },
    { id: '4', firstName: 'Daniel', lastName: 'Miller', email: 'daniel.miller@university.edu', studentId: 'STU004', program: 'Psychology', year: 1, gpa: 3.2, enrollmentDate: '2024-09-01', status: 'active' },
    { id: '5', firstName: 'Emma', lastName: 'Wilson', email: 'emma.wilson@university.edu', studentId: 'STU005', program: 'Computer Science', year: 4, gpa: 3.7, enrollmentDate: '2021-09-01', status: 'graduated' }
  ];

  private mockTransactions = [
    { id: '1', type: 'income', amount: 50000, description: 'Tuition Payment', category: 'Revenue', date: '2024-01-15', status: 'completed' },
    { id: '2', type: 'expense', amount: 15000, description: 'Facility Maintenance', category: 'Operations', date: '2024-01-14', status: 'completed' },
    { id: '3', type: 'income', amount: 25000, description: 'Grant Funding', category: 'Grants', date: '2024-01-13', status: 'completed' },
    { id: '4', type: 'expense', amount: 8000, description: 'Software Licenses', category: 'Technology', date: '2024-01-12', status: 'pending' },
    { id: '5', type: 'expense', amount: 12000, description: 'Employee Salaries', category: 'Payroll', date: '2024-01-11', status: 'completed' }
  ];

  // Simulate API delay
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(username: string, password: string) {
    await this.delay(1000);
    
    const user = this.mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      return {
        success: true,
        user: { id: user.id, username: user.username, email: user.email, role: user.role, permissions: user.permissions },
        token: 'mock-jwt-token'
      };
    }
    return { success: false };
  }

  async validateToken(token: string) {
    await this.delay(500);
    if (token === 'mock-jwt-token') {
      return this.mockUsers[0]; // Return admin user for demo
    }
    throw new Error('Invalid token');
  }

  async getDashboardStats() {
    await this.delay(800);
    return {
      totalEmployees: this.mockEmployees.length,
      totalStudents: this.mockStudents.length,
      monthlyRevenue: 125000,
      pendingTasks: 8
    };
  }

  async getRecentActivities() {
    await this.delay(600);
    return [
      { id: '1', type: 'employee', message: 'New employee John Doe was added to Engineering department', timestamp: '2024-01-15T10:30:00Z', user: 'HR Manager' },
      { id: '2', type: 'student', message: 'Student Alice Cooper enrolled in Computer Science program', timestamp: '2024-01-15T09:15:00Z', user: 'Academic Manager' },
      { id: '3', type: 'finance', message: 'Monthly payroll processed successfully', timestamp: '2024-01-15T08:45:00Z', user: 'Finance Manager' },
      { id: '4', type: 'system', message: 'System backup completed', timestamp: '2024-01-15T07:00:00Z', user: 'System' },
      { id: '5', type: 'employee', message: 'Performance review cycle started', timestamp: '2024-01-14T16:20:00Z', user: 'HR Manager' }
    ];
  }

  async getEmployees() {
    await this.delay(700);
    return this.mockEmployees;
  }

  async getStudents() {
    await this.delay(700);
    return this.mockStudents;
  }

  async getFinanceData(period: string) {
    await this.delay(800);
    return {
      transactions: this.mockTransactions,
      stats: {
        totalIncome: 125000,
        totalExpenses: 47000,
        netProfit: 78000,
        pendingTransactions: 3
      }
    };
  }

  // Employee CRUD operations
  async createEmployee(employee: any) {
    await this.delay(1000);
    const newEmployee = { ...employee, id: Date.now().toString() };
    this.mockEmployees.push(newEmployee);
    return newEmployee;
  }

  async updateEmployee(id: string, employee: any) {
    await this.delay(1000);
    const index = this.mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.mockEmployees[index] = { ...this.mockEmployees[index], ...employee };
      return this.mockEmployees[index];
    }
    throw new Error('Employee not found');
  }

  async deleteEmployee(id: string) {
    await this.delay(1000);
    const index = this.mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.mockEmployees.splice(index, 1);
      return true;
    }
    throw new Error('Employee not found');
  }

  // Student CRUD operations
  async createStudent(student: any) {
    await this.delay(1000);
    const newStudent = { ...student, id: Date.now().toString() };
    this.mockStudents.push(newStudent);
    return newStudent;
  }

  async updateStudent(id: string, student: any) {
    await this.delay(1000);
    const index = this.mockStudents.findIndex(stu => stu.id === id);
    if (index !== -1) {
      this.mockStudents[index] = { ...this.mockStudents[index], ...student };
      return this.mockStudents[index];
    }
    throw new Error('Student not found');
  }

  async deleteStudent(id: string) {
    await this.delay(1000);
    const index = this.mockStudents.findIndex(stu => stu.id === id);
    if (index !== -1) {
      this.mockStudents.splice(index, 1);
      return true;
    }
    throw new Error('Student not found');
  }
}

export const apiService = new ApiService();