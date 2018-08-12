exports.frontdesknauthed = (req, res, next) => {
	req.session.user?
		next():
		res.redirect("/frontdesk")
}
exports.adminnauthed = (req, res, next) => {
	req.session.user?
		next():
		res.redirect("/admin/admin")
}

