/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 as defined in FIPS PUB 198a
 Copyright Brian Turek 2008-2015
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information
 Several functions taken from Paul Johnston
*/
'use strict';(function(H){function v(c,a,b){var g=0,d=[],f=0,e,h,n,l,m,F,r,p=!1,k=!1,q=[],t=[],u,y=!1;b=b||{};e=b.encoding||"UTF8";u=b.numRounds||1;n=z(a,e);if(u!==parseInt(u,10)||1>u)throw Error("numRounds must a integer >= 1");F=function(a,b){return A(a,b,c)};r=function(a,b,f,d){var g,e;if("SHA-224"===c||"SHA-256"===c)g=(b+65>>>9<<4)+15,e=16;else throw Error("Unexpected error in SHA-2 implementation");for(;a.length<=g;)a.push(0);a[b>>>5]|=128<<24-b%32;a[g]=b+f;f=a.length;for(b=0;b<f;b+=e)d=A(a.slice(b,
b+e),d,c);if("SHA-224"===c)a=[d[0],d[1],d[2],d[3],d[4],d[5],d[6]];else if("SHA-256"===c)a=d;else throw Error("Unexpected error in SHA-2 implementation");return a};if("SHA-224"===c)m=512,l=224;else if("SHA-256"===c)m=512,l=256;else throw Error("Chosen SHA variant is not supported");h=w(c);this.setHMACKey=function(a,b,d){var f;if(!0===k)throw Error("HMAC key already set");if(!0===p)throw Error("Cannot set HMAC key after finalizing hash");if(!0===y)throw Error("Cannot set HMAC key after calling update");
e=(d||{}).encoding||"UTF8";b=z(b,e)(a);a=b.binLen;b=b.value;f=m>>>3;d=f/4-1;if(f<a/8){for(b=r(b,a,0,w(c));b.length<=d;)b.push(0);b[d]&=4294967040}else if(f>a/8){for(;b.length<=d;)b.push(0);b[d]&=4294967040}for(a=0;a<=d;a+=1)q[a]=b[a]^909522486,t[a]=b[a]^1549556828;h=F(q,h);g=m;k=!0};this.update=function(a){var b,c,e,l=0,p=m>>>5;b=n(a,d,f);a=b.binLen;c=b.value;b=a>>>5;for(e=0;e<b;e+=p)l+m<=a&&(h=F(c.slice(e,e+p),h),l+=m);g+=l;d=c.slice(l>>>5);f=a%m;y=!0};this.getHash=function(a,b){var e,m,n;if(!0===
k)throw Error("Cannot call getHash after setting HMAC key");n=B(b);switch(a){case "HEX":e=function(a){return C(a,n)};break;case "B64":e=function(a){return D(a,n)};break;case "BYTES":e=E;break;default:throw Error("format must be HEX, B64, or BYTES");}if(!1===p)for(h=r(d,f,g,h),m=1;m<u;m+=1)h=r(h,l,0,w(c));p=!0;return e(h)};this.getHMAC=function(a,b){var e,n,q;if(!1===k)throw Error("Cannot call getHMAC without first setting HMAC key");q=B(b);switch(a){case "HEX":e=function(a){return C(a,q)};break;case "B64":e=
function(a){return D(a,q)};break;case "BYTES":e=E;break;default:throw Error("outputFormat must be HEX, B64, or BYTES");}!1===p&&(n=r(d,f,g,h),h=F(t,w(c)),h=r(n,l,m,h));p=!0;return e(h)}}function k(){}function I(c,a,b){var g=c.length,d,f,e,h,n;a=a||[0];b=b||0;n=b>>>3;if(0!==g%2)throw Error("String of HEX type must be in byte increments");for(d=0;d<g;d+=2){f=parseInt(c.substr(d,2),16);if(isNaN(f))throw Error("String of HEX type contains invalid characters");h=(d>>>1)+n;for(e=h>>>2;a.length<=e;)a.push(0);
a[e]|=f<<8*(3-h%4)}return{value:a,binLen:4*g+b}}function J(c,a,b){var g=[],d,f,e,h,g=a||[0];b=b||0;f=b>>>3;for(d=0;d<c.length;d+=1)a=c.charCodeAt(d),h=d+f,e=h>>>2,g.length<=e&&g.push(0),g[e]|=a<<8*(3-h%4);return{value:g,binLen:8*c.length+b}}function K(c,a,b){var g=[],d=0,f,e,h,n,l,m,g=a||[0];b=b||0;a=b>>>3;if(-1===c.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");e=c.indexOf("=");c=c.replace(/\=/g,"");if(-1!==e&&e<c.length)throw Error("Invalid '=' found in base-64 string");
for(e=0;e<c.length;e+=4){l=c.substr(e,4);for(h=n=0;h<l.length;h+=1)f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(l[h]),n|=f<<18-6*h;for(h=0;h<l.length-1;h+=1){m=d+a;for(f=m>>>2;g.length<=f;)g.push(0);g[f]|=(n>>>16-8*h&255)<<8*(3-m%4);d+=1}}return{value:g,binLen:8*d+b}}function C(c,a){var b="",g=4*c.length,d,f;for(d=0;d<g;d+=1)f=c[d>>>2]>>>8*(3-d%4),b+="0123456789abcdef".charAt(f>>>4&15)+"0123456789abcdef".charAt(f&15);return a.outputUpper?b.toUpperCase():b}function D(c,
a){var b="",g=4*c.length,d,f,e;for(d=0;d<g;d+=3)for(e=d+1>>>2,f=c.length<=e?0:c[e],e=d+2>>>2,e=c.length<=e?0:c[e],e=(c[d>>>2]>>>8*(3-d%4)&255)<<16|(f>>>8*(3-(d+1)%4)&255)<<8|e>>>8*(3-(d+2)%4)&255,f=0;4>f;f+=1)8*d+6*f<=32*c.length?b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e>>>6*(3-f)&63):b+=a.b64Pad;return b}function E(c){var a="",b=4*c.length,g,d;for(g=0;g<b;g+=1)d=c[g>>>2]>>>8*(3-g%4)&255,a+=String.fromCharCode(d);return a}function B(c){var a={outputUpper:!1,b64Pad:"="};
c=c||{};a.outputUpper=c.outputUpper||!1;a.b64Pad=c.b64Pad||"=";if("boolean"!==typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!==typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");return a}function z(c,a){var b;switch(a){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(c){case "HEX":b=I;break;case "TEXT":b=function(b,c,f){var e=[],h=[],n=0,l,m,k,r,p,e=c||[0];c=f||0;k=c>>>3;if("UTF8"===
a)for(l=0;l<b.length;l+=1)for(f=b.charCodeAt(l),h=[],128>f?h.push(f):2048>f?(h.push(192|f>>>6),h.push(128|f&63)):55296>f||57344<=f?h.push(224|f>>>12,128|f>>>6&63,128|f&63):(l+=1,f=65536+((f&1023)<<10|b.charCodeAt(l)&1023),h.push(240|f>>>18,128|f>>>12&63,128|f>>>6&63,128|f&63)),m=0;m<h.length;m+=1){p=n+k;for(r=p>>>2;e.length<=r;)e.push(0);e[r]|=h[m]<<8*(3-p%4);n+=1}else if("UTF16BE"===a||"UTF16LE"===a)for(l=0;l<b.length;l+=1){f=b.charCodeAt(l);"UTF16LE"===a&&(m=f&255,f=m<<8|f>>>8);p=n+k;for(r=p>>>
2;e.length<=r;)e.push(0);e[r]|=f<<8*(2-p%4);n+=2}return{value:e,binLen:8*n+c}};break;case "B64":b=K;break;case "BYTES":b=J;break;default:throw Error("format must be HEX, TEXT, B64, or BYTES");}return b}function t(c,a){return c>>>a|c<<32-a}function L(c,a,b){return c&a^~c&b}function M(c,a,b){return c&a^c&b^a&b}function N(c){return t(c,2)^t(c,13)^t(c,22)}function O(c){return t(c,6)^t(c,11)^t(c,25)}function P(c){return t(c,7)^t(c,18)^c>>>3}function Q(c){return t(c,17)^t(c,19)^c>>>10}function R(c,a){var b=
(c&65535)+(a&65535);return((c>>>16)+(a>>>16)+(b>>>16)&65535)<<16|b&65535}function S(c,a,b,g){var d=(c&65535)+(a&65535)+(b&65535)+(g&65535);return((c>>>16)+(a>>>16)+(b>>>16)+(g>>>16)+(d>>>16)&65535)<<16|d&65535}function T(c,a,b,g,d){var f=(c&65535)+(a&65535)+(b&65535)+(g&65535)+(d&65535);return((c>>>16)+(a>>>16)+(b>>>16)+(g>>>16)+(d>>>16)+(f>>>16)&65535)<<16|f&65535}function w(c){var a,b;a=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428];b=[1779033703,3144134277,
1013904242,2773480762,1359893119,2600822924,528734635,1541459225];switch(c){case "SHA-224":c=a;break;case "SHA-256":c=b;break;case "SHA-384":c=[new k,new k,new k,new k,new k,new k,new k,new k];break;case "SHA-512":c=[new k,new k,new k,new k,new k,new k,new k,new k];break;default:throw Error("Unknown SHA variant");}return c}function A(c,a,b){var g,d,f,e,h,n,l,m,k,r,p,t,q,v,u,y,w,z,A,B,C,D,x=[],E;if("SHA-224"===b||"SHA-256"===b)r=64,t=1,D=Number,q=R,v=S,u=T,y=P,w=Q,z=N,A=O,C=M,B=L,E=G;else throw Error("Unexpected error in SHA-2 implementation");
b=a[0];g=a[1];d=a[2];f=a[3];e=a[4];h=a[5];n=a[6];l=a[7];for(p=0;p<r;p+=1)16>p?(k=p*t,m=c.length<=k?0:c[k],k=c.length<=k+1?0:c[k+1],x[p]=new D(m,k)):x[p]=v(w(x[p-2]),x[p-7],y(x[p-15]),x[p-16]),m=u(l,A(e),B(e,h,n),E[p],x[p]),k=q(z(b),C(b,g,d)),l=n,n=h,h=e,e=q(f,m),f=d,d=g,g=b,b=q(m,k);a[0]=q(b,a[0]);a[1]=q(g,a[1]);a[2]=q(d,a[2]);a[3]=q(f,a[3]);a[4]=q(e,a[4]);a[5]=q(h,a[5]);a[6]=q(n,a[6]);a[7]=q(l,a[7]);return a}var G;G=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,
3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,
1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];"function"===typeof define&&define.amd?define(function(){return v}):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=v:exports=v:H.jsSHA=v})(this);

