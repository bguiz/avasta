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

	function response (name, message) {
		let result = nameToCode.get(name);
		if (!result) {
			result = {
				status: 599,
				code: 599999,
			};
		}
		// name should never be exposed
		return Object.assign({ message }, result);
	}

	function expressJsonResponse (res, name, message) {
		const result = response(name, message);

		res.status(result.status).json({
			code: result.code,
			message: result.message,
		});
	}

	function schwagResponse (output, name, message) {
		const result = response(name, message);

		output.status = result.status;
		output.body = {
			code: result.code,
			message: result.message,
		};
	}

	return {
		nameToCode,
		codeToName,
		response,
		expressJsonResponse,
		schwagResponse,
	};
}
