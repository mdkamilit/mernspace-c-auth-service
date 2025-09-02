import app from './app.ts';
import { calculateDiscount, calculateTwoNumbers } from './utils.ts';
import request from 'supertest';

describe('App', () => {
   it('should return correct discount amount', () => {
      const result = calculateDiscount(100, 10);
      expect(result).toBe('$10');
   });

   it('should return correct sum of two numbers', () => {
      const result = calculateTwoNumbers(5, 10);
      expect(result).toBe(15);
   });

   it('should return 200 status code', async () => {
      const response = await request(app).get('/').send();
      expect(response.statusCode).toBe(200);
   });
});
