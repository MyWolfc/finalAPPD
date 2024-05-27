// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Prospectos is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _prospectosIds;
    struct Prospecto{
        uint256 prospectoId;
        string nombre;
        string correo;
        string fecha_registro;
    }

    mapping(uint256 => Prospecto) private prospectos;
    uint256[] private prospectosIds;

    function esProspecto(uint256 _prospectoId) public view returns (bool) {
        for (uint256 i = 1; i <= prospectosIds.length; i++) {
            if (prospectos[i].prospectoId == _prospectoId) {
                return true;
            }
        }
        return false;
    }

    event prospectoRegistro(uint256 prospectoId);

    function registrarProspecto(string memory _nombre, string memory _correo, string memory _fecha_registro) external onlyOwner {
        _prospectosIds.increment();
        uint256 _prospectoId = _prospectosIds.current();

        Prospecto memory nuevoProspecto = Prospecto({
            prospectoId : _prospectoId,
            nombre : _nombre,
            correo : _correo,
            fecha_registro : _fecha_registro
        });

        prospectos[_prospectoId] = nuevoProspecto;
        prospectosIds.push(_prospectoId);
        emit prospectoRegistro(_prospectoId);
    }

    function obtenerProspectos(uint256 _prospectosId) external view returns (Prospecto memory){
        require(esProspecto(_prospectosId),"El prospecto no existe");
        return prospectos[_prospectosId];
    }

    function obtenerTodosProspectos() external view returns (Prospecto[] memory ){
        uint256 totalProspectos = _prospectosIds.current();
        Prospecto[] memory todosProspectos = new Prospecto[](totalProspectos);
        for(uint256 i = 1; i <= totalProspectos; i++){
            if(esProspecto(i)){
                todosProspectos[i - 1] = prospectos[i];
            }
        }
        return todosProspectos;
    }

    function actualizarProspecto(uint256 _prospectoId, string memory _nombre, string memory _correo, string memory _fecha_registro) external onlyOwner{
        require(esProspecto(_prospectoId),"El prospecto no existe");
        prospectos[_prospectoId].nombre = _nombre;
        prospectos[_prospectoId].correo = _correo;
        prospectos[_prospectoId].fecha_registro = _fecha_registro;
    }


}