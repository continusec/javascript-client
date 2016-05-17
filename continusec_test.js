
var testGlobal = {};

function testContinusec(idx) {
	switch(idx) {
	case 0:
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.getTreeHead(0, function (treeHead) {
			throw "expected failure";
		}, function (reason) {
			if (reason != CONTINUSEC_NOT_FOUND_ERROR) {
				throw reason;
			}
			testContinusec(idx+1);
		});
		break;
	case 1: 
		var client = new ContinusecClient("7981306761429961588", "wrongcred", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.getTreeHead(0, function (treeHead) {
			throw "expected failure";
		}, function (reason) {
			if (reason != CONTINUSEC_UNAUTHORIZED_ERROR) {
				throw reason;
			}
			testContinusec(idx+1);
		});
		break;
	case 2: 
		var client = new ContinusecClient("wrongaccount", "wrongcred", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.getTreeHead(0, function (treeHead) {
			throw "expected failure";
		}, function (reason) {
			if (reason != CONTINUSEC_NOT_FOUND_ERROR) {
				throw reason;
			}
			testContinusec(idx+1);
		});
		break;
	case 3: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.create(function () {
			log.create(function () {
				throw "expected failure";
			}, function (reason) {
				if (reason != CONTINUSEC_OBJECT_CONFLICT_ERROR) {
					throw reason;
				}
				testContinusec(idx+1);
			});
		}, function (reason) {
			throw reason;
		});
		break;
	case 4: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.add(new RawDataEntry("foo"), function () {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 5: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.add(new JsonEntry("{\"name\":\"adam\",\"ssn\":123.45}"), function () {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 6: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.add(new RedactableJsonEntry("{\"name\":\"adam\",\"ssn\":123.45}"), function () {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 7: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.add(new RawDataEntry("foo"), function (aer) {
		    log.blockUntilPresent(aer, function (head) {
                testContinusec(idx+1);
		    }, function (reason) {
		        throw reason;
		    });
		}, function (reason) {
		    throw reason;
		});
		break;
	case 8: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        log.getTreeHead(0, function (head) {
            if (head.getTreeSize() != 3) {
                throw "wrong";
            }
            testGlobal.head = head;
            testContinusec(idx+1);
        }, function (reason) {
            throw reason;
        });
		break;
	case 9: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		
		if (testGlobal.idx == undefined) {
		    testGlobal.idx = 0
		}
		
		if (testGlobal.idx == 100) {
            testContinusec(idx+1);
		} else {
            log.add(new RawDataEntry("foo-" + testGlobal.idx), function () {
                testGlobal.idx += 1;
                testContinusec(idx);
            }, function (reason) {
                throw reason;
            });
        }
		break;
	case 10: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        log.getVerifiedLatestTreeHead(testGlobal.head, function (head) {
            if (head.getTreeSize() != 103) {
                throw "wrong";
            }
            testGlobal.head103 = head;
            testContinusec(idx+1);
        }, function (reason) {
            throw reason;
        });
		break;
	case 11: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.verifyInclusion(testGlobal.head103, new RawDataEntry("foo27"), function () {
		    throw "wrong";
		}, function (reason) {
            testContinusec(idx+1);
		});
		break;
	case 12: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.getInclusionProof(testGlobal.head103.getTreeSize(), new RawDataEntry("foo-27"), function (proof) {
		    try {
		        proof.verify(testGlobal.head);
		        throw "wrong";
		    } catch (err) {
		        if (err == CONTINUSEC_VERIFICATION_ERROR) {
                    testContinusec(idx+1);
		        } else {
		            throw err;
		        }
		    }
		}, function (reason) {
            throw reason;
		});
		break;
	case 13: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        log.getTreeHead(50, function (head) {
            if (head.getTreeSize() != 50) {
                throw "wrong";
            }
            testGlobal.head50 = head;
            testContinusec(idx+1);
        }, function (reason) {
            throw reason;
        });
		break;
	case 14: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        log.getConsistencyProof(50, 103, function (proof) {
            proof.verify(testGlobal.head50, testGlobal.head103);
            try {
                proof.verify(testGlobal.head, testGlobal.head103);
                throw "Wrong";
		    } catch (err) {
		        if (err == CONTINUSEC_VERIFICATION_ERROR) {
                    testContinusec(idx+1);
		        } else {
		            throw err;
		        }
		    }
        }, function (reason) {
            throw reason;
        });
		break;
	case 15: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        log.getInclusionProof(10, new RawDataEntry("foo"), function (proof) {
            log.verifySuppliedInclusionProof(testGlobal.head103, proof, function (head) {
                if (head.getTreeSize() != 10) {
                    throw "error";
                } else {
                    testContinusec(idx+1);
                }
            }, function (reason) {
                throw reason;
            });
        }, function (reason) {
            throw reason;
        });
		break;
	case 16: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		var count = 0;
        log.verifyEntries(null, testGlobal.head103, RAW_DATA_ENTRY_FACTORY, function (idx, entry) {
            entry.getData();
            count += 1;
        }, function () {
            if (count != 103) {
                throw "wrong";
            }
            testContinusec(idx+1);
        }, function (reason) {
            throw reason;
        });
		break;
	case 17: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.getTreeHead(1, function (head) {
		    testGlobal.head1 = head;
            var count = 0;
            log.verifyEntries(head, testGlobal.head103, JSON_ENTRY_FACTORY, function (idx, entry) {
                entry.getData();
                count += 1;
            }, function () {
                throw "should not succeed";
            }, function (reason) {
                if (reason != CONTINUSEC_NOT_ALL_ENTRIES_RETURNED_ERROR) {
                    throw reason;
                }
                testContinusec(idx+1);
            });
        }, function (reason) {
            throw reason;
        });
		break;
	case 18: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
		log.getTreeHead(3, function (head3) {
            var count = 0;
            log.verifyEntries(testGlobal.head1, head3, JSON_ENTRY_FACTORY, function (idx, entry) {
                entry.getData();
                count += 1;
            }, function () {
                if (count != 2) {
                    throw "wrong";
                }
                testContinusec(idx+1);
            }, function (reason) {
                throw reason;
            });
        }, function (reason) {
            throw reason;
        });
		break;
	case 19: 
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        var count = 0;
        log.verifyEntries(testGlobal.head50, testGlobal.head103, RAW_DATA_ENTRY_FACTORY, function (idx, entry) {
            entry.getData();
            count += 1;
        }, function () {
            if (count != 53) {
                throw "wrong";
            }
            testContinusec(idx+1);
        }, function (reason) {
            throw reason;
        });
		break;
	}
}

/*



	JsonEntry je = new JsonEntry("{	\"ssn\":  123.4500 ,   \"name\" :  \"adam\"}".getBytes());
	log.verifyInclusion(head103, je);

	VerifiableEntry redEnt = log.get(2, RedactedJsonEntryFactory.getInstance());
	String dd = new String(redEnt.getData());
	if (dd.indexOf("ssn") >= 0) {
		throw new RuntimeException();
	}
	if (dd.indexOf("adam") < 0) {
		throw new RuntimeException();
	}
	log.verifyInclusion(head103, redEnt);

	client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
	log = client.getVerifiableLog("newtestlog");

	redEnt = log.get(2, RedactedJsonEntryFactory.getInstance());
	dd = new String(redEnt.getData());
	if (dd.indexOf("123.45") < 0) {
		throw new RuntimeException();
	}
	if (dd.indexOf("adam") < 0) {
		throw new RuntimeException();
	}
	log.verifyInclusion(head103, redEnt);

	VerifiableMap map = client.getVerifiableMap("nnewtestmap");
	try {
		map.getTreeHead(client.HEAD);
		throw new RuntimeException();
	} catch (ObjectNotFoundException e) {
		// good
	}

	map.create();
	try {
		map.create();
		throw new RuntimeException();
	} catch (ObjectConflictException e) {
		// good
	}

	map.set("foo".getBytes(), new RawDataEntry("foo".getBytes()));
	map.set("fiz".getBytes(), new JsonEntry("{\"name\":\"adam\",\"ssn\":123.45}".getBytes()));
	AddEntryResponse waitResponse = map.set("foz".getBytes(), new RedactableJsonEntry("{\"name\":\"adam\",\"ssn\":123.45}".getBytes()));

	for (int i = 0; i < 100; i++) {
		map.set(("foo"+i).getBytes(), new RawDataEntry(("fooval"+i).getBytes()));
	}

	map.delete("foo".getBytes());
	map.delete("foodddd".getBytes());
	map.delete("foo27".getBytes());

	LogTreeHead mlHead = map.getMutationLog().blockUntilPresent(waitResponse);
	if (mlHead.getTreeSize() != 106) {
		throw new RuntimeException();
	}

	MapTreeHead mrHead = map.blockUntilSize(mlHead.getTreeSize());
	if (mrHead.getMutationLogTreeHead().getTreeSize() != 106) {
		throw new RuntimeException();
	}
	MapGetEntryResponse entryResp = map.get("foo".getBytes(), mrHead.getTreeSize(), RawDataEntryFactory.getInstance());
	entryResp.verify(mrHead);

	dd = new String(entryResp.getValue().getData());
	if (dd.length() > 0) {
		throw new RuntimeException();
	}

	entryResp = map.get("foo-29".getBytes(), mrHead.getTreeSize(), RawDataEntryFactory.getInstance());
	entryResp.verify(mrHead);

	dd = new String(entryResp.getValue().getData());
	if (dd.length() > 0) {
		throw new RuntimeException();
	}

	entryResp = map.get("foo29".getBytes(), mrHead.getTreeSize(), RawDataEntryFactory.getInstance());
	entryResp.verify(mrHead);

	dd = new String(entryResp.getValue().getData());
	if (!"fooval29".equals(dd)) {
		throw new RuntimeException();
	}

	MapTreeState mapState106 = map.getVerifiedLatestMapState(null);
	map.getVerifiedMapState(mapState106, 0);
	MapTreeState mapState2 = map.getVerifiedMapState(mapState106, 2);

	if (mapState2.getTreeSize() != 2) {
		throw new RuntimeException();
	}

	VerifiableEntry ve = map.getVerifiedValue("foo".getBytes(), mapState2, RawDataEntryFactory.getInstance());
	if (!"foo".equals(new String(ve.getData()))) {
		throw new RuntimeException();
	}*/

