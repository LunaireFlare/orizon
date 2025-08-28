import { describe, it, expect, jest } from '@jest/globals';

// import { Request, Response } from 'express';

// import { userController } from '../../src/controllers/user.js';
// import { User } from '../../src/models/User.js';

// describe('getAllUsers', () => {
//     it('should return 200 and list of users', () => {

//         const req = {
//             user: { id: 42, name: 'TestUser' }
//         } as unknown as Request;

//         const json = jest.fn();
//         const status = jest.fn(() => ({ json }));

//         const res = { status } as unknown as Response;

//         userController.getAllUsers(req, res);

//         expect(status).toHaveBeenCalledWith();
//         expect(json).toHaveBeenCalledWith([
//         { id: 1, name: 'Alice' },
//         { id: 2, name: 'Bob' }
//         ]);
//     });
// });
// import { jest } from '@jest/globals';

const mockFindAll = jest.fn();

await jest.unstable_mockModule('../../src/models/User.ts', () => ({
    User: {
        findAll: mockFindAll,
    }
}));

const { User } = await import('../../src/models/User.ts');
const { userController } = await import('../../src/controllers/user.ts');

describe('getAllUsers controller', () => {
    it('should return users without passwords', async () => {
        const fakeUsers = [
        {
            toJSON: () => ({
            id: 1,
            lastname: 'Dupont',
            firstname: 'Jean',
            email: 'jean.dupont@example.com',
            password: 'password',
            zip_code: '75001',
            city: 'Paris',
            date_of_birth: '1920-05-15',
            role: 'user',
            photo: '',
            description: null,
            status: 'en_attente',
            created_at: '2025-08-27T01:03:44.248Z',
            updated_at: '2025-08-27T01:03:44.248Z',
            interests: [],
            events: [],
            }),
        }
        ];

        mockFindAll.mockResolvedValue(fakeUsers); // 👈 ici c'est bien la fonction mockée

        const req = {};
        const res = { json: jest.fn() };

        await userController.getAllUsers(req, res);

        expect(User.findAll).toHaveBeenCalledWith({
        include: [
            {
            association: 'interests',
            attributes: ['id', 'name'],
            }
        ]
        });

        expect(res.json).toHaveBeenCalledWith([
        {
            id: 1,
            lastname: 'Dupont',
            firstname: 'Jean',
            email: 'jean.dupont@example.com',
            zip_code: '75001',
            city: 'Paris',
            date_of_birth: '1920-05-15',
            role: 'user',
            photo: '',
            description: null,
            status: 'en_attente',
            created_at: '2025-08-27T01:03:44.248Z',
            updated_at: '2025-08-27T01:03:44.248Z',
            interests: [],
            events: [],
        }
        ]);
    });
});
