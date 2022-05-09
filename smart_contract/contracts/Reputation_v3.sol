// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <= 0.8.10;
pragma experimental ABIEncoderV2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract ReputationTokens is IERC20{

    struct CompanyData{
        uint tokens;
        string[] hashes_complaints; //hashes que apuntan a la denuncia en IPFS
    }

    address immutable owner; //Nosotros somos los propietarios de este contrato
    mapping(address => CompanyData) companyMapping; //Datos de las denuncias referentes a una empresa
    uint initTokens = 1000;

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
            c_add[i] = address(bytes20(keccak256(abi.encodePacked(_companies[i]))));
            companyMapping[c_add[i]].tokens = initTokens;
        }
        return c_add;
    }

    //Añadir una empresa al sistema
    function newCompany(string memory c_name) external onlyOwner returns (address){
        address add = address(bytes20(keccak256(abi.encodePacked(c_name))));
        require(companyMapping[add].tokens == 0,"Esta empresa ya esta en el sistema");
        companyMapping[add].tokens = initTokens;
        return add;
    }

    //Funcion para devolver los datos de la empresa: Denuncias, futuras metricas
    function getHashesComplaints(address c_add) external view returns (string[] memory) {
        return companyMapping[c_add].hashes_complaints;
    }

    //Funcion para devolver la reputacion de las empresas
    function balanceOfAll(address [] memory c_add) external view returns (uint[] memory){
        uint[] memory reps = new uint[](c_add.length);
        for(uint i = 0; i < c_add.length; ++i){
            if(companyMapping[c_add[i]].tokens == 0){//Address no asociado a ninguna empresa
                reps[i] = 0;
            }
            else{
                reps[i] = companyMapping[c_add[i]].tokens;
            }
        }
        return reps;
    }

    //Funcion para insertar denuncia
    function newComplaint(address from, string memory hash) external onlyOwner{
        require(companyMapping[from].tokens>0,"Esta empresa no esta en el sistema");
        companyMapping[from].hashes_complaints.push(hash);
    }


    //Funciones tokens ERC20:
    function balanceOf(address account) override external view returns (uint256){
        return companyMapping[account].tokens;
    }

    function transferFrom(address sender, address recipient, uint256 amount) override external onlyOwner returns (bool){
        require(companyMapping[sender].tokens > amount, "La empresa no existe o no puede recoger mas denuncias");
        companyMapping[sender].tokens -= amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }
    
}