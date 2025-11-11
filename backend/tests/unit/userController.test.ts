import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { Request, Response } from 'express';

// Mock des modèles utilisés par le controller via associations.js pour simuler les appels à la base de données
const mockUser = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
} as any;
const mockInterestUser = {
  create: jest.fn(),
  findOne: jest.fn(),
} as any;

// Avec Jest ESM, on préfère unstable_mockModule + import dynamique (remplace dynamiquement le module associations par nos propres mocks) => unstable_mockModule permet de mocker dynamiquement module ESM avant import, ce qui est indispensable pour remplacer fonctions par mocks et empêcher connexion réelle à bdd
await jest.unstable_mockModule('../../src/models/associations.js', () => ({
  User: mockUser as any,
  Interest_User: mockInterestUser as any,
}));

// Import du controller après mock des modèles pour lui faire utiliser mocks
const { userController } = await import('../../src/controllers/user.js');

// Mock d'argon2 pour les tests create/update
jest.mock('argon2', () => ({ hash: jest.fn(async () => 'hashed_password') }));

// --- FAUSSES DONNÉES ---
const fakeUserValid = {
  lastname: 'Doe', firstname: 'John', email: 'john@doe.fr', password: 'strongPass123',
  zip_code: '75001', city: 'Paris', date_of_birth: new Date('1950-01-01'),
  photo: null, description: 'Bio'
};
const fakeUserInvalidEmail = { ...fakeUserValid, email: 'john.fr' };
const fakeUserShortPassword = { ...fakeUserValid, password: 'short' };
const fakeUserInvalidZip = { ...fakeUserValid, zip_code: '7500' };
const fakeUserTooYoung = { ...fakeUserValid, date_of_birth: new Date() };
const fakeUserEmptyLastname = { ...fakeUserValid, lastname: '' };
const fakeUserInvalidDate = { ...fakeUserValid, date_of_birth: 'not-a-date' };
const fakeUserOtherEmail = { ...fakeUserValid, email: 'other@doe.fr' };
const fakeUsersList = [
  { toJSON: () => ({ id: 1, email: 'a@a.fr', password: 'x', interests: [] }) },
  { toJSON: () => ({ id: 2, email: 'b@b.fr', password: 'y', interests: [] }) },
];
const fakeUserInstance = {
  toJSON: () => ({ id: 42, email: 'a@a.fr', password: 'secret', lastname: 'Doe', firstname: 'John' })
};

// --- MOCK REQUEST ET RESPONSE ---
function createMockReq(body: any, user: any = { id: 42 }, params: any = {}) {
  return { body, user, params } as unknown as Request;
}

const createMockRes = () => {
  const res: any = {};
  res.json = jest.fn(() => res);
  res.end = jest.fn(() => res);
  res.status = jest.fn(() => res);
  return res;
};

// Nettoyage avant chaque test, réinitialise mocks pour éviter interférences
beforeEach(() => {
  jest.clearAllMocks();
});

describe('userController.getAllUsers', () => {
  it('retourne la liste sans passwords quand authentifié', async () => {
    // 1. ARRANGE = Prépare mocks / contexte de test
    mockUser.findAll.mockResolvedValueOnce(fakeUsersList as any);
    const req = createMockReq({}, { id: 42 });
    const res = createMockRes();
    // 2. ACT = Exécute test
    await userController.getAllUsers(req, res);
    // 3. ASSERT = Vérifie que valeurs reçues correspondent à attentes
    expect(mockUser.findAll).toHaveBeenCalledWith({
      include: [{ association: 'interests', attributes: ['id', 'name'] }],
    });
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, email: 'a@a.fr', interests: [] },
      { id: 2, email: 'b@b.fr', interests: [] },
    ]);
  });

  it('retourne 401 si non authentifié', async () => {
    const req = createMockReq({}, {}); // user sans id
    const res = createMockRes();
    await userController.getAllUsers(req, res);
    const { status, json } = res as any;
    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: 'Accès non autorisé. Veuillez vous connecter'});
  });
});

describe('userController.getOneUser', () => {
  it('retourne 401 si non authentifié', async () => {
    const req = createMockReq({}, {}, { id: '42' }); // user sans id
    const res = createMockRes();
    await userController.getOneUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Accès non autorisé. Veuillez vous connecter' });
  });

  it('retourne 404 si utilisateur introuvable', async () => {
    mockUser.findByPk.mockResolvedValueOnce(null as any);
    const req = createMockReq({}, { id: 42 }, { id: '123' });
    const res = createMockRes();
    await userController.getOneUser(req, res);
    expect(mockUser.findByPk).toHaveBeenCalled();
    const { status, json } = res as any;
    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  it('retourne un utilisateur existant sans mot de passe', async () => {
    mockUser.findByPk.mockResolvedValueOnce(fakeUserInstance as any);
    const req = createMockReq({}, { id: 42 }, { id: '42' });
    const res = createMockRes();
    await userController.getOneUser(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 42, email: 'a@a.fr', lastname: 'Doe', firstname: 'John' }));
    expect((res.json.mock.calls[0][0] as any).password).toBeUndefined();
  });
});

