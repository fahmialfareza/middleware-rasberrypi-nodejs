
function AccountValidator() {
	// build array maps of the form inputs & control groups //

	this.formFields = [$('#name-tf'), $('#email-tf'), $('#username-tf'), $('#password-tf')];
	this.controlGroups = [$('#name-cg'), $('#email-cg'), $('#username-cg'), $('#password-cg')];

	// bind the form-error modal window to this controller to display any errors //

	this.alert = $('.modal-form-errors');
	this.alert.modal({ show: false, keyboard: true, backdrop: true });

	this.validateName = function (s) {
		return s.length >= 3;
	}

	this.validatePassword = function (s) {
		// if user is logged in and hasn't changed their password, return ok
		if ($('#username-tf').val() && s === '') {
			return true;
		} else {
			return s.length >= 6;
		}
	}

	this.validateEmail = function (e) {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}

	this.validateUsername = function (s) {
		return s.length >= 4;
	}

	this.showErrors = function (a) {
		$('.modal-form-errors .modal-body p').text('Please correct the following problems :');
		let ul = $('.modal-form-errors .modal-body ul');
		ul.empty();
		for (let i = 0; i < a.length; i++) ul.append('<li>' + a[i] + '</li>');
		this.alert.modal('show');
	}

}

AccountValidator.prototype.showInvalidEmail = function () {
	this.controlGroups[1].addClass('error');
	this.showErrors(['That email address is already in use.']);
}

AccountValidator.prototype.showInvalidUserName = function () {
	this.controlGroups[2].addClass('error');
	this.showErrors(['That username is already in use.']);
}

AccountValidator.prototype.validateForm = function () {
	let e = [];
	for (let i = 0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateName(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Please Enter Your Name');
	}
	if (this.validateEmail(this.formFields[1].val()) == false) {
		this.controlGroups[1].addClass('error'); e.push('Please Enter A Valid Email');
	}
	if (this.validateUsername(this.formFields[2].val()) == false) {
		this.controlGroups[2].addClass('error');
		e.push('Username Should Be At Least 4 Characters')
	}
	if (this.validatePassword(this.formFields[3].val()) == false) {
		this.controlGroups[3].addClass('error');
		e.push('Password Should Be At Least 6 Characters');
	}
	if (e.length) this.showErrors(e);
	return e.length === 0;
}

