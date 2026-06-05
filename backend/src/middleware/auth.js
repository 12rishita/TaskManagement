import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'dev-secret-change-me';

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    const error = new Error('Authentication token is required');
    error.status = 401;
    return next(error);
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    const error = new Error('Invalid or expired token');
    error.status = 401;
    return next(error);
  }
}

export function signToken(user) {
  return jwt.sign(
    { id: user.id || user._id?.toString(), name: user.name, email: user.email },
    jwtSecret,
    { expiresIn: '7d' }
  );
}
