// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Entrevistas is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _entrevistasIds;
    struct Entrevista{
        uint256 entrevistaId;
        string prospectoId;
        string vacanteId;
        string fecha_entrevista;
        string notas;
        string reclutado;
    }

    mapping(uint256 => Entrevista) private entrevistas;
    uint256[] private entrevistasIds;

    event entrevistaRegistro(uint256 entrevistaId);

    function esEntrevista(uint256 _entrevistaId) public view returns (bool) {
        for (uint256 i = 1; i <= entrevistasIds.length; i++) {
            if (entrevistas[i].entrevistaId == _entrevistaId) {
                return true;
            }
        }
        return false;
    }
   

    function registrarEntrevista(string memory _prospectoId,string memory _vacanteId, string memory _fecha_entrevista, string memory _notas, string memory _reclutado) external onlyOwner{
        _entrevistasIds.increment();
        uint256 _entrevistaId = _entrevistasIds.current();

        Entrevista memory nuevaEntrevista = Entrevista({
            entrevistaId : _entrevistaId,
            prospectoId : _prospectoId,
            vacanteId : _vacanteId,
            fecha_entrevista : _fecha_entrevista,
            notas : _notas,
            reclutado : _reclutado
        });

        entrevistas[_entrevistaId] = nuevaEntrevista;
        entrevistasIds.push(_entrevistaId);

        emit entrevistaRegistro(_entrevistaId);

    }

    function obtenerEntrevistas(uint256 _entrevistaId) external view returns (Entrevista memory){
        require(esEntrevista(_entrevistaId), "La entrevista no  existe");
        return entrevistas[_entrevistaId];
    }

     function obtenerTodasEntrevistas() public view returns (Entrevista[] memory) {
        uint256 totalEntrevista = _entrevistasIds.current();
        Entrevista[] memory todasEntrevistas = new Entrevista[](totalEntrevista);
        for (uint256 i = 1; i <= totalEntrevista; i++) { 
            if (esEntrevista(i)) {
                todasEntrevistas[i - 1] = entrevistas[i];
            }
        }
        return todasEntrevistas;
    }

    function actualizarEntrevista(uint256 _entrevistaId, string memory _prospectoId, string memory _vacanteId, string memory _fecha_entrevista, string memory _notas,
        string memory _reclutado
    ) external onlyOwner {
        require(esEntrevista(_entrevistaId),"La entrevista no existe");
        entrevistas[_entrevistaId].prospectoId = _prospectoId;
        entrevistas[_entrevistaId].vacanteId = _vacanteId;
        entrevistas[_entrevistaId].fecha_entrevista = _fecha_entrevista;
        entrevistas[_entrevistaId].notas = _notas;
        entrevistas[_entrevistaId].reclutado = _reclutado;
    }

}