/*
   Copyright 2016 Continusec Pty Ltd

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/*
    This library is modelled after the golang client, with return values replaced
    with success/failure callback pairs.

    See the golang client guide here for best documentation:

    xxxxxx

    var c = new ContinusecClient("1234...5678", "secretkey");
    var m = c.verifiableMap("testmap");

    // First time only:
    m.create(function() {
        m.setValue("foo", "bar");
        m.setValue("foo1", "bar2");
        m.setValue("foo2", "bar2");
        m.setValue("foo3", "bar2");
    });

    // Later, get tree size, get value and verify inclusion
    m.treeHash(CONTINUSEC_HEAD, function(mapSize, rootHash) {
        m.getValue("foo1", mapSize, function(value, proof) {
            console.log(verifyMapInclusionProof("foo1", value, proof, rootHash));
        });
    });

    var l = c.verifiableLog("testlog");

    // First time only:
    l.create(function() {
        l.add("foo");
        l.add("bar");
    });

    l.treeHash(1, function(firstSize, firstHash) {
        l.treeHash(CONTINUSEC_HEAD, function(secondSize, secondHash) {
            l.consistencyProof(firstSize, secondSize, function(proof) {
                console.log(verifyLogConsistencyProof(firstSize, secondSize, firstHash, secondHash, proof));
            });
        });
    });

    l.treeHash(CONTINUSEC_HEAD, function(treeSize, rootHash) {
        l.inclusionProof(treeSize, leafMerkleTreeHash("foo"), function(idx, proof) {
            console.log(verifyLogInclusionProof(idx, treeSize, leafMerkleTreeHash("foo"), rootHash, proof));
        });
    });
*/


