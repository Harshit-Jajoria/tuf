import UserModel from '../model/User.js';
import redisClient from '../utils/connectRedis.js';

export const createUser = async (req, res) => {
  try {
    const { username, code_language, input_code, stdin } = req.body;
    console.log('createuser called', username, code_language, input_code);

    const user = await UserModel.create({
      username,
      code_language,
      input_code,
      stdin
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsersFromCache = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const cacheKey = `users_${page}_${pageSize}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    console.error('Error fetching users from cache:', error);
    next(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const totalCount = await UserModel.count();
    const users = await UserModel.findAll({ limit: pageSize, offset });

    const cacheKey = `users_${page}_${pageSize}`;
    await redisClient.set(cacheKey, JSON.stringify({ users, totalCount }));
    await redisClient.expire(cacheKey, 60);

    return res.status(200).json({ users, totalCount });
  } catch (error) {
    console.error('Error fetching users from database:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
