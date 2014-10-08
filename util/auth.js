var Auth = {};

/*
* Middleware method that checks if a user is signed into Fritter.
* Method checks if the current req.session.user value is defined. 
* If it is not then, the app redirects to the root. 
*
* @method Auth.isAuthenticated
* @param req object from the request
* @param res object from the response
* @param next callback to the next method
*/
Auth.isAuthenticated = function (req, res, next) {
	if (req.session.user !== undefined){
		return next();
	}
	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	res.redirect('/');
};

/*
* Middleware method that checks if a user is signed into Fritter.
* Method checks if the current req.session.user value is undefined. 
* If someone is logged in then, the app redirects to home. Else
* it proceeds. 
*
* @method Auth.isAuthenticated
* @param req object from the request
* @param res object from the response
* @param next callback to the next method
*/
Auth.isNotAuthenticated = function(req, res, next){
	if (req.session.user === undefined){
		return next();
	}
	// IF A USER ISLOGGED IN, THEN REDIRECT THEM TO HOME
	res.redirect('/home');
}

module.exports = Auth;