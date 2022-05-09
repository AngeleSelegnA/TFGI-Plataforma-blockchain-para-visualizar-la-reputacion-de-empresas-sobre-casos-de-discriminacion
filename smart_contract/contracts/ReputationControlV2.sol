// SPDX-License-Identifier: CC0
pragma solidity ^0.8.0;

//import "../node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol";
interface IERC4974 {

    event Appointment(address indexed _operator);

    event Participation(address indexed _participant, bool _participation);

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    function setOperator(address _operator) external;

    function setParticipation(address _participant, bool _participation) external;

    function balanceOf(address _participant) external view returns (uint256);

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    function reallocate(address _from, address _to, uint256 _amount) external;
}

contract ERC4974 is IERC4974{

    mapping(address => uint256) private _balances;
    mapping(address => bool) private _participants;
    mapping(address => bool) private _authorized;
    address private _operator;
    uint256 private _totalSupply;

    
    constructor() {
        require(msg.sender != address(0), "Operator cannot be the zero address.");
        _operator = msg.sender;
        _participants[_operator] = true;
        _authorized[_operator] = true;
        _participants[address(0)] = true;
    }

    modifier onlyOperator(){
        require(msg.sender == _operator, "You must be the operator");
        _;
    }
    modifier onlyAuthorized(address account){
        require(_authorized[account], "You must be authorized");
        _;
    }
    /*
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == 0x225bcaf2 || super.supportsInterface(interfaceId);
    }
    */

    function setParticipation(address participant, bool participation) external virtual override onlyAuthorized(msg.sender){
        _participation(participant, participation);
    }

    //Añadido a la interfaz
    function setAuthorization(address account) external virtual onlyOperator{
        _authorized[account] = true;
    }

    function retireAuthorization(address account) external virtual onlyOperator{
        _authorized[account] = false;
    }

    function setOperator(address newOperator) external virtual override onlyOperator{
        _setOperator(newOperator);
    }
    

    function operator() external view virtual returns (address) {
        return _operator;
    }

    function balanceOf(address account) external view virtual override returns (uint256) {
        return _balances[account];
    }

    function participationOf(address account) external view virtual returns (bool) {
        return _participants[account];
    }

    function totalSupply() external view virtual returns (uint256) {
        return _totalSupply;
    }

    function mint(address to, uint256 amount) external virtual override onlyAuthorized(msg.sender){
        require(_participants[to], "{to} address is not an active participant.");
        _transfer(_operator, to, amount);
    }

    function burn(address from, uint256 amount) external virtual override onlyAuthorized(msg.sender){
        require(_participants[from], "{from} address is not an active participant.");
        _transfer(from, _operator, amount);
    }

    function reallocate(address from, address to, uint256 amount) external virtual override onlyAuthorized(msg.sender){
        _transfer(from, to, amount);
    }

    /**
     *
     * Internal Functions
     *
     */

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        if (from == _operator) {//mint
            _totalSupply += amount;
            _balances[to] += amount;
        } else if (to == _operator) { //burn
            require(_balances[from] >= amount, "{from} address holds less EXP than {amount}.");
            _balances[from] -= amount;
            _totalSupply -= amount;
        } 
        emit Transfer(from, to, amount);
    }

    function _participation(address participant, bool participation) internal virtual {
        require(participant != address(0), "Zero address cannot be in the system.");
        require(_participants[participant] != participation, "Participant already has {participation} status");
        _participants[participant] = participation;
        emit Participation(participant, participation);
    }

    function _setOperator(address newOperator) internal virtual {
        require(newOperator != address(0), "Operator cannot be the zero address.");
        require(_operator != newOperator, "{address} is already assigned as operator");
        _operator = newOperator;
        emit Appointment(newOperator);
    }

}

contract ReputationControl {

    struct CompanyData{
        address _address;
        string[] hashComplaints;
    }

    ERC4974 tokenContract;
    mapping(string => CompanyData) infoCompanies;
    string[] companies;
    address immutable owner;

    constructor(){
        owner = msg.sender;
        tokenContract = new ERC4974();
    }

    modifier onlyOwner{
        require(msg.sender == owner,"No tienes permisos");
        _;
    }

    function addCompanies(string[] memory _companies) external onlyOwner{
        for(uint i = 0; i < _companies.length; ++i){
            if(infoCompanies[_companies[i]]._address == address(0)){
                address add = address(bytes20(keccak256(abi.encodePacked(_companies[i]))));
                infoCompanies[_companies[i]]._address = add;
                companies.push(_companies[i]);
                tokenContract.setParticipation(add,true);
            }
        }
    }

    function addCompany(string memory _company) external onlyOwner{
        require(infoCompanies[_company]._address == address(0),"Ya esta en el sistema esta empresa");
        address add = address(bytes20(keccak256(abi.encodePacked(_company))));
        infoCompanies[_company]._address = add;
        companies.push(_company);
        tokenContract.setParticipation(add,true);
    }

    function getTotalComplaints() external view returns(uint){
        return tokenContract.totalSupply();
    }

    function getCompaniesNames() external view returns (string[] memory){
        return companies;
    }

    function getBalance(string memory _company) external view returns (uint){
        require(infoCompanies[_company]._address != address(0), "La empresa no esta en el sistema");
        return tokenContract.balanceOf(infoCompanies[_company]._address);
    }

    function getBalances() external view returns (uint[] memory){
        uint [] memory _balances = new uint[](companies.length);
        for(uint i = 0; i<companies.length;++i){
            _balances[i] = tokenContract.balanceOf(infoCompanies[companies[i]]._address);
        }
        return _balances;
    }

    function getCompaniesAddresses() external view returns (address[] memory){
        uint l = companies.length;
        address [] memory accounts  = new address[](l);
        for(uint i = 0; i < l; ++i){
            accounts[i] = infoCompanies[companies[i]]._address;
        }
        return accounts;
    }

    function getCompanyComplaints(string memory c_name) external view returns (string[] memory){
        return infoCompanies[c_name].hashComplaints;
    }

    function newComplaint(string memory _company, string memory _hash) external onlyOwner{
        address account = infoCompanies[_company]._address;
        require(account != address(0),"No esta en el sistema esta empresa");
        infoCompanies[_company].hashComplaints.push(_hash);
        tokenContract.mint(account,1);
    }
}