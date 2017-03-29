'use strict';

const avasta = require('./avasta.js');

describe('[avasta]', () => {
	let res;
	let resStatus;
	let resJson;
 	let testCodes;
 	let testAvasta;

	beforeAll(() => {
		testCodes = require('./avasta.unit.jest.json');
		testAvasta = avasta(testCodes);
		resJson = jest.fn().mockImplementation(() => {
			return;
		});
		resStatus = jest.fn().mockImplementation(() => {
			return {
				json: resJson,
			};
		});
		res = {
			status: resStatus,
		};
	});

	it('handle name and message', () => {
		testAvasta.expressJsonResponse(res, '1st 400 error', 'custom message');
		expect({
			status: resStatus.mock.calls[resStatus.mock.calls.length - 1][0],
			json: resJson.mock.calls[resJson.mock.calls.length - 1][0],
		}).toMatchSnapshot();
	});

	it('handle name without message', () => {
		testAvasta.expressJsonResponse(res, '1st 400 error');
		expect({
			status: resStatus.mock.calls[resStatus.mock.calls.length - 1][0],
			json: resJson.mock.calls[resJson.mock.calls.length - 1][0],
		}).toMatchSnapshot();
	});

	it('handle undefined name', () => {
		testAvasta.expressJsonResponse(res, 'this is not a known name');
		expect({
			status: resStatus.mock.calls[resStatus.mock.calls.length - 1][0],
			json: resJson.mock.calls[resJson.mock.calls.length - 1][0],
		}).toMatchSnapshot();
	});

});
