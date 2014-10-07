var helper = {};
var _ = require('underscore');

/*
*
*
*/
helper.modifyUsers = function(allUsers, currentPersonUsername){
	console.log("allusers: ", allUsers);
	var personOfInterest = _.findWhere(allUsers, {'username': currentPersonUsername});
	var following = personOfInterest.following;
	var followers = personOfInterest.followers;
	var knownUsers = _.union(following, followers);
	var neitherUsers = _.reject(allUsers, function(user){
		return _.findWhere(knownUsers, {username: user.username});
	});
	console.log("neitherUsers: ", neitherUsers);
	return [neitherUsers, following, followers];
}

module.exports = helper;