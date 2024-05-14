const userService = require('../services/userService');

const createUser = async (req, reply) => {
    try {
        const user = await userService.createUser(req.body);
        return reply.send(user);
    } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const getUser = async (req, reply) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUser(userId);
        if (!user) return reply.status(404).send({ error: 'User not found' });
        return reply.send(user);
    } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, reply) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        if (!updatedUser) return reply.status(404).send({ error: 'User not found' });
        return reply.send(updatedUser);
    } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, reply) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) return reply.status(404).send({ error: 'User not found' });
        return reply.send({ message: 'User deleted successfully' });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
