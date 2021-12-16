// const Decentragram = artifacts.require("Decentragram");
const GiveNTake = artifacts.require("GiveNTake");

module.exports = function(deployer) {
  // deployer.deploy(Decentragram);
  deployer.deploy(GiveNTake);
};