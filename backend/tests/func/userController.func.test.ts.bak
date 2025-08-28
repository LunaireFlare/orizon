import { jest } from "@jest/globals";

jest.mock("../../src/models/associations.js", () => {
    return {
        User: {
        findOne: jest.fn(),
        create: jest.fn(),
        }
    };
});
import { userController } from "../../src/controllers/user.js";
import { User } from "../../src/models/associations.js";

// Mock complet du modèle
jest.mock("../../src/models/associations.js");

const mockedUser = User as jest.Mocked<typeof User>;

test("createUser", async () => {
    const request = {
        body: {
        lastname: "O'clock",
        firstname: "Nadine",
        email: "nadine@oclock.fr",
        password: "password52375272",
        zip_code: "69000",
        city: "Lyon",
        date_of_birth: "1930-01-02T00:00:00.000Z"
        }
    };

    const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    mockedUser.findOne.mockResolvedValue(null);
    mockedUser.create.mockResolvedValue({ id: 1, ...request.body } as any);

    await userController.createUser(request as any, response as any);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({ id: 1, email: "nadine@oclock.fr" })
    );
});