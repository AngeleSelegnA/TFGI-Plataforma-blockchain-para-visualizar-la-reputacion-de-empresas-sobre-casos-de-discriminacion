// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <= 0.8.10;
pragma experimental ABIEncoderV2;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ReputationTokens is IERC20{

    mapping(address => uint) n_tokens; //cantidad de tokens de cada empresa
    address immutable owner; //address de ReputationContract
    
    constructor(){
        owner = msg.sender; //El ReputationContract va a ser el owner de este contrato
    }

    modifier onlyOwner{
        require(msg.sender == owner, "No tienes estos permisos");
        _;
    }

    function createCompany(address c_address, uint initTokens) external onlyOwner{
        n_tokens[c_address] = initTokens;
    }

    function createCompanies(address[] memory c_add, uint initTokens) external onlyOwner{
        for(uint i = 0; i<c_add.length;++i){
            n_tokens[c_add[i]] = initTokens;
        }
    }
    
    function transferFrom(address from, address to, uint256 amount) override external onlyOwner returns (bool){
        require(n_tokens[from]>0,"No se pueden trasnferir los tokens");
        n_tokens[from] -= amount; //Tan solo se eliminan tokens.
        emit Transfer(from, to, amount);
        return true;
    }

    function balanceOf(address account) override external view onlyOwner returns (uint256){
        return n_tokens[account];
    }

    function balanceOfAll(address [] memory accounts) external view onlyOwner returns (uint[] memory){
        uint[] memory reputations = new uint[](accounts.length);
        for(uint i = 0; i < accounts.length; ++i){
            reputations[i] = n_tokens[accounts[i]];
        }
        return reputations;
    }
    
    function totalSupply() override external view onlyOwner returns (uint256){return 0;}
    function allowance(address _owner, address spender) override external view onlyOwner returns (uint256){return 0;}
    function transfer(address recipient, uint256 amount) override external onlyOwner returns (bool){return false;}
    function approve(address _approved, uint256 _tokenId) override external onlyOwner returns (bool){return false;}

}


contract ReputationContract {
  
  //Informacion de denuncias
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

    //Informacion de la empresa -> denuncias + reputacion
    struct CompanyData{
        address c_address; //Cada empresa lleva asociada un address para los tokens
        Complaint[] complaints; //Si todo va a IPFS, seria un array de strings (hashes)
    }

    uint initTokens; //cantidad inicial de cada empresa
    address immutable owner; //Nosotros somos los propietarios de este contrato
    string[] companies; //Nombres de las empresas que se pueden denunciar
    mapping(string => CompanyData) private companyMapping; //Datos de las denuncias referentes a una empresa
    ReputationTokens reputation;

    //Se inicializa la reputacion
    constructor(string [] memory _companies, uint _initTokens) {
        owner = msg.sender;
        companies = _companies;
        initTokens = _initTokens;
        reputation = new ReputationTokens();
        address [] memory c_add = new address[] (_companies.length);

        for(uint i = 0; i < _companies.length; i++){
            address add = address(bytes20(keccak256(abi.encodePacked(_companies[i])))); //address a partir de hash de nombre de la empresa
            companyMapping[_companies[i]].c_address = add; 
            c_add[i] = add;
              
        }
        reputation.createCompanies(c_add,initTokens);  
    }

    modifier onlyOwner{
        require(msg.sender == owner, "No tienes estos permisos");
        _;
    }

    //Function para devolver las empresas
    function  getCompanies() external view returns (string[] memory){
        return companies;
    }
    
    //Funcion para devolver los datos de la empresa: Denuncias, futuras metricas
    function getComplaints(string memory c_name) external view returns (Complaint[] memory) {
        return companyMapping[c_name].complaints;
    }

    function newCompany(string memory c_name) external {
        require(companyMapping[c_name].c_address == address(0),"Esta empresa ya esta en el sistema");
        address add = address(bytes20(keccak256(abi.encodePacked(c_name))));
        companyMapping[c_name].c_address = add; 
        reputation.createCompany(add,initTokens);    
    }
    
    //Funcion para obtener la reputacion
    function getReputation() external view returns (uint[] memory) {
        uint l = companies.length;
        address [] memory c_add = new address[](l);
        for(uint i = 0; i<l; ++i){
            c_add[i] = companyMapping[companies[i]].c_address;
        }
        return reputation.balanceOfAll(c_add);
    }
    
    //Funcion para insertar denuncia
    function newComplaint(string memory c_name, string memory u_name, string memory typeC, string memory hash, string memory gender, string memory etnia, string memory age,
                            string memory discapacity, bool consent, bool complaintBefore) external onlyOwner{
        address add = companyMapping[c_name].c_address;
        require(add != address(0),"Esta empresa no esta en el sistema");
        companyMapping[c_name].complaints.push(Complaint(u_name,typeC,hash,gender,etnia,age,discapacity,consent,complaintBefore));
        reputation.transferFrom(add,owner,1);
    }
    
}
