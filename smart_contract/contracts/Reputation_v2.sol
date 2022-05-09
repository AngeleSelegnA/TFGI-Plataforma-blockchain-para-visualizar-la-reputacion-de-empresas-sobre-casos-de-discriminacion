// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <= 0.8.10;
pragma experimental ABIEncoderV2;

interface IERC20simplified {
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract ReputationTokens is IERC20simplified{

    mapping(address => uint) n_tokens; //cantidad de tokens de cada empresa
    address immutable owner; //propietarios del contrato
    uint initTokens = 1000;

    constructor(){
        owner = msg.sender; 
    }

    modifier onlyOwner{
        require(msg.sender == owner, "No tienes estos permisos");
        _;
    }
    
    //Crear una empresa, ya sabemos que es nueva
    function createCompany(address c_address) external onlyOwner{
        n_tokens[c_address] = initTokens;
    }

    //Crear varias empresas, sabemos que son nuevas
    function createCompanies(address[]memory c_add) external onlyOwner{
        for(uint i=0;i<c_add.length;++i){
            n_tokens[c_add[i]] = initTokens;
        }
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) override external onlyOwner returns (bool){
        require(n_tokens[sender] > amount,"No se pueden transferir los tokens");
        n_tokens[sender] -= amount; //Tan solo se eliminan tokens.
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function balanceOf(address account) override external view returns (uint256){
        return n_tokens[account];
    }

    function balanceOfAll(address [] memory accounts) external view returns (uint[] memory){
        uint[] memory reputations = new uint[](accounts.length);
        for(uint i = 0; i < accounts.length; ++i){
            reputations[i] = n_tokens[accounts[i]];
        }
        return reputations;
    }
}


contract ReputationContract {
  
  //Informacion de denuncias
  /*
    struct Complaint {
        string user;
        string typeC;
        string hash; //hash al texto en IPFS
        string gender;
        string etnia;
        string age;
        string discapacity;
        bool consent;
        bool complaintBefore;
    }

    struct CompanyData{
        address c_address;
        Complaint[] complaints;
    }
    */
    struct CompanyData{
        address c_address;
        string[] hashes_complaints;
    }
    
    address immutable owner; //Nosotros somos los propietarios de este contrato
    string[] companies; //Nombres de las empresas que se pueden denunciar
    mapping(string => CompanyData) companyMapping; //Datos de las denuncias referentes a una empresa

    //Se inicializa la reputacion
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == owner, "No tienes estos permisos");
        _;
    }

    //Añadir varias empresas por primera vez al contrato
    function createCompanies(string[] memory _companies) external onlyOwner returns (address[] memory){
        address [] memory c_add = new address[](_companies.length);
        for(uint i = 0; i < _companies.length; ++i){
            address add  = address(bytes20(keccak256(abi.encodePacked(_companies[i]))));
            companies.push(_companies[i]);
            companyMapping[_companies[i]].c_address = add;
            c_add[i] = add;
        }
        return c_add;
    }

    //Añadir una empresa al sistema
    function newCompany(string memory c_name) external onlyOwner returns (address){
        require(companyMapping[c_name].c_address == address(0),"Esta empresa ya esta en el sistema");
        address add = address(bytes20(keccak256(abi.encodePacked(c_name))));
        companyMapping[c_name].c_address = add;
        return add;
    }

    //Function para devolver las empresas
    function  getCompanies() external view onlyOwner returns (string[] memory){
        return companies;
    }

    function getAddresses(string[] memory c_names) external view returns (address[] memory){
        address[] memory c_add = new address[](c_names.length);
        for(uint i = 0; i< c_names.length; ++i){
            c_add[i] = companyMapping[c_names[i]].c_address;
        }
        return c_add;
    }

    function getAddresses() external view returns (address[] memory){
        uint l = companies.length;
        address[] memory c_add = new address[](l);
        for(uint i = 0; i< l; ++i){
            c_add[i] = companyMapping[companies[i]].c_address;
        }
        return c_add;
    }
    
    //Funcion para devolver los datos de la empresa: Denuncias, futuras metricas
    function getHashesComplaints(string memory c_name) external view onlyOwner returns (string[] memory) {
        return companyMapping[c_name].hashes_complaints;
    }

    //Funcion para insertar denuncia
    function newComplaint(string memory c_name, string memory hash) external onlyOwner{
        require(companyMapping[c_name].c_address != address(0),"Esta empresa no esta en el sistema");
        companyMapping[c_name].hashes_complaints.push(hash);
    }
    
}
