import request from 'supertest';
import app from '../../app';
describe('POST /auth/register', () => {
   describe('Given all fields', () => {
      it('should return 200 status code', async () => {
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

      it('should return valid json', async () => {
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
         //  expect(response.statusCode).toBe(200);
      });
   });
});
describe('Fields are missing', () => {});