describe('userController.createUser', () => {
  it("retourne 409 si l'email existe déjà", async () => {
    // mockUser.findOne.mockClear();
    // mockUser.create.mockClear();
    mockUser.findOne.mockResolvedValueOnce({ id: 1 });
    const req = createMockReq(fakeUserValid);
    const res = createMockRes();
    await userController.createUser(req, res);
    expect(mockUser.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists.' });
  });

  it.each([
    ['date de naissance au mauvais format', fakeUserInvalidDate, /date/],
    ['un champ requis est vide', fakeUserEmptyLastname, /lastname/],
    ['email invalide', fakeUserInvalidEmail, /email/],
    ['mot de passe trop court', fakeUserShortPassword, /password/],
    ['code postal erroné', fakeUserInvalidZip, /zip_code/],
    ['date de naissance < 60 ans', fakeUserTooYoung, /60 ans/],
  ])('retourne 400 si %s', async (_, userData, expectedError) => {
    mockUser.findOne.mockResolvedValueOnce(null);
    const req = createMockReq(userData);
    const res = createMockRes();
    await userController.createUser(req, res);
    expect(mockUser.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect((res.json.mock.calls[0][0] as any).error).toMatch(expectedError);
  });

  it('crée un utilisateur si tout est valide', async () => {
    // mockUser.findOne.mockClear();
    // mockUser.create.mockClear();
    mockUser.findOne.mockResolvedValueOnce(null);
    mockUser.create.mockResolvedValueOnce({
      toJSON: () => ({
        id: 1, lastname: 'Doe', firstname: 'John', email: 'john@doe.fr',
        zip_code: '75001', city: 'Paris', date_of_birth: new Date('1950-01-01'),
        photo: null, description: 'Bio', status: 'en_attente', role: 'user'
      })
    });
    const req = createMockReq(fakeUserValid);
    const res = createMockRes();
    await userController.createUser(req, res);
    expect(mockUser.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: 1, lastname: 'Doe', firstname: 'John', email: 'john@doe.fr',
      zip_code: '75001', city: 'Paris', status: 'en_attente', role: 'user'
    }));
    expect((res.json.mock.calls[0][0] as any).password).toBeUndefined();
  });
});

describe('userController.updateUser', () => {
  it('retourne 401 si non authentifié', async () => {
    const req = createMockReq({}, {}, { id: '1' }); // user sans id
    const res = createMockRes();
    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Accès non autorisé. Veuillez vous connecter' });
  });

  it('retourne 404 si utilisateur non trouvé', async () => {
    mockUser.findByPk.mockResolvedValueOnce(null);
    const req = createMockReq({}, { id: 1 }, { id: '1' });
    const res = createMockRes();
    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  it('retourne 400 si validation échoue', async () => {
    mockUser.findByPk.mockResolvedValueOnce({ id: 1 });
    const req = createMockReq({ lastname: '' }, { id: 1 }, { id: '1' });
    const res = createMockRes();
    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('retourne 400 si email déjà utilisé par un autre', async () => {
    mockUser.findByPk.mockReset();
    mockUser.findOne.mockReset();
    const mockUserInstance = { id: 1, email: 'john@doe.fr', save: jest.fn(), toJSON: () => ({ id: 1, email: 'john@doe.fr' }) };
    mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
    mockUser.findOne.mockImplementation((args: any) => {
      if (args && args.where && args.where.email === 'other@doe.fr') return Promise.resolve({ id: 2 });
      return Promise.resolve(null);
    });
    const req = createMockReq(fakeUserOtherEmail, { id: 1 }, { id: '1' });
    const res = createMockRes();
    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists.' });
  });

  it('met à jour un utilisateur existant', async () => {
    const mockUserInstance = {
      id: 1,
      save: jest.fn(async function (this: any) { return this; }),
      toJSON: () => ({ id: 1, lastname: 'Doe', firstname: 'John', email: 'john@doe.fr', zip_code: '75001', city: 'Paris', date_of_birth: new Date('1950-01-01'), photo: null, description: 'Bio', status: 'valide', role: 'user' })
    };
    mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
    mockUser.findOne.mockResolvedValueOnce(null);
    const req = createMockReq(fakeUserValid, { id: 1 }, { id: '1' });
    const res = createMockRes();
    await userController.updateUser(req, res);
    expect(mockUserInstance.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: 1, lastname: 'Doe', firstname: 'John', email: 'john@doe.fr',
      zip_code: '75001', city: 'Paris', status: 'valide', role: 'user'
    }));
    expect((res.json.mock.calls[0][0] as any).password).toBeUndefined();
  });
});

describe('userController.deleteUser', () => {
  it('retourne 401 si on tente de supprimer un autre utilisateur', async () => {
    const req = createMockReq({}, { id: 2 }, { id: '1' }); // user id 2 tente de supprimer user id 1
    const res = createMockRes();
    await userController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Vous n'êtes pas autorisé à supprimer cet utilisateur" });
  });

  it('retourne 404 si utilisateur non trouvé', async () => {
    mockUser.findByPk.mockResolvedValueOnce(null);
    const req = createMockReq({}, { id: 1 }, { id: '1' });
    const res = createMockRes();
    await userController.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  it('désactive un utilisateur existant', async () => {
    const mockUserInstance = {
      id: 1,
      save: jest.fn(async function (this: any) { return this; }),
      toJSON: () => ({ id: 1, email: 'john@doe.fr', status: 'désactivé' })
    };
    mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);
    const req = createMockReq({}, { id: 1 }, { id: '1' });
    const res = createMockRes();
    await userController.deleteUser(req, res);
    expect(mockUserInstance.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });
});