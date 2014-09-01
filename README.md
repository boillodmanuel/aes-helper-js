aes-helper-js
===============

[![Build Status](https://travis-ci.org/boillodmanuel/aes-helper-js.svg?branch=master)](https://travis-ci.org/boillodmanuel/aes-helper-js)

AES Encryption utilities for javascript (see also aes-helper-java for java version)


Usage
-----

With requirejs:
```
var aes = require("aes-helper-js");
var aesHelper = new AesHelper(passPhrase, salt, iv);
var encoded = aesHelper.encrypt("value");
var decoded = aesHelper.decrypt(encoded);
```

Development
-----------

Launch test:
```
grunt test
```

Release new version:
```
grunt bump
```


Publish new version on npm:
```
npm publish . --tag v0.x.x
```