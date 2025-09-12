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
      await connection.getRepository(User).clear();
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

      it('should assign customer role', async () => {
         const userData = {
            firstName: 'rakesh1',
            lastName: 'kumar1',
            email: 'rakesh@example.com',
            password: 'password123',
            role: Roles.ADMIN,
         };
         // 2. Act by sending a request to the registration endpoint
         await request(app).post('/auth/register').send(userData);

         // 3. Assert the response
         const userRepository = connection.getRepository(User);
         const users = await userRepository.find();
         expect(users[0]).toHaveProperty('role');
         expect(users[0]?.role).toBe(Roles.ADMIN);
      });

      // hasing of password
      it.skip('should hash the password before storing it', async () => {
         const userData = {
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice@gmail.com',
            password: 'mysecretpassword',
         };
         // 2. Act by sending a request to the registration endpoint
         await request(app).post('/auth/register').send(userData);

         // 3. Assert the response
         const userRepository = connection.getRepository(User);
         const users = await userRepository.find();
         console.log(users[0]?.password);
         expect(users[0]?.password).not.toBe(userData.password);
         expect(users[0]?.password).toHaveLength(60);
         expect(users[0]?.password).toMatch(/^\$2[ayb]\$.{56}$/);
         // You can add more checks here to verify the hashing algorithm if needed
      });
      // should return 400 status code if email already exists
      it.skip('should return 400 status code if email fields is missing', async () => {
         const userData = {
            firstName: 'rakesh1',
            lastName: 'kumar1',
            email: 'rakesh@example.com',
            password: 'password123',
         };
         const userRepository = connection.getRepository(User);
         await userRepository.save({ ...userData, role: Roles.CUSTOMER });
         // First registration attempt
         // await request(app).post('/auth/register').send(userData);

         // // Second registration attempt with the same email
         const response = await request(app)
            .post('/auth/register')
            .send(userData);
         const users = await userRepository.find();

         // Assert the response
         expect(response.statusCode).toBe(400);
         expect(users).toHaveLength(1);
         // expect(response.body.message).toBe('Email already exists');
      });
      it.skip('should return 400 status code if fields are missing', async () => {
         const userData = {
            firstName: 'rakesh1',
            lastName: 'kumar1',
            email: '',
            password: 'password123',
         };

         // Act by sending a request to the registration endpoint
         const response = await request(app)
            .post('/auth/register')
            .send(userData);
         expect(response.statusCode).toBe(400);
         const userRepository = connection.getRepository(User);
         const users = await userRepository.find();
         expect(users).toHaveLength(0);
      });

      // fields are in proper format and sanitized
      it('should trim whitespace from input fields', async () => {
         const userData = {
            firstName: 'Rakesh',
            lastName: 'Kumar',
            email: 'rakesh@example.com',
            password: 'password123',
         };
         // Act by sending a request to the registration endpoint
         await request(app).post('/auth/register').send(userData);
         // expect(response.statusCode).toBe(200);
         const userRepository = connection.getRepository(User);
         const users = await userRepository.find();
         expect(users).toHaveLength(1);
         expect(users[0]).toMatchObject({
            firstName: 'Rakesh',
            lastName: 'Kumar',
            email: 'rakesh@example.com',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            password: expect.any(String),
         });
      });
   });
});
describe('Fields are missing', () => {});
