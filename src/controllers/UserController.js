const { response } = require('express');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Friend = require('../models/Friend');
const Media = require('../models/Media');

//READ
const index = async(req,res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({users});
    } catch (err) {
        return res.status(500).json({err});
    }
};


const show = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        return res.status(200).json({user});
    } catch (err) {
        return res.status(500).json({err});
    }
};

//CREATE
const create = async(req,res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({message: "Usuário cadastrado com sucesso!", user: user});
    } catch (err) {
        res.status(500).json({error: err});
    }
};

//UPDATE
const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await User.update(req.body, {where: {id: id}});
        if (updated) {
            const user = await User.findByPk(id);
            return res.status(200).send(user);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Usuário não encontrado");
    }
};

//DELETE
const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await User.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Usuário deletado com sucesso.");
        }
        throw new Error ();
    } catch (err) {
        return res.status(500).json("Usuário não encontrado")
    }
};

//relationships
//with comments
const addRelationComment = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        const comment = await Comment.findByPk(req.body.CommentId);
        await user.setComment(comment);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({err});
    }
};

//with friends
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

//with media
const addRelationMedia = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        const media = await Media.findByPk(req.body.MediaId);
        await user.setMedia(media);
        return res.status(200). json(user);
    } catch (err) {
        return res.status(500).json({err});
    }
};

const removeRelationMedia = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        await user.setMedia(null);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({err});
    }
};

//importing methods
module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    addRelationComment,
    addRelationFriend,
    addRelationMedia,
    removeRelationFriend,
    removeRelationMedia
};