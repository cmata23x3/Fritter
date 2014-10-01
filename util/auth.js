var Auth = {};

Auth.isAuthenticated = function (req, res, next) {
	console.log("called isAuthenticated: ", req.session.user);
	if (req.session.user !== undefined){
		return next();
	}
	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	res.redirect('/');
};

Auth.isNotAuthenticated = function(req, res, next){
	if (req.session.user === undefined){
		return next();
	}
	// IF A USER ISLOGGED IN, THEN REDIRECT THEM TO HOME
	res.redirect('/home');
}

module.exports = Auth;