var CONTINUSEC_NETWORK_ERROR = 1;
var CONTINUSEC_INVALID_RANGE_ERROR = 2;
var CONTINUSEC_UNAUTHORIZED_ERROR = 3;
var CONTINUSEC_NOT_FOUND_ERROR = 4;
var CONTINUSEC_INTERNAL_ERROR = 5;
var CONTINUSEC_OBJECT_CONFLICT_ERROR = 6;
var CONTINUSEC_VERIFICATION_ERROR = 7;
var CONTINUSEC_NOT_ALL_ENTRIES_RETURNED_ERROR = 8;

var CONTINUSEC_HEAD = 0;

/**
 * Private
 */
var VerifiableMap = function (client, path) {
    this.client = client;
    this.path = path;
};

/**
 * Private
 */
var VerifiableLog = function (client, path) {
    this.client = client;
    this.path = path;
};

/**
 * baseURL is optional, and normally left empty (defaults to https://api.continusec.com).
 */
var ContinusecClient = function (account, apiKey, baseURL) {
    this.account = account;
    this.apiKey = apiKey;
    if (baseURL == undefined) {
		this.baseURL = "https://api.continusec.com";
    } else {
		this.baseURL = baseURL;
	}
};

/**
 * Returns pointer to verifiable map
 */
ContinusecClient.prototype.getVerifiableMap = function (name) {
    return new VerifiableMap(this, "/map/" + name);
};

/**
 * Returns pointer to verifiable log
 */
ContinusecClient.prototype.getVerifiableLog = function (name) {
    return new VerifiableLog(this, "/log/" + name);
};

/**
 * Private
 */
ContinusecClient.prototype.makeRequest = function (method, path, data, success, failure) {
    var req = new XMLHttpRequest();
    req.onload = function (evt) {
        switch (req.status) {
        case 200:
            success(binaryArrayToString(new Uint8Array(req.response)), req);
            break;
        case 400:
            failure(CONTINUSEC_INVALID_RANGE_ERROR);
            break;
        case 403:
            failure(CONTINUSEC_UNAUTHORIZED_ERROR);
            break;
        case 404:
            failure(CONTINUSEC_NOT_FOUND_ERROR);
            break;
        case 409:
            failure(CONTINUSEC_OBJECT_CONFLICT_ERROR);
            break;
        default:
            failure(CONTINUSEC_INTERNAL_ERROR);
        }
    };
    req.onerror = function (evt) {
        failure(CONTINUSEC_NETWORK_ERROR);
    };
    req.open(method, this.baseURL + "/v1/account/" + this.account + path, true);
    req.responseType = "arraybuffer";
    req.setRequestHeader("Authorization", 'Key ' + this.apiKey);
    req.send(data);
};

/**
 * Returns pointer to mutation log (VerifiableLog).
 */
VerifiableMap.prototype.getMutationLog = function () {
    return new VerifiableLog(this, this.path + "/log/mutation");
};

/**
 * Returns pointer to tree head log (VerifiableLog).
 */
VerifiableMap.prototype.getTreeHeadLog = function () {
    return new VerifiableLog(this, this.path + "/log/treehead");
};

/**
 * No value is passed to success.
 * Reason is passed to failure.
 */
VerifiableMap.prototype.create = function (success, failure) {
    this.client.makeRequest("PUT", this.path, null, function (data, req) {
        success();
    }, function (reason) {
        failure(reason);
    });
};

