const { response } = require('express');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Friend = require('../models/Friend');
const Media = require('../models/Media');

//READ
const index = async(req,res) => {
    try {
        const media = await Media.findAll();
        return res.status(200).json({media});
    } catch (err) {
        return res.status(500).json({err});
    }
};


const show = async(req,res) => {
    const {id} = req.params;
    try {
        const media = await Media.findByPk(id);
        return res.status(200).json({media});
    } catch (err) {
        return res.status(500).json({err});
    }
};

//CREATE
const create = async(req,res) => {
    try {
        const media = await Media.create(req.body);
        return res.status(201).json({message: "Mídia cadastrada com sucesso!", media: media});
    } catch (err) {
        res.status(500).json({error: err});
    }
};

//UPDATE
const update = async(req,res) => {
    const {id} = req.params;
    try {
        const [updated] = await Media.update(req.body, {where: {id: id}});
        if (updated) {
            const media = await Media.findByPk(id);
            return res.status(200).send(media);
        }
        throw new Error();
    } catch (err) {
        return res.status(500).json("Mídia não encontrada");
    }
};

//DELETE
const destroy = async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await Media.destroy({where: {id: id}});
        if(deleted) {
            return res.status(200).json("Mídia deletada com sucesso.");
        }
        throw new Error ();
    } catch (err) {
        return res.status(500).json("Mídia não encontrada")
    }
};

//relationships
//with comments
const addRelationComment = async(req,res) => {
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

//with users
const addRelationUser = async(req,res) => {
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

const removeRelationUser = async(req,res) => {
    const {id} = req.params;
    try {
        const users = await User.findByPk(id);
        await user.setMedia(null);
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
    addRelationComment,
    addRelationUser,
    addRelationUser,
};