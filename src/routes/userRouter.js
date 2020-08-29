const { Router } = require( "express" );
const { makeCall } = require("../helpers");

const user = require( "../controllers/userController" );
const { jwtMiddleware } = require( "../middleware/jwt" );

const userRouter = Router();

userRouter.get( "/current/:authorization", jwtMiddleware, ( req, res ) => makeCall( req, res, user.get ) );
userRouter.patch( "/current/:authorization", jwtMiddleware, ( req, res ) => makeCall( req, res, user.update ) );

module.exports = userRouter;
