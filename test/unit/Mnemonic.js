const fixtures = require("./fixtures/Mnemonic.json")
const assert = require("assert")
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Mnemonic = require("../../lib/Mnemonic").Mnemonic

describe("#Mnemonic", () => {
  describe("#MnemonicConstructor", () => {
    it("should create instance of Mnemonic", () => {
      let mnemonic = new Mnemonic()
      assert.equal(
        mnemonic instanceof Mnemonic,
        true
      )
    })
  })

  describe("#generate", () => {
    it("should generate a 12 word mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(128)
      assert.equal(mnemonic.split(" ").length, 12)
    })

    it("should generate a 15 word mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(160)
      assert.equal(mnemonic.split(" ").length, 15)
    })

    it("should generate a 18 word mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(192)
      assert.equal(mnemonic.split(" ").length, 18)
    })

    it("should generate an 21 word mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(224)
      assert.equal(mnemonic.split(" ").length, 21)
    })

    it("should generate an 24 word mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(256)
      assert.equal(mnemonic.split(" ").length, 24)
    })

    it("should generate an 24 word italian mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(
        256,
        bitbox.Mnemonic.wordLists().italian
      )
      assert.equal(mnemonic.split(" ").length, 24)
    })
  })

  describe("#fromEntropy", () => {
    it("should generate a 12 word mnemonic from 16 bytes of entropy", () => {
      const rand = bitbox.Crypto.randomBytes(16)
      const mnemonic = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 12)
    })

    it("should generate a 15 word mnemonic from 20 bytes of entropy", () => {
      const rand = bitbox.Crypto.randomBytes(20)
      const mnemonic = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 15)
    })

    it("should generate an 18 word mnemonic from 24 bytes of entropy", () => {
      const rand = bitbox.Crypto.randomBytes(24)
      const mnemonic = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 18)
    })

    it("should generate an 21 word mnemonic from 28 bytes of entropy", () => {
      const rand = bitbox.Crypto.randomBytes(28)
      const mnemonic = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 21)
    })

    it("should generate an 24 word mnemonic from 32 bytes of entropy", () => {
      const rand = bitbox.Crypto.randomBytes(32)
      const mnemonic = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 24)
    })

    it("should generate an 24 french word mnemonic 32 bytes of entropy", () => {
      const rand = bitbox.Crypto.randomBytes(32)
      const mnemonic = bitbox.Mnemonic.fromEntropy(
        rand.toString("hex"),
        bitbox.Mnemonic.wordLists().french
      )
      assert.equal(mnemonic.split(" ").length, 24)
    })

    fixtures.fromEntropy.forEach(entropy => {
      const mnemonic = bitbox.Mnemonic.fromEntropy(entropy.entropy)
      it(`should convert ${entropy.entropy} to ${entropy.mnemonic}`, () => {
        assert.equal(mnemonic, entropy.mnemonic)
      })
    })
  })

  describe("#toEntropy", () => {
    it("should turn a 12 word mnemonic to entropy", () => {
      const mnemonic = bitbox.Mnemonic.generate(128)
      const entropy = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 16)
    })

    it("should turn a 15 word mnemonic to entropy", () => {
      const mnemonic = bitbox.Mnemonic.generate(160)
      const entropy = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 20)
    })

    it("should turn a 18 word mnemonic to entropy", () => {
      const mnemonic = bitbox.Mnemonic.generate(192)
      const entropy = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 24)
    })

    it("should turn a 21 word mnemonic to entropy", () => {
      const mnemonic = bitbox.Mnemonic.generate(224)
      const entropy = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 28)
    })

    it("should turn a 24 word mnemonic to entropy", () => {
      const mnemonic = bitbox.Mnemonic.generate(256)
      const entropy = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 32)
    })

    it("should turn a 24 word spanish mnemonic to entropy", () => {
      const mnemonic = bitbox.Mnemonic.generate(
        256,
        bitbox.Mnemonic.wordLists().spanish
      )
      const entropy = bitbox.Mnemonic.toEntropy(
        mnemonic,
        bitbox.Mnemonic.wordLists().spanish
      )
      assert.equal(entropy.length, 32)
    })

    fixtures.fromEntropy.forEach(fixture => {
      const entropy = bitbox.Mnemonic.toEntropy(fixture.mnemonic)
      it(`should convert ${fixture.mnemonic} to ${fixture.entropy}`, () => {
        assert.equal(entropy.toString("hex"), fixture.entropy)
      })
    })
  })

  describe("#validate", () => {
    it("fails for a mnemonic that is too short", () => {
      assert.equal(
        bitbox.Mnemonic.validate(
          "mixed winner",
          bitbox.Mnemonic.wordLists().english
        ),
        "Invalid mnemonic"
      )
    })

    it("fails for a mnemonic that is too long", () => {
      assert.equal(
        bitbox.Mnemonic.validate(
          "mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake",
          bitbox.Mnemonic.wordLists().english
        ),
        "Invalid mnemonic"
      )
    })

    it("fails if mnemonic words are not in the word list", () => {
      assert.equal(
        bitbox.Mnemonic.validate(
          "failsauce one two three four five six seven eight nine ten eleven",
          bitbox.Mnemonic.wordLists().english
        ),
        "failsauce is not in wordlist, did you mean balance?"
      )
    })

    it("validate a 128 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(128)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 160 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(160)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 192 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(192)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 224 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(224)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 256 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(256)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 256 bit chinese simplified mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(
        256,
        bitbox.Mnemonic.wordLists().chinese_simplified
      )
      assert.equal(
        bitbox.Mnemonic.validate(
          mnemonic,
          bitbox.Mnemonic.wordLists().chinese_simplified
        ),
        "Valid mnemonic"
      )
    })
  })

  describe("#toSeed", () => {
    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 128 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(128)
      const rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 160 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(160)
      const rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 192 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(192)
      const rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 224 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(224)
      const rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 256 bit mnemonic", () => {
      const mnemonic = bitbox.Mnemonic.generate(256)
      const rootSeedBuffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })
  })

  describe("#wordLists", () => {
    it("return a list of 2048 english words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().english.length, 2048)
    })

    it("return a list of 2048 japanese words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().japanese.length, 2048)
    })

    it("return a list of 2048 chinese simplified words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().chinese_simplified.length, 2048)
    })

    it("return a list of 2048 chinese traditional words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().chinese_traditional.length, 2048)
    })

    it("return a list of 2048 french words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().french.length, 2048)
    })

    it("return a list of 2048 italian words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().italian.length, 2048)
    })

    it("return a list of 2048 korean words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().korean.length, 2048)
    })

    it("return a list of 2048 spanish words", () => {
      assert.equal(bitbox.Mnemonic.wordLists().spanish.length, 2048)
    })
  })

  describe("#toKeypairs", () => {
    fixtures.toKeypairs.forEach((fixture, i) => {
      const keypairs = bitbox.Mnemonic.toKeypairs(fixture.mnemonic, 5)
      keypairs.forEach((keypair, j) => {
        it(`Generate keypair from mnemonic`, () => {
          assert.equal(
            keypair.privateKeyWIF,
            fixtures.toKeypairs[i].output[j].privateKeyWIF
          )
          // assert.equal(
          //   keypair.address,
          //   fixtures.toKeypairs[i].output[j].address
          // )
        })
      })

      const regtestKeypairs = bitbox.Mnemonic.toKeypairs(
        fixture.mnemonic,
        5,
        true
      )
      regtestKeypairs.forEach((keypair, j) => {
        it(`Generate keypair from mnemonic`, () => {
          assert.equal(
            keypair.privateKeyWIF,
            fixtures.toKeypairs[i].output[j].privateKeyWIFRegTest
          )
          // assert.equal(
          //   keypair.address,
          //   fixtures.toKeypairs[i].output[j].regtestAddress
          // )
        })
      })
    })
  })

  describe("#findNearestWord", () => {
    fixtures.findNearestWord.forEach((fixture, i) => {
      const word = bitbox.Mnemonic.findNearestWord(
        fixture.word,
        bitbox.Mnemonic.wordLists()[fixture.language]
      )
      it(`find word ${fixture.foundWord} near ${fixture.word} in ${
        fixture.language
      }`, () => {
        assert.equal(word, fixture.foundWord)
      })
    })
  })
})
