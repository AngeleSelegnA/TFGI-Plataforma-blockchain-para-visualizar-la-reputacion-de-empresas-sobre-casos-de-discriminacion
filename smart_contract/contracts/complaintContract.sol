// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <= 0.8.10;
pragma experimental ABIEncoderV2;

/************************IN PROCESS****************************/
contract complaintContract {
  
  //Informacion de denuncias
  struct complaint {
      string user;
      string text;
  }

  //Informacion de la empresa -> denuncias + reputacion
  struct companyData{
    //addresss addr; --> En caso de que se implementen tokens
    uint reputation;
    complaint[] complaints;
  }

  //Nombres de las empresas que se pueden denunciar para poder iterar en el mapping
  string[] private companies = new string[](10);
  //Mapping que devuelve los datos de las denuncias referentes a una empresa
  mapping(string => companyData) private companyMapping;

  //Se inicializa la reputacion
  constructor() {
    companies = ["empresa1", "empresa2", "empresa3", "empresa4", "empresa5", "empresa6", "empresa7", "empresa8", "empresa9", "empresa10"];
    for(uint i = 0; i < companies.length ; i++){
      companyMapping[companies[i]].reputation = 100;
    }
  }
  //Function para devolver las empresas
  function  getCompanies() external view returns (string[] memory){
    return companies;
  }

  //Funcion para devolver los datos de la empresa: Denuncias, futuras metricas
  function getComplaints(string memory c_name) external view returns (complaint[] memory) {
     return companyMapping[c_name].complaints;
  }

  //Funcion para añadir empresas <----- Chequear
  /*function newCompany(string memory c_name) external {
     companies.push(c_name);
  }
  */

  //Funcion para obtener la reputacion
  function getReputation() external view returns (uint[] memory) {
    uint[] memory reputations = new uint[](10);
    for(uint i=0; i< companies.length; i++){
      reputations[i] = (companyMapping[companies[i]].reputation);
    }
    return reputations;
  }

  //Funcion para insertar denuncia
  function newComplaint(string memory c_name, string memory u_name, string memory text) external {
     companyMapping[c_name].complaints.push(complaint(u_name, text));
     uint ret = companyMapping[c_name].reputation;
     if(ret > 0) companyMapping[c_name].reputation -= 1;
  }
}
