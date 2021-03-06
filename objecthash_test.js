/* NOTE: this source file MUST be saved as UTF-16 or one of the objecthash unicode examples fails */

function testObjectHash() {
	var test_data = [
		{
			"json": '[]',
			"answer": "acac86c0e609ca906f632b0e2dacccb2b77d22b0621f20ebece1a4835b93f6f0"
		},
		{
			"json": '["foo"]',
			"answer": "268bc27d4974d9d576222e4cdbb8f7c6bd6791894098645a19eeca9c102d0964"
		},
		{
			"json": '["foo", "bar"]',
			"answer": "32ae896c413cfdc79eec68be9139c86ded8b279238467c216cf2bec4d5f1e4a2"
		},
		{
			"json": '[123]',
			"answer": "2e72db006266ed9cdaa353aa22b9213e8a3c69c838349437c06896b1b34cee36"
		},
		{
			"json": '[1, 2, 3]',
			"answer": "925d474ac71f6e8cb35dd951d123944f7cabc5cda9a043cf38cd638cc0158db0"
		},
		{
			"json": '[123456789012345]',
			"answer": "f446de5475e2f24c0a2b0cd87350927f0a2870d1bb9cbaa794e789806e4c0836"
		},
		{
			"json": '[123456789012345, 678901234567890]',
			"answer": "d4cca471f1c68f62fbc815b88effa7e52e79d110419a7c64c1ebb107b07f7f56"
		},
		{
			"json": '{}',
			"answer": "18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4"
		},
		{
			"json": '{"foo": "bar"}',
			"answer": "7ef5237c3027d6c58100afadf37796b3d351025cf28038280147d42fdc53b960"
		},
		{
			"json": '{"foo": ["bar", "baz"], "qux": ["norf"]}',
			"answer": "f1a9389f27558538a064f3cc250f8686a0cebb85f1cab7f4d4dcc416ceda3c92"
		},
		{
			"json": '[null]',
			"answer": "5fb858ed3ef4275e64c2d5c44b77534181f7722b7765288e76924ce2f9f7f7db"
		},
		{
			"json": 'true',
			"answer": "7dc96f776c8423e57a2785489a3f9c43fb6e756876d6ad9a9cac4aa4e72ec193"
		},
		{
			"json": 'false',
			"answer": "c02c0b965e023abee808f2b548d8d5193a8b5229be6f3121a6f16e2d41a449b3"
		},
		{
			"json": '1.2345',
			"answer": "844e08b1195a93563db4e5d4faa59759ba0e0397caf065f3b6bc0825499754e0"
		},
		{
			"json": '-10.1234',
			"answer": "59b49ae24998519925833e3ff56727e5d4868aba4ecf4c53653638ebff53c366"
		},
		{
			"json": '-0.1',
			"answer": "55ab03db6fbb5e6de473a612d7e462ca8fd2387266080980e87f021a5c7bde9f"
		},
		{
			"json": '0',
			"answer": "60101d8c9cb988411468e38909571f357daa67bff5a7b0a3f9ae295cd4aba33d"
		},
		{
			"json": '["foo", {"bar": ["baz", null, 1.0, 1.5, 0.0001, 1000.0, 2.0, -23.1234, 2.0]}]',
			"answer": "783a423b094307bcb28d005bc2f026ff44204442ef3513585e7e73b66e3c2213"
		},
		{
			"json": '["foo", {"bar": ["baz", null, 1, 1.5, 0.0001, 1000, 2, -23.1234, 2]}]',
			"answer": "783a423b094307bcb28d005bc2f026ff44204442ef3513585e7e73b66e3c2213"
		},
		{
			"json": '["foo", {"b4r": ["baz", null, 1, 1.5, 0.0001, 1000, 2, -23.1234, 2]}]',
			"answer": "7e01f8b45da35386e4f9531ff1678147a215b8d2b1d047e690fd9ade6151e431"
		},
		{
			"json": '{"k1": "v1", "k2": "v2", "k3": "v3"}',
			"answer": "ddd65f1f7568269a30df7cafc26044537dc2f02a1a0d830da61762fc3e687057"
		},
		{
			"json": '{"k2": "v2", "k1": "v1", "k3": "v3"}',
			"answer": "ddd65f1f7568269a30df7cafc26044537dc2f02a1a0d830da61762fc3e687057"
		},
		{
			"json": '"ԱԲաբ"', // guess what, we need to save *THIS* file as UTF-16 for this to work.
			"answer": "2a2a4485a4e338d8df683971956b1090d2f5d33955a81ecaad1a75125f7a316c"
		},
		{
			"json": '"\u03d3"',
			"answer": "f72826713a01881404f34975447bd6edcb8de40b191dc57097ebf4f5417a554d"
		},
		{
			"json": '"\u03d2\u0301"',
			"answer": "f72826713a01881404f34975447bd6edcb8de40b191dc57097ebf4f5417a554d"
		},
	];
	for (var i = 0; i < test_data.length; i++) {
		var obj = JSON.parse(test_data[i].json);
		var answer = decodeHex(test_data[i].answer);

		var oh = objectHash(obj);
		if (oh == answer) {
			console.log("Match! - " + test_data[i].json);
		} else {
			console.log("Fail! - " + test_data[i].json);
		}
	}
}
