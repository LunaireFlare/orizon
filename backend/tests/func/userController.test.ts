import { describe, it, expect, jest } from '@jest/globals';

import { Request, Response } from 'express';

import { userController } from '../../src/controllers/user.js';
import { User } from '../../src/models/User.js';

// describe('getAllUsers', () => {
//     it('should return 200 and list of users', () => {

//         const req = {
//             user: { id: 42, name: 'TestUser' }
//         } as unknown as Request;

//         const json = jest.fn();
//         const status = jest.fn(() => ({ json }));

//         const res = { status } as unknown as Response;

//         // Appel du contrôleur
//         userController.getAllUsers(req, res);

//         // Vérification
//         expect(status).toHaveBeenCalledWith();
//         expect(json).toHaveBeenCalledWith([
//         { id: 1, name: 'Alice' },
//         { id: 2, name: 'Bob' }
//         ]);
//     });
// });


jest.mock('../../src/models/User'); 

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
            },
            {
                toJSON: () => ({
                id: 2,
                lastname: 'Martin',
                firstname: 'Claire',
                email: 'claire.martin@example.com',
                password: 'hidden',
                zip_code: '69000',
                city: 'Lyon',
                date_of_birth: '1985-11-30',
                role: 'user',
                photo: 'claire.jpg',
                description: 'Passionnée de musique',
                status: 'validé',
                created_at: '2025-08-26T12:00:00.000Z',
                updated_at: '2025-08-26T12:00:00.000Z',
                interests: [{ id: 1, name: 'Musique' }],
                events: [],
                }),
            },
        ];

    const mockedUser = User as jest.Mocked<typeof User>;
    mockedUser.findAll.mockResolvedValue(fakeUsers);

    const req = {} as Request;
    const json = jest.fn();
    const res = { json } as unknown as Response;

    await userController.getAllUsers(req, res);

    expect(mockedUser.findAll).toHaveBeenCalledWith({
        include: [
            {
            association: 'interests',
            attributes: ['id', 'name'],
            },
        ],
        });

        expect(json).toHaveBeenCalledWith([
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
        },
        {
            id: 2,
            lastname: 'Martin',
            firstname: 'Claire',
            email: 'claire.martin@example.com',
            zip_code: '69000',
            city: 'Lyon',
            date_of_birth: '1985-11-30',
            role: 'user',
            photo: 'claire.jpg',
            description: 'Passionnée de musique',
            status: 'validé',
            created_at: '2025-08-26T12:00:00.000Z',
            updated_at: '2025-08-26T12:00:00.000Z',
            interests: [{ id: 1, name: 'Musique' }],
            events: [],
        },
        ]);
    });
});