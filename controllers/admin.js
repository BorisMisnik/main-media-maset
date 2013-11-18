// get admin */*
exports.index = function(req ,res){
	console.log( req.session.update );
	req.session.login ? res.render('admin', {save : req.session.update}) : res.render('login');
	req.session.update = false;
};
// get  */admin/login*
exports.login = function(req, res){
	var login = req.query.login,
		pass = req.query.password;
	
	// if( login !== '1' || pass !== '1' ){
	if( login !== 'media@media.com' || pass !== 'media1media' ){
		req.session.login = false;
		res.redirect('/admin');
		return;
	};

	req.session.login = true;
	res.redirect('/admin');
	
};