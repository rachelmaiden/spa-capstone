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
exports.receptionistnauthed = (req, res, next) => {
	req.session.user?
		next():
		res.redirect("/receptionist/receptionist")
}
exports.guestistnauthed = (req, res, next) => {
	req.session.user?
		next():
		res.redirect("/customer/login")
}

