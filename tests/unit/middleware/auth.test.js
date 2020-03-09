const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../../middlewares/auth');

describe('validator middleware', () => {
  it('should populate req.user with the data provided by the token', () => {
    const data = { name: 'jose' };
    const token = jwt.sign(data, config.get('jwtPrivateKey'));

    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user.name).toBe(data.name);
  });
});
