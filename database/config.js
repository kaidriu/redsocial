module.exports = {
    // HOST: "bym8pshutkczle2kolvq-postgresql.services.clever-cloud.com",
    // USER: "ucnmbx7jusqxudb9zdxr",
    // PASSWORD: "a4KXHj8r4YPqDSoQDkUi",
    // DB: "bym8pshutkczle2kolvq",
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "solsito28",
    DB: "face!ook",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };