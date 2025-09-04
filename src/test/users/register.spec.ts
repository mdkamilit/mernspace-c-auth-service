import { createConnection, getConnection, Connection } from 'typeorm';
import request from 'supertest';
import app from '../../app';
import { User } from '../../entity/User';
import { truncateTables } from './utils';

describe('POST /auth/register', () => {
   let connection: Connection;
   beforeAll(async () => {
      connection = await createConnection();
   });
   beforeEach(async () => {
      // database truncate
      await truncateTables(connection);
   });

   afterAll(async () => {
      const conn = getConnection();
      await conn.close();
   });
   describe('Given all fields', () => {
      it.skip('should return 200 status code', async () => {
         /// AAA =>1.Arrange data for user registration
         const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
         };
         // 2. Act by sending a request to the registration endpoint
         const response = await request(app)
            .post('/auth/register')
            .send(userData);

         // 3. Assert the response
         expect(response.statusCode).toBe(200);
      });

      it.skip('should return valid json', async () => {
         const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
         };
         // 2. Act by sending a request to the registration endpoint
         const response = await request(app)
            .post('/auth/register')
            .send(userData);

         // 3. Assert the response
         expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json'),
         );
      });

      it('should persist the user in database', async () => {
         const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
         };
         // 2. Act by sending a request to the registration endpoint
         await request(app).post('/auth/register').send(userData);
         // databse connection using type orm

         // 3. Assert the response

         const userRepository = connection.getRepository(User);
         const users = await userRepository.find();
         expect(users).toHaveLength(1);
         expect(users[0]?.firstName).toBe(userData.firstName);
         expect(users[0]?.lastName).toBe(userData.lastName);
         expect(users[0]?.email).toBe(userData.email);
      });
   });
});
describe('Fields are missing', () => {});
