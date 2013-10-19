// get admin */*
exports.index = function(req ,res){
	console.log(req.session.login)
	req.session.login ? res.render('admin') : res.render('login');
	true ? res.render('admin') : res.render('login');
};
// get  */admin/login*
exports.login = function(req, res){
	var login = req.query.login,
		pass = req.query.password;
	
	if( login !== 'media@media.com' || pass !== 'media1media' ){
		req.session.login = false;
		res.redirect('/admin');
		return;
	};

	req.session.login = true;
	res.redirect('/admin');
	
};