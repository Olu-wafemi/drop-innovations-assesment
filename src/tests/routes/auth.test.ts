import request from "supertest";
import app from "../../app"


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe('Auth Routes', () => {
    
    afterAll(async () => {
      await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
      await prisma.$disconnect();
    });
  
    it('should register a new user', async () => {
      const response = await request(app).post('/api/auth/register').send({
        email: 'newuser@example.com',
        name: "John Doe",
        password: 'password123',
        role: 'DRIVER',
      });
  
      expect(response.status).toBe(201);
    });
  
    it('should login an existing user', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'newuser@example.com',
        password: 'password123',
      });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  
    it('should return 401 for incorrect credentials', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
  
      expect(response.status).toBe(400);
    });
  });