import { createConnection, getConnection, Connection } from 'typeorm';
import request from 'supertest';
import app from '../../app';
import { User } from '../../entity/User';
import { Roles } from '../../constants';
// import { truncateTables } from './utils';

describe('POST /auth/register', () => {
   let connection: Connection;
   beforeAll(async () => {
      connection = await createConnection();
   });
   beforeEach(async () => {
      const connection = getConnection();
      await connection.synchronize();
   });

   afterAll(async () => {
      const connection = getConnection();
      if (connection.isConnected) {
         await connection.close();
      }
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
      //write a test case from scratch using the Test-Driven Development (TDD) approach for the /auth/register endpoint, focusing on asserting that the response includes the id of the newly created user.
      it.skip('should return the id of the newly created user', async () => {
         const userData = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 'password123',
         };
         // 2. Act by sending a request to the registration endpoint
         const response = await request(app)
            .post('/auth/register')
            .send(userData);

         // 3. Assert the response
         expect(response.body).toHaveProperty([]);
      });

      it.skip('should assign customer role', async () => {
         const userData = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 'password123',
         };
         // 2. Act by sending a request to the registration endpoint
         await request(app).post('/auth/register').send(userData);

         // 3. Assert the response
         const userRepository = connection.getRepository(User);
         const users = await userRepository.find();
         expect(users).toHaveProperty('role');
         expect(users[0]?.role).toBe(Roles.CUSTOMER);
      });
   });
});
describe('Fields are missing', () => {});
