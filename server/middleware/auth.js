import jwt from 'jsonwebtoken';

/*
Middleware explain:
Basically, if, say, the user wants to like a post, they will first
click the like button => auth middleware will check if they have
the persmission to => middleware call next => like controller
*/

// next is for "do something and then move to the next thing"
export const auth = async (req, res, next) => {
    try {
        // check if the token is valid
        const token = req.headers.authorization.split(" ")[1];

        // if the token is longer than 500, that comes from Google Auth
        // else it comes from our own auth
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            // sub is Google's name for a specific id
            // to differentiate Google users
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}