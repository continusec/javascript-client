
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
	case 20:
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        var je = new JsonEntry("{	\"ssn\":  123.4500 ,   \"name\" :  \"adam\"}");
        log.verifyInclusion(testGlobal.head103, je, function () {
            testContinusec(idx+1);
        }, function (reason) {
            throw reason;
        });
		break;
	case 21:
		var client = new ContinusecClient("7981306761429961588", "c9fc80d4e19ddbf01a4e6b5277a29e1bffa88fe047af9d0b9b36de536f85c2c6", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        log.getEntry(2, REDACTED_JSON_ENTRY_FACTORY, function (redEnt) {
            var dd = redEnt.getData();
            if (dd.indexOf("ssn") >= 0) {
                throw "wrong";
            } else if (dd.indexOf("adam") < 0) {
                throw "wrong";
            } else {
                log.verifyInclusion(testGlobal.head103, redEnt, function () {
                    testContinusec(idx+1);
                }, function (reason) {
                    throw reason;
                });
            }
        }, function (reason) {
            throw reason;
        });
		break;
	case 22:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var log = client.getVerifiableLog("newtestlog");
        log.getEntry(2, REDACTED_JSON_ENTRY_FACTORY, function (redEnt) {
            var dd = redEnt.getData();
            if (dd.indexOf("123.45") < 0) {
                throw "wrong";
            } else if (dd.indexOf("adam") < 0) {
                throw "wrong";
            } else {
                log.verifyInclusion(testGlobal.head103, redEnt, function () {
                    testContinusec(idx+1);
                }, function (reason) {
                    throw reason;
                });
            }
        }, function (reason) {
            throw reason;
        });
		break;
	case 23:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.getTreeHead(0, function () {
		    throw "Wrong";
		}, function (reason) {
			if (reason != CONTINUSEC_NOT_FOUND_ERROR) {
				throw reason;
			}
            testContinusec(idx+1);
		});
   		break;
	case 24:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.create(function () {
		   map.create(function () {
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
	case 25:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.setValue("foo", new RawDataEntry("foo"), function () {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 26:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.setValue("fiz", new JsonEntry("{\"name\":\"adam\",\"ssn\":123.45}"), function () {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 27:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.setValue("foz", new RedactableJsonEntry("{\"name\":\"adam\",\"ssn\":123.45}"), function (resp) {
		    testGlobal.mapResp = resp;
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 28:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");

		if (testGlobal.mapIdx == undefined) {
		    testGlobal.mapIdx = 0
		}

		if (testGlobal.mapIdx == 100) {
            testContinusec(idx+1);
		} else {
            map.setValue("foo" + testGlobal.mapIdx, new RawDataEntry("fooval" + testGlobal.mapIdx), function () {
                testGlobal.mapIdx += 1;
                testContinusec(idx);
            }, function (reason) {
                throw reason;
            });
        }
		break;
	case 29:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.deleteValue("foo", function (resp) {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 30:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.deleteValue("foodddd", function (resp) {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 31:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		map.deleteValue("foo27", function (resp) {
            testContinusec(idx+1);
		}, function (reason) {
		    throw reason;
		});
		break;
	case 32:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
		var ml = map.getMutationLog();
        ml.blockUntilPresent(testGlobal.mapResp, function (head) {
            if (head.getTreeSize() != 106) {
                throw "wrong";
            } else {
                map.blockUntilSize(head.getTreeSize(), function (mapHead) {
                    if (mapHead.getTreeSize() != 106) {
                        throw "wrong";
                    } else {
                        testGlobal.mrHead = mapHead;
                        testContinusec(idx+1);
                    }
                }, function (reason) {
                    throw reason;
                });
            }
        }, function (reason) {
            throw reason;
        });
		break;
	case 33:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
        map.getValue("foo", testGlobal.mrHead.getTreeSize(), RAW_DATA_ENTRY_FACTORY, function (entryResp) {
            entryResp.verify(testGlobal.mrHead);
            var dd = entryResp.getValue().getData();
            if (dd.length > 0) {
                throw dd;
            } else {
                testContinusec(idx+1);
            }
        }, function (reason) {
            throw reason;
        });
		break;
	case 34:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
        map.getValue("foo-29", testGlobal.mrHead.getTreeSize(), RAW_DATA_ENTRY_FACTORY, function (entryResp) {
            entryResp.verify(testGlobal.mrHead);
            var dd = entryResp.getValue().getData();
            if (dd.length > 0) {
                throw dd;
            } else {
                testContinusec(idx+1);
            }
        }, function (reason) {
            throw reason;
        });
		break;
	case 35:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
        map.getValue("foo29", testGlobal.mrHead.getTreeSize(), RAW_DATA_ENTRY_FACTORY, function (entryResp) {
            entryResp.verify(testGlobal.mrHead);
            var dd = entryResp.getValue().getData();
            if (dd != "fooval29") {
                throw dd;
            } else {
                testContinusec(idx+1);
            }
        }, function (reason) {
            throw reason;
        });
		break;
	case 36:
		var client = new ContinusecClient("7981306761429961588", "allseeing", "http://localhost:8080");
		var map = client.getVerifiableMap("nnewtestmap");
        map.getVerifiedLatestMapState(null, function (mapState106) {
            map.getVerifiedMapState(mapState106, 0, function () {
                map.getVerifiedMapState(mapState106, 2, function (mapState2) {
                    if (mapState2.getTreeSize() != 2) {
                        throw "2";
                    } else {
                        map.getVerifiedValue("foo", mapState2, RAW_DATA_ENTRY_FACTORY, function (ve) {
                            if (ve.getData() != "foo") {
                                throw ve;
                            } else {
                                console.log("All tests completed sucessfully.");
                            }
                        }, function (reason) {
                            throw reason;
                        });
                    }
                }, function (reason) {
                    throw reason;
                });
            }, function (reason) {
                throw reason;
            });
        }, function (reason) {
            throw reason;
        });
		break;
	}
}
