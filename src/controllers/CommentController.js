const { response } = require('express');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Friend = require('../models/Friend');
const Media = require('../models/Media');

//READ
const index = async(req,res) => {
    try {
        const comments = await Comment.findAll();
        return res.status(200).json({comments});
    } catch (err) {
        return res.status(500).json({err});
    }
};


const show = async(req,res) => {
    const {id} = req.params;
    try {
        const comment = await Comment.findByPk(id);
        return res.status(200).json({comment});
    } catch (err) {
        return res.status(500).json({err});
    }
};

//CREATE
const create = async(req,res) => {
    try {
        const comment = await Comment.create(req.body);
        return res.status(201).json({message: "Comentário postado!", comment: comment});
    } catch (err) {
        res.status(500).json({error: err});
    }
};

//UPDATE
const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await Comment.update(req.body, {where: {id: id}});
        if (updated) {
            const comment = await Comment.findByPk(id);
            return res.status(200).send(comment);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Comentário não encontrado");
    }
};

//DELETE
const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await Comment.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Comentário deletado com sucesso.");
        }
        throw new Error ();
    } catch (err) {
        return res.status(500).json("Comentário não encontrado")
    }
};

//relationships
//with user
const addRelationUser = async(req,res) => {
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

//with media
const addRelationMedia = async(req,res) => {
    const {id} = req.params;
    try {
        const media = await Media.findByPk(id);
        const comment = await Comment.findByPk(req.body.CommentId);
        await media.setComment(comment);
        return res.status(200).json(media);
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
    addRelationUser,
    addRelationMedia,
};