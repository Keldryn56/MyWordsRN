export const validateEmail = (mail) => {
	console.log(mail);

	let regex =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

	if (regex.test(mail)) {
		return true;
	} else {
		return false;
	}
};

export const validatePassword = (password) => {
	if (password.length < 8) {
        console.log('là')
		return false;
	}
	if (password.search(/[a-z]/i) < 0) {
        console.log('ici')
		return false;
	}
	if (password.search(/[0-9]/) < 0) {
        console.log('là')
		return false;
	}

	return true;
};