/**
 * MapEntryResponse is passed to success.
 */
VerifiableMap.prototype.getValue = function (key, treeSize, factory, success, failure) {
    this.client.makeRequest("GET", this.path + "/tree/" + treeSize + "/key/h/" + hexString(key) + factory.getFormat(), null, function (data, req) {
        var verifiedTreeSize = req.getResponseHeader("X-Verified-Treesize");
        if (verifiedTreeSize === null) {
            failure(CONTINUSEC_NOT_FOUND_ERROR);
            return;
        }
        verifiedTreeSize = Number(verifiedTreeSize);
        var proof = req.getResponseHeader("X-Verified-Proof");
        if (proof === null) {
            proof = "";
        }
        var parts = proof.split(",");
        var auditPath = [];
        var i;
        for (i = 0; i < 256; i++) {
            auditPath.push(null);
        }
        for (i = 0; i < parts.length; i++) {
            var pieces = parts[i].split("/");
            if (pieces.length == 2) {
                auditPath[Number(pieces[0].trim())] = decodeHex(pieces[1].trim());
            }
        }
        success(new MapEntryResponse(key, factory.createFromBytes(data), verifiedTreeSize, auditPath));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * VerifiableEntry is passed to success.
 */
VerifiableMap.prototype.getVerifiedValue = function (key, mapState, success, failure) {
	this.getValue(key, mapState.getTreeSize(), function(mapResp) {
		try {
			mapResp.verify(mapState);
		} catch (err) {
			failure(err);
			return;
		}
		success(mapResp.getValue());
	}, function (reason) {
		failure(reason);
	});
};

/**
 * Value is VerifiableEntry.
 * AddEntryResponse is passed to success.
 */
VerifiableMap.prototype.setValue = function (key, value, success, failure) {
    this.client.makeRequest("PUT", this.path + "/key/h/" + hexString(key) + value.getFormat(), value.getDataForUpload(), function (data, req) {
        var obj = JSON.parse(data);
        success(new AddEntryResponse(atob(obj.leaf_hash)));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * Value is VerifiableEntry.
 * AddEntryResponse is passed to success.
 */
VerifiableMap.prototype.deleteValue = function (key, success, failure) {
    this.client.makeRequest("DELETE", this.path + "/key/h/" + hexString(key), null, function (data, req) {
        var obj = JSON.parse(data);
        success(new AddEntryResponse(atob(obj.leaf_hash)));
    }, function (reason) {
        failure(reason);
    });
};
/**

/**
 * MapTreeHead is passed to success.
 */
VerifiableMap.prototype.getTreeHead = function (treeSize, success, failure) {
    this.client.makeRequest("GET", this.path + "/tree/" + treeSize, null, function (data, req) {
        var obj = JSON.parse(data);
        success(new MapTreeHead(new LogTreeHead(Number(obj.mutation_log.tree_size), atob(obj.mutation_log.tree_hash)), atob(obj.map_hash)));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * No value passed on success.
 */
VerifiableLog.prototype.create = function (success, failure) {
    this.client.makeRequest("PUT", this.path, null, function (data, req) {
        success();
    }, function (reason) {
        failure(reason);
    });
};

/**
 * AddEntryResponse is passed to success.
 */
VerifiableLog.prototype.add = function (value, success, failure) {
    this.client.makeRequest("POST", this.path + "/entry" + value.getFormat(), value.getDataForUpload(), function (data, req) {
        var obj = JSON.parse(data);
        success(new AddEntryResponse(atob(obj.leaf_hash)));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * LogTreeHead passed to success.
 */
VerifiableLog.prototype.getTreeHead = function (treeSize, success, failure) {
    this.client.makeRequest("GET", this.path + "/tree/" + treeSize, null, function (data, req) {
        var obj = JSON.parse(data);
        success(new LogTreeHead(Number(obj.tree_size), obj.tree_hash === null ? null : atob(obj.tree_hash)));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * VerifiableEntry passed on success
 */
VerifiableLog.prototype.getEntry = function (idx, factory, success, failure) {
    this.client.makeRequest("GET", this.path + "/entry/" + idx + factory.getFormat(), null, function (data, req) {
        success(factory.createFromBytes(data, idx));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * Each is called with (index, VerifiableEntry) for each entry, and then success afterwards with no value.
 */
VerifiableLog.prototype.getEntries = function (startIdx, endIdx, factory, each, success, failure) {
    this.client.makeRequest("GET", this.path + "/entries/" + startIdx + "-" + endIdx + factory.getFormat(), null, function (data, req) {
    	try {
			var obj = JSON.parse(data);
			for (var i = 0; i < obj.entries.length; i++) {
				each(startIdx + i, factory.createFromBytes(atob(obj.entries[i].leaf_data)));
			}
		} catch (err) {
			failure(err);
			return
		}
		success();
    }, function (reason) {
        failure(reason);
    });
};

VerifiableLog.prototype.verifyEntries = function (prev, head, factory, each, success, failure) {
    if ((prev == null) || (prev.getTreeSize() < head.getTreeSize())) {
        var log = this;
        var stack = [];
        if ((prev != null) && (prev.getTreeSize() > 0)) {
            this.getInclusionProofByIndex(prev.getTreeSize()+1, prev.getTreeSize(), function (proof) {
                if (prev.getTreeSize() == 50) {
                    console.log(50);
                }
                var firstHash = null;
                for (var i = 0; i < proof.getAuditPath().length; i++) {
                    if (firstHash == null) {
                        firstHash = proof.getAuditPath()[i];
                    } else {
                        firstHash = nodeMerkleTreeHash(proof.getAuditPath()[i], firstHash);
                    }
                }
                if (firstHash != prev.getRootHash()) {
                    failure(CONTINUSEC_VERIFICATION_ERROR);
                } else {
                    for (var i = 0; i < proof.getAuditPath().length; i++) {
                        stack.push(proof.getAuditPath()[i]);
                    }
                    secondStageVerifyEntries(stack, log, prev, head, factory, each, success, failure);
                }
            }, failure);
        } else {
            secondStageVerifyEntries(stack, log, prev, head, factory, each, success, failure);
        }
    } else {
        success();
    }
};

function secondStageVerifyEntries(stack, log, prev, head, factory, each, success, failure) {
    var parIdx = 0;
    if (prev != null) {
        parIdx = prev.getTreeSize();
    }
    log.getEntries(parIdx, head.getTreeSize(), factory, function (idx, entry) {
        each(idx, entry);
        
        stack.push(entry.getLeafHash());
        for (var z = idx; (z & 1) == 1; z >>= 1) {
            var right = stack.pop();
            var left = stack.pop();
            stack.push(nodeMerkleTreeHash(left, right));
        }
        
        parIdx += 1;
    }, function () {
        if (parIdx != head.getTreeSize()) {
            failure(CONTINUSEC_NOT_ALL_ENTRIES_RETURNED_ERROR);
        } else {
            var headHash = stack.pop();
            while (stack.length > 0) {
                headHash = nodeMerkleTreeHash(stack.pop(), headHash);
            }
            
            if (headHash != head.getRootHash()) {
                failure(CONTINUSEC_VERIFICATION_ERROR);
            } else {
                success();
            }
        }
    }, failure);
}

/**
 * Success is called with LogInclusionProof.
 */
VerifiableLog.prototype.getInclusionProof = function (treeSize, leaf, success, failure) {
	var lh = leaf.getLeafHash();
    this.client.makeRequest("GET", this.path + "/tree/" + treeSize + "/inclusion/h/" + hexString(lh), null, function (data, req) {
        var obj = JSON.parse(data);
        var auditPath = [];
        for (var i = 0; i < obj.proof.length; i++) {
            auditPath.push(atob(obj.proof[i]));
        }
        success(new LogInclusionProof(lh, Number(obj.tree_size), Number(obj.leaf_index), auditPath));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * Success is called with LogInclusionProof.
 */
VerifiableLog.prototype.getInclusionProofByIndex = function (treeSize, leafIndex, success, failure) {
    this.client.makeRequest("GET", this.path + "/tree/" + treeSize + "/inclusion/" + leafIndex, null, function (data, req) {
        var obj = JSON.parse(data);
        var auditPath = [];
        for (var i = 0; i < obj.proof.length; i++) {
            auditPath.push(atob(obj.proof[i]));
        }
        success(new LogInclusionProof(null, Number(obj.tree_size), Number(obj.leaf_index), auditPath));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * Success is called with no value
 */
VerifiableLog.prototype.verifyInclusion = function (head, leaf, success, failure) {
	this.getInclusionProof(head.getTreeSize(), leaf, function (proof) {
		try {
			proof.verify(head);
		} catch (err) {
			failure(err);
			return;
		}
		success();
	}, function (reason) {
		failure(reason);
	});
}

/**
 * Success is called with LogConsistencyProof
 */
VerifiableLog.prototype.getConsistencyProof = function (firstSize, secondSize, success, failure) {
    this.client.makeRequest("GET", this.path + "/tree/" + secondSize + "/consistency/" + firstSize, null, function (data, req) {
        var obj = JSON.parse(data);
        var auditPath = [];
        for (var i = 0; i < obj.proof.length; i++) {
            auditPath.push(atob(obj.proof[i]));
        }
        success(new LogConsistencyProof(firstSize, secondSize, auditPath));
    }, function (reason) {
        failure(reason);
    });
};

/**
 * Success is called with no value.
 */
VerifiableLog.prototype.verifyConsistency = function (a, b, success, failure) {
	if (a.getTreeSize() <= 0) {
		failure(CONTINUSEC_VERIFICATION_ERROR);
		return;
	}
	if (b.getTreeSize() <= 0) {
		failure(CONTINUSEC_VERIFICATION_ERROR);
		return;
	}
	
	if (a.getTreeSize() == b.getTreeSize()) {
		if (a.getRootHash() != b.getRootHash()) {
			failure(CONTINUSEC_VERIFICATION_ERROR);
			return;
		}
		success();
		return;
	}
	
	if (a.getTreeSize() > b.getTreeSize()) {
		var c = a;
		a = b;
		b = c;
	}

	this.getConsistencyProof(a.getTreeSize(), b.getTreeSize(), function (proof) {
		try {
			proof.verify(a, b);
		} catch (err) {
			failure(err);
			return;
		}
		success();
	}, function (reason) {
		failure(reason);
	});
}

/**
 * Success is passed a LogTreeHead.
 */
VerifiableLog.prototype.getVerifiedLatestTreeHead = function (prev, success, failure) {
    this.getVerifiedTreeHead(prev, 0, function (head) {
        if (prev != null) {
            if (head.getTreeSize() <= prev.getTreeSize()) {
                head = prev;
            }
        }
        success(head);
    }, failure);
}

/**
 * Success is passed a LogTreeHead.
 */
VerifiableLog.prototype.getVerifiedTreeHead = function (prev, treeSize, success, failure) {
    if ((treeSize != 0) && (prev != null) && (prev.getTreeSize() == treeSize)) {
        success(prev);
    } else {
        var log = this;
        this.getTreeHead(treeSize, function (head) {
            log.verifyConsistency(prev, head, function () {
                success(head);
            }, failure);
        }, failure);
    }
}

/**
 * Success is passed a LogTreeHead.
 */
VerifiableLog.prototype.verifySuppliedInclusionProof = function (prev, proof, success, failure) {
    this.getVerifiedTreeHead(prev, proof.getTreeSize(), function (head) {
        try {
            proof.verify(head);
            success(head);
        } catch (err) {
            failure(err);
        }
    }, failure);
};


/**
 * Success is passed LogTreeHead.
 */
VerifiableLog.prototype.blockUntilPresent = function (leaf, success, failure) {
    doBlockRound(this, -1, 0, leaf, success, failure);
}

function doBlockRound(log, lastHead, secsToSleep, leaf, success, failure) {
    log.getTreeHead(0, function (lth) {
        if (lth.getTreeSize() > lastHead) {
            log.verifyInclusion(lth, leaf, function () {
                success(lth);   
            }, function (reason) {
                if (reason == CONTINUSEC_INVALID_RANGE_ERROR) {
                    secsToSleep = 1;
                    setTimeout(function () { doBlockRound(log, lth.getTreeSize(), secsToSleep, leaf, success, failure); }, secsToSleep * 1000);
                } else {
                    failure(reason);
                }
            });
        } else {
            secsToSleep *= 2
            setTimeout(function () { doBlockRound(log, lastHead, secsToSleep, leaf, success, failure); }, secsToSleep * 1000);
        }
    }, failure);
}


var AddEntryResponse = function (mtlHash) {
    this.mtlHash = mtlHash;
}
AddEntryResponse.prototype.getLeafHash = function () { return this.mtlHash; };

var LogConsistencyProof = function (firstSize, secondSize, auditPath) {
	this.firstSize = firstSize;
	this.secondSize = secondSize;
	this.auditPath = auditPath;
};
LogConsistencyProof.prototype.getFirstSize = function () { return this.firstSize; };
LogConsistencyProof.prototype.getSecondSize = function () { return this.secondSize; };
LogConsistencyProof.prototype.getAuditPath = function () { return this.auditPath; };
/**
 * Head is a LogTreeHead
 */
LogConsistencyProof.prototype.verify = function (first, second) {
	if (first.getTreeSize() != this.firstSize) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
	}
	if (second.getTreeSize() != this.secondSize) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
	}
	
    if ((this.firstSize < 1) || (this.firstSize >= this.secondSize)) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
    }

    var newProof = [];
    if (isPow2(this.firstSize)) {
        newProof.push(firstHash);
    }
    var i;
    for (i = 0; i < this.auditPath.length; i++) {
        newProof.push(this.auditPath[i]);
    }

    var fn = this.firstSize - 1;
    var sn = this.secondSize - 1;
    while ((fn & 1) == 1) {
        fn >>= 1;
        sn >>= 1;
    }

    if (newProof.length === 0) {
        return false;
    }

    var fr = newProof[0];
    var sr = newProof[0];
    for (i = 1; i < newProof.length; i++) {
        if (sn === 0) {
            return false;
        }
        if (((fn & 1) == 1) || (fn == sn)) {
            fr = nodeMerkleTreeHash(newProof[i], fr);
            sr = nodeMerkleTreeHash(newProof[i], sr);
            while (!((fn === 0) || ((fn & 1) == 1))) {
                fn >>= 1;
                sn >>= 1;
            }
        } else {
            sr = nodeMerkleTreeHash(sr, newProof[i]);
        }
        fn >>= 1;
        sn >>= 1;
    }
    
    if (sn != 0) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
    }
    
    if (fr != first.getRootHash()) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
    }

    if (sr != second.getRootHash()) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
    }
}

var LogInclusionProof = function (leafHash, treeSize, leafIndex, auditPath) {
	this.leafHash = leafHash;
	this.treeSize = treeSize;
	this.leafIndex = leafIndex;
	this.auditPath = auditPath;
};
LogInclusionProof.prototype.getLeafHash = function () { return this.leafHash; };
LogInclusionProof.prototype.getTreeSize = function () { return this.treeSize; };
LogInclusionProof.prototype.getLeafIndex = function () { return this.leafIndex; };
LogInclusionProof.prototype.getAuditPath = function () { return this.auditPath; };

/**
 * Head is a LogTreeHead
 */
LogInclusionProof.prototype.verify = function (head) {
	if (head.getTreeSize() != this.treeSize) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
	}

    if ((this.leafIndex >= this.treeSize) || (this.leafIndex < 0)) {
        return false;
    }

    var fn = this.leafIndex;
    var sn = this.treeSize - 1;
    var r = this.leafHash;

    for (var i = 0; i < this.auditPath.length; i++) {
        if ((fn == sn) || ((fn & 1) == 1)) {
            r = nodeMerkleTreeHash(this.auditPath[i], r);
            while (!((fn === 0) || ((fn & 1) == 1))) {
                fn >>= 1;
                sn >>= 1;
            }
        } else {
            r = nodeMerkleTreeHash(r, this.auditPath[i]);
        }
        fn >>= 1;
        sn >>= 1;
    }
    
    if (sn != 0) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
    }
    
    if (r != head.getRootHash()) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
    }
};


var RawDataEntryFactory = function () {};
RawDataEntryFactory.prototype.getFormat = function () { return ""; };
RawDataEntryFactory.prototype.createFromBytes = function (b) { return new RawDataEntry(b); };
var RAW_DATA_ENTRY_FACTORY = new RawDataEntryFactory();

var JsonEntryFactory = function () {};
JsonEntryFactory.prototype.getFormat = function () { return "/xjson"; };
JsonEntryFactory.prototype.createFromBytes = function (b) { return new JsonEntry(b); };
var JSON_ENTRY_FACTORY = new JsonEntryFactory();

var RedactedJsonEntryFactory = function () {};
RedactedJsonEntryFactory.prototype.getFormat = function () { return "/xjson"; };
RedactedJsonEntryFactory.prototype.createFromBytes = function (b) { return new RedactedJsonEntry(b); };
var REDACTED_JSON_ENTRY_FACTORY = new RedactedJsonEntryFactory();

var RawDataEntry = function (data) {
	this.data = data;
}

RawDataEntry.prototype.getFormat = function () {
	return "";
}

RawDataEntry.prototype.getDataForUpload = function () {
	return this.data;
}

RawDataEntry.prototype.getData = function () {
	return this.data;
}

RawDataEntry.prototype.getLeafHash = function () {
	return leafMerkleTreeHash(this.data);
}

var JsonEntry = function (data) {
	this.data = data;
}

JsonEntry.prototype.getFormat = function () {
	return "/xjson";
}

JsonEntry.prototype.getDataForUpload = function () {
	return this.data;
}

JsonEntry.prototype.getData = function () {
	return this.data;
}

JsonEntry.prototype.getLeafHash = function () {
	return leafMerkleTreeHash(objectHashWithStdRedaction(JSON.parse(this.data)));
}

var RedactableJsonEntry = function (data) {
	this.data = data;
}

RedactableJsonEntry.prototype.getFormat = function () {
	return "/xjson/redactable";
}

RedactableJsonEntry.prototype.getDataForUpload = function () {
	return this.data;
}

var RedactedJsonEntry = function (data) {
	this.data = data;
}

RedactedJsonEntry.prototype.getData = function () {
	return JSON.stringify(shedRedactionWithStdPrefix(JSON.parse(this.data)));
}

RedactedJsonEntry.prototype.getLeafHash = function () {
	return leafMerkleTreeHash(objectHashWithStdRedaction(JSON.parse(this.data)));
}

var MapTreeState = function (mapHead, treeHeadLogTreeHead) {
	this.mapHead = mapHead;
	this.treeHeadLogTreeHead = treeHeadLogTreeHead;
}

MapTreeState.prototype.getTreeSize = function () {
	return this.mapHead.getTreeSize();
}

MapTreeState.prototype.getMapHead = function () {
	return this.mapHead;
}

MapTreeState.prototype.getTreeHeadLogTreeHead = function () {
	return this.treeHeadLogTreeHead;
}

var MapTreeHead = function (logTreeHead, rootHash) {
	this.logTreeHead = logTreeHead;
	this.rootHash = rootHash;
}

MapTreeHead.prototype.getTreeSize = function () {
	return this.logTreeHead.getTreeSize();
}

MapTreeHead.prototype.getMutationLogTreeHead = function () {
	return this.logTreeHead;
}

MapTreeHead.prototype.getRootHash = function () {
	return this.rootHash;
}

var LogTreeHead = function (treeSize, rootHash) {
	this.treeSize = treeSize;
	this.rootHash = rootHash;
}

LogTreeHead.prototype.getTreeSize = function () {
	return this.treeSize;
}

LogTreeHead.prototype.getRootHash = function () {
	return this.rootHash;
}

var MapEntryResponse = function (key, value, treeSize, auditPath) {
    this.key = key;
    this.value = value;
    this.treeSize = treeSize;
    this.auditPath = auditPath;
};

MapEntryResponse.prototype.getKey = function () {
	return this.key;
}

MapEntryResponse.prototype.getValue = function () {
	return this.value;
}

MapEntryResponse.prototype.getTreeSize = function () {
	return this.treeSize;
}

MapEntryResponse.prototype.getAuditPath = function () {
	return this.auditPath;
}

MapEntryResponse.prototype.verify = function (mapTreeHead) {
	if (this.treeSize != mapTreeHead.getTreeSize()) {
		throw CONTINUSEC_VERIFICATION_ERROR;
	}
    var kp = constructKeyPath(this.key);
    var t = this.value.getLeafHash();
    for (var i = kp.length - 1; i >= 0; i--) {
        var p = proof[i];
        if (p === null) {
            p = DEFAULT_LEAF_VALUES[i + 1];
        }
        if (kp[i]) {
            t = nodeMerkleTreeHash(p, t);
        } else {
            t = nodeMerkleTreeHash(t, p);
        }
    }
    if (t != mapTreeHead.getRootHash()) {
    	throw CONTINUSEC_VERIFICATION_ERROR;
    }
}

/* this method is private to the implementation and should not be called directly */
function binaryArrayToString(d) {
    var rv = "";
    for (var j = 0; j < d.length; j++) {
        rv += String.fromCharCode(d[j]);
    }
    return rv;
}

/* this method is private to the implementation and should not be called directly */
function hexString(a) {
    var rv = "";
    for (var i = 0; i < a.length; i++) {
        var h = a.charCodeAt(i).toString(16);
        while (h.length < 2) {
            h = "0" + h;
        }
        rv += h;
    }
    return rv;
}

/* this method is private to the implementation and should not be called directly */
function decodeHex(s) {
    var rv = "";
    for (var i = 0; (i + 1) < s.length; i += 2) {
        rv += String.fromCharCode(parseInt(s.substring(i, i+2), 16));
    }
    return rv;
}

/* this method is private to the implementation and should not be called directly */
function isPow2(k) {
    return (Math.pow(2, Math.round(Math.log2(k))) == k);
}

function constructKeyPath(key) {
    var h = sha256(key);
    var rv = [];
    for (var i = 0; i < h.length; i++) {
        for (var j = 7; j >= 0; j--) {
            rv.push(((h.charCodeAt(i) >> j) & 1) == 1);
        }
    }
    return rv;
}

function sha256(b) {
    var shaObj = new jsSHA("SHA-256", "BYTES");
    shaObj.update(b);
    return shaObj.getHash("BYTES");
}

function nodeMerkleTreeHash(l, r) {
    return sha256(String.fromCharCode(1) + l + r);
}

function leafMerkleTreeHash(b) {
    return sha256(String.fromCharCode(0) + b);
}

function generateMapDefaultLeafValues() {
    var rv = [];
    var i;
    for (i = 0; i < 257; i++) {
        rv.push(null);
    }

    rv[256] = leafMerkleTreeHash("");
    for (i = 255; i >= 0; i--) {
        rv[i] = nodeMerkleTreeHash(rv[i+1], rv[i+1]);
    }
    return rv;
}

var DEFAULT_LEAF_VALUES = generateMapDefaultLeafValues();


var REDACTED_PREFIX = "***REDACTED*** Hash: ";

function objectHash(o) {
	return objectHashWithRedaction(o, "");
}

function objectHashWithStdRedaction(o) {
	return objectHashWithRedaction(o, REDACTED_PREFIX);
}

function objectHashWithRedaction(o, prefix) {
	if (o == null) {
		return sha256('n');
	} else if (o instanceof Array) {
		var input = "";
		for (var i = 0; i < o.length; i++) {
			input += objectHashWithRedaction(o[i], prefix);
		}
		return sha256('l' + input);
	} else if ((typeof o) == "string") {
		if (prefix.length > 0 && o.startsWith(prefix)) {
			return decodeHex(o.substring(prefix.length));
		} else {
			// yikes, this little dances encodes as UTF8
			return sha256('u' + unescape(encodeURIComponent(o.normalize('NFC'))));
		}
	} else if ((typeof o) == "number") { // we assume everything is a float (json doesn't distinguish)
		var s = "+";
		if (o < 0) {
			s = "-";
			o = -o;
		}
		var e = 0;
		while (o > 1) {
			o /= 2.0;
			e++;
		}
		while (o <= 0.5) {
			o *= 2.0;
			e--;
		}
		s += e + ":";
		if ((o > 1) || (o <= 0.5)) {
			return undefined;
		}
		while (o != 0) {
			if (o >= 1) {
				s += "1";
				o -= 1.0;
			} else {
				s += "0";
			}
			if (o >= 1) {
				return undefined;
			}
			if (s.length >= 1000) {
				return undefined;
			}
			o *= 2.0;
		}
		return sha256('f' + s);
	} else if ((typeof o) == "boolean") {
		return sha256('b' + (o ? "1" : "0"));
	} else { // object
		var kh = [];
		for (var k in o) {
			kh.push(objectHashWithRedaction(k, prefix) + objectHashWithRedaction(o[k], prefix));
		}
		kh.sort();
		return sha256("d"+kh.join(""));
	}
}

function shedRedactableWithStdRedaction(o) {
	return shedRedactable(o, REDACTED_PREFIX);
}

function shedRedactable(o, prefix) {
	if (o == null) {
		return null;
	} else if (o instanceof Array) {
		var rv = [];
		for (var i = 0; i < o.length; i++) {
			rv.push(shedRedactable(o[i], prefix));
		}
		return rv;
	} else if ((typeof o) == "object") {
		var rv = {};
		for (var k in o) {
			var v = o[k];
			if (v instanceof Array) {
				if (v.length == 2) {
					rv[k] = shedRedactable(v[1], prefix);
				} else {
					return undefined;
				}
			} else if ((typeof v) == "string") {
				if (v.startsWith(prefix)) {
					// good, do nothing
				} else {
					return undefined;
				}
			} else {
				return undefined;
			}
		}
	} else {
		return o;
	}
}
