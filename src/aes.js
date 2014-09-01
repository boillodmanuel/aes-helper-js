/*
 * Utility class for encrypt or decrypt with AES encryption.
 */

"use strict";

var CryptoJS = require("crypto-js");

var DEFAULT_KEY_SIZE = 128;
var DEFAULT_ITERATION_COUNT = 7;

var generateKey = function (passPhrase, salt, keySize, iterationCount) {
  return CryptoJS.PBKDF2(
      passPhrase,
      CryptoJS.enc.Hex.parse(salt),
      { keySize: keySize / 32, iterations: iterationCount });
};

/**
 *  Initialize an instance of AesHelper with given encryption parameters
 *
 *  Usage:
 *  `
 *  var aesHelper = new AesHelper(passPhrase, salt, iv);
 *  var encoded = aesHelper.encrypt("value");
 *  var decoded = aesHelper.decrypt(encoded);
 *  `
 *
 * @constructor
 * @param {string} passPhrase The passphrase
 * @param {string} salt A hexadecimal String with an even number of characters
 * @param {string} iv Initialization vector. A hexadecimal String of 16 bytes length (i.e 32 characters length)
 * @param {number} keySize (Optional) Size of AES key (128, 196, 256).
 * @param {number} iterationCount (Optional) Iteration count used for key generation.
 */
var AesHelper = function (passPhrase, salt, iv, keySize, iterationCount) {
  this.key = generateKey(passPhrase, salt, keySize || DEFAULT_KEY_SIZE, iterationCount || DEFAULT_ITERATION_COUNT);
  this.ivHex = CryptoJS.enc.Hex.parse(iv);
};

/**
 * Encrypt text with AES encryption
 * @param {string} plainText text to encrypt
 */
AesHelper.prototype.encrypt = function (plainText) {
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      this.key,
      { iv: this.ivHex });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

/**
 * Decrypt text with AES encryption
 * @param {string} cipherText - encrypted text
 */
AesHelper.prototype.decrypt = function (cipherText) {
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      this.key,
      { iv: this.ivHex });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

//MODULE
exports = module.exports = {
  AesHelper: AesHelper
};
