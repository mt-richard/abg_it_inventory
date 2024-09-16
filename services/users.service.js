
const { users } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; 



exports.getAllUsers = async () => {
  try {
    return await users.findAll();
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  } 
};

exports.getUserByEmailOrUsername = async (email, username) => {
  try {
    return await users.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { username: username }
        ]
      }
    });
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

exports.getUserById = async (id) => {
  try {
    return await users.findOne({where: {user_id: id }});
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};


exports.createUser = async (userData) => {
  try {
    return await users.create(userData);
  } catch (error) {
    throw new Error(`Error cretaing user: ${error.message}`);
  }
};

exports.deleteUser = async (id) => {
  try {
    let response = await users.findByPk(id);
    if (!response) {
      const error = new Error(`user not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

exports.restoreUser = async (id) => {
  try {
    let response = await users.findByPk(id);
    if (!response) {
      const error = new Error(`User not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'active';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error restoring users: ${error.message}`);
  }
};

exports.editUser = async (user_id, username, email, password, role, status) => {
  try {
    let userData = await users.findByPk(user_id);
    
    if (!userData) {
      const error = new Error(`user not found with id: ${user_id}`);
      error.statusCode = 404; 
      throw error;
    }
    
    if (typeof username !== 'string' || typeof email !== 'string' || 
        typeof password !== 'string' || typeof role !== 'string' || 
        typeof status !== 'string') {
      throw new Error('Invalid input: All fields must be strings.');
    }
    userData.username = username;
    userData.email = email;
    
    if (password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(password, saltRounds);
    }
    
    userData.role = role;
    userData.status = status;
    
    await userData.save();
    return userData;
    
  } catch (error) {
    throw new Error(`Error updating User: ${error.message}`);
  }
};



exports.login = async (email, password) => {
  try {
    if (!email || !password || password.length < 5) {
      throw new Error('All fields are required and password must be at least 5 characters long');
    }

    let user = await users.findOne({ 
      where: { 
        [Op.and]: [
          { email: email },
          { status: 'active' }
        ]
      }
    });

    if (!user) {
      throw new Error('Login failed: User not found or inactive');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Login failed: Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      JWT_SECRET,  
      { expiresIn: '1h' } 
    );

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: token  
    };
    
  } catch (error) {
    throw new Error(`Error during login: ${error.message}`);
  }
};
