import supertest from 'supertest'; 
import mongoose from 'mongoose';
import app from '../../server/src/index';  
import User from "../../server/src/models/User" 
import { MongoMemoryServer } from 'mongodb-memory-server';

// Set up in-memory MongoDB before all tests 
let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Chiudi in-memory DB dopo tutti i test 
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clean the database before each test (EACH TEST STARTS WITH A FRESH DB)
beforeEach(async () => {
  await User.deleteMany({});
});

describe('POST /register', () => {
  
  // Test: if successful registration
  it('should successfully register a new user and return user info', async () => {
    const userData = { email: 'testuser@example.com', password: 'password123' };

    const response = await supertest(app)  // Send POST request to the /register route
      .post('/register')
      .send(userData);  // Send user email and password in the request body

    // Assert that the response status is 201 (created)
    expect(response.status).toBe(201);
    // Assert that the response contains the correct message
    expect(response.body.message).toBe('User created');
    // Assert that the response contains the user's email
    expect(response.body.user.email).toBe(userData.email);
  });

  // Test: if user already exists
  it('should return an error when the user already exists', async () => {
    const userData = { email: 'testuser@example.com', password: 'password123' };

    // Create the first user in the database manually
    const user = new User(userData);
    await user.save();

    const response = await supertest(app)  // Send POST request to the /register route
      .post('/register')
      .send(userData);  // Send the same email and password again

    // Assert that the response status is 400 (Bad Request)
    expect(response.status).toBe(400);
    // Assert that the response contains the correct error message
    expect(response.body.message).toBe('User already exists');
  });

  // Test: if internal server error (mocked)
  it('should return a 500 error if something goes wrong during registration', async () => {
    const userData = { email: 'testuser@example.com', password: 'password123' };

    // Mocking User.save to throw an error, simulating a server failure
    jest.spyOn(User.prototype, 'save').mockRejectedValueOnce(new Error('Server error'));

    const response = await supertest(app)  // Send POST request to the /register route
      .post('/register')
      .send(userData);  // Send user data

    // Assert that the response status is 500 (Internal Server Error)
    expect(response.status).toBe(500);
    // Assert that the response contains the error message
    expect(response.body.message).toBe('Internal server error');
  });
});
