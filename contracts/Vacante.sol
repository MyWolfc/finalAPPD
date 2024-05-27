// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vacantes is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _vacantesIds;
    struct Vacante{
        uint256 vacanteId;
        string area;
        string sueldo;
        string activo;
    }

    mapping(uint256 => Vacante) private vacantes;
    uint256[] private vacantesIds;

    function esVacante(uint256 _vacanteId) public view returns (bool) {
        for (uint256 i = 1; i <= vacantesIds.length; i++) {
            if (vacantes[i].vacanteId == _vacanteId) {
                return true;
            }
        }
        return false;
    }

    event vacanteRegistro(uint256 vacanteId);

    function registrarVacante(string memory _area, string memory _sueldo, string memory _activo) external onlyOwner {
        _vacantesIds.increment();
        uint256 _vacanteId = _vacantesIds.current();
        Vacante memory nuevaVacante = Vacante({
            vacanteId : _vacanteId,
            area : _area,
            sueldo : _sueldo,
            activo : _activo
        });
        vacantes[_vacanteId] = nuevaVacante;
        vacantesIds.push(_vacanteId);
        emit vacanteRegistro(_vacanteId);
    }

    function obtenerVacantes(uint256 _vacanteId) external view returns (Vacante memory){
        require(esVacante(_vacanteId),"La vacante no existe" );
        return vacantes[_vacanteId];
    }

    function obtenerTodasVacantes() public view returns (Vacante[] memory) {
        uint256 totalVacantes = _vacantesIds.current();
        Vacante[] memory todasVacantes = new Vacante[](totalVacantes);

        for (uint256 i = 1; i <= totalVacantes; i++) { 
            if (esVacante(i)) {
                todasVacantes[i - 1] = vacantes[i];
            }
        }
        return todasVacantes;
    }


    function actualizarVacante(uint256 _vacanteId, string memory _area, string memory _sueldo, string memory _activo) external onlyOwner {
        require(esVacante(_vacanteId),"La vacante no existe" );
        vacantes[_vacanteId].area = _area;
        vacantes[_vacanteId].sueldo = _sueldo;
        vacantes[_vacanteId].activo = _activo;
    }
    
}