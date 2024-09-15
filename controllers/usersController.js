const  UserService = require('../services/users.service');

// const {users} = require('../models');

exports.getUsers = async (req, res) => {
    try {
      const response = await UserService.getAllUsers();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createUser = async (req, res) => { 
    try {
        const { username, email, password, role, status } = req.body
        const ifExists = await UserService.getUserByEmailOrUsername(email, username)
        if (!ifExists) {
            const response = await UserService.createUser({ username, email, password, role, status})
            res.json(response);
        } else {
            res.status(200).json({message : "User already exists"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const response =  await UserService.getUserById(id)
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  exports.deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const UserData = await UserService.deleteUser(id);
      res.status(200).json(UserData);
      // res.status(200).json({message: 'Content Deleted successfully'});
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.restoreUser = async (req, res) => {
    try {
      const id = req.params.id;
      const UserData = await UserService.restoreUser(id);
      res.status(200).json(UserData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.editUser = async (req, res) => {
    try {
      const id = req.params.id;
      const { username, email, password, role, status } = req.body
      const UserData = await UserService.editUser(id, username, email, password, role, status);
      res.status(200).json(UserData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };