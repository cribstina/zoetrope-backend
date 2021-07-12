const { Router } = require('express');
const UserController = require('../controllers/UserController');
const CommentController = require('../controllers/CommentController');
const FriendController = require('../controllers/FriendController');
const MediaController = require('../controllers/MediaController');

const router = Router();

//to user
router.get('/users',UserController.index);
router.get('/users/:id',UserController.show);
router.post('/users',UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);
router.put('/usersaddcomment/:id', UserController.addRelationComment);
router.put('/usersaddfriend/:id', UserController.addRelationFriend);
router.put('/usersaddmedia/:id', UserController.addRelationMedia);
router.delete('/usersremovefriend/:id', UserController.removeRelationFriend);
router.delete('/usersremovemedia/:id', UserController.removeRelationMedia);

//to friend
router.get('/friends',FriendController.index);
router.get('/friends/:id',FriendController.show);
router.post('/friends',FriendController.create);
router.put('/friends/:id', FriendController.update);
router.delete('/friends/:id', FriendController.destroy);

//to comment
router.get('/comments',CommentController.index);
router.get('/comments/:id',CommentController.show);
router.post('/comments',CommentController.create);
router.put('/comments/:id', CommentController.update);
router.delete('/comments/:id', CommentController.destroy);

//to media
router.get('/media',MediaController.index);
router.get('/media/:id',MediaController.show);
router.post('/media',MediaController.create);
router.put('/media/:id', MediaController.update);
router.delete('/media/:id', MediaController.destroy);

module.exports = router;
