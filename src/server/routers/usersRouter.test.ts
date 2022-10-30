import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import startDatabase from "../../database";
import User from "../../database/models/UserModel";
import UserInterface from "../../interfaces/User";
import app from "..";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await startDatabase(connectionString);
});

beforeEach(async () => {
  User.create({
    name: "NormalStrawMan",
    email: "trange23@gmail.com",
    password: "$2b$10$4Mnj12NAQoc6URHDf0kFFuOnpDprXK43./DfdrkyrVfy2I7j8GtDe",
  } as UserInterface);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /users/login endpoint ", () => {
  describe("When a request with the right credentials request authentication", () => {
    test("Then it should reply with a token", async () => {
      const rightCredentials = {
        email: "trange23@gmail.com",
        password: "idontKnow",
      };

      const {
        body: { token },
      } = await request(app).post("/users/login").send(rightCredentials);

      expect(token).toBeTruthy();
    });
  });
});

describe("Given a /users/register endpoint", () => {
  describe("When it get's a request with an email, password and name", () => {
    test("Then is should reply witha token", async () => {
      const theRightData = {
        email: "sometimesHappens@hotmail.com",
        name: "Ricardo",
        password: "pleis324",
      };

      const {
        body: { token },
      } = await request(app).post("/users/register").send(theRightData);

      expect(token).toBeTruthy();
    });
  });

  describe("When it get's a request with missing properties like password", () => {
    test("Then it should reply with an error", async () => {
      const theWrongData = {
        email: "iforgetThings@gmail.com",
        name: "MarcoPolco",
      };

      const {
        body: { token },
      } = await request(app).post("/users/register").send(theWrongData);

      expect(token).toBeFalsy();
    });
  });
});
