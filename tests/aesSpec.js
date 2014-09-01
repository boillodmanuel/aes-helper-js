'use strict';

var aes = require('../');

describe('AES encryption', function () {

  // Encryption parameters
  var passPhrase = 'random pass phrase';
  var salt = '72216a6607a2a2d8939d5a324b195ba32bab81cd';
  var iv = '91a90d6aa4241465fb2ac9ab0e06eba0';

  // Test values
  var plainText = 'My message in plain text';
  var encryptedText = 'BkcWfejPOMwRObflM2Dn6F2vFAP8D8Z7yUbsI4YIfB0=';

  var aesHelper = new aes.AesHelper(passPhrase, salt, iv);

  it('encrypt', function () {

    var encrypted = aesHelper.encrypt(plainText);
    expect(encrypted).toBe(encryptedText);
  });

  it('decrypt', function () {
    var decrypted = aesHelper.decrypt(encryptedText);
    expect(decrypted).toBe(plainText);
  });

});