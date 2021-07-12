const { response } = require('express');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Friend = require('../models/Friend');
const Media = require('../models/Media');

//READ
const index = async(req,res) => {
    try {
        const friend = await Friend.findAll();
        return res.status(200).json({friend});
    } catch (err) {
        return res.status(500).json({err});
    }
};


const show = async(req,res) => {
    const {id} = req.params;
    try {
        const friend = await Friend.findByPk(id);
        return res.status(200).json({friend});
    } catch (err) {
        return res.status(500).json({err});
    }
};

//CREATE
const create = async(req,res) => {
    try {
        const friend = await Friend.create(req.body);
        return res.status(201).json({message: "Amigo adicionado com sucesso!", friend: friend});
    } catch (err) {
        res.status(500).json({error: err});
    }
};

//UPDATE
const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await Friend.update(req.body, {where: {id: id}});
        if (updated) {
            const friend = await Friend.findByPk(id);
            return res.status(200).send(friend);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Amigo não encontrado");
    }
};

//DELETE
const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await Friend.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Amizade desfeita com sucesso.");
        }
        throw new Error ();
    } catch (err) {
        return res.status(500).json("Amigo não encontrado")
    }
};

//relationships
//with user
const addRelationFriend = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        const friend = await Friend.findByPk(req.body.FriendId);
        await user.setFriend(friend);
        return res.status(200). json(user);
    } catch (err) {
        return res.status(500).json({err});
    }
};

const removeRelationFriend = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        await user.setFriend(null);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({err});
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    addRelationFriend,
    removeRelationFriend
};