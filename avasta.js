'use strict';

module.exports = createStatusCodes;

function createStatusCodes (hash) {
	const nameToCode = new Map();
	const codeToName = new Map();

	// Pre-process hash for subsequent instant access
	Object.keys(hash).forEach((codeStr) => {
		const code = +codeStr;
		if (isNaN(code) || typeof codeStr !== 'string' || codeStr.length !== 6) {
			throw `Invalid code specified: ${codeStr}`;
		}
		const name = hash[codeStr];
		const status = Math.floor(code / 1000);
		nameToCode.set(name, {
			status,
			code,
		});
		codeToName.set(code, name);
	});

	function expressJsonResponse (res, name, message) {
		let result = nameToCode.get(name);
		if (!result) {
			result = {
				status: 599,
				code: 599999,
			};
		}

		// name should never be exposed
		res.status(result.status).json({
			code: result.code,
			message,
		});
	}

	return {
		nameToCode,
		codeToName,
		expressJsonResponse,
	};
}
