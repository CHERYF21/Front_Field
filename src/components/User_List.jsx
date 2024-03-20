import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { listUser } from '../service/userService';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 5;
  const indicePrimerUsuario = (paginaActual - 1) * usuariosPorPagina;
  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const usuariosActuales = usuarios.slice(indicePrimerUsuario, indiceUltimoUsuario);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await listUser();
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al listar usuarios', error);
      }
    }
    fetchUsers();
  }, []);

  const eliminarUsuario = (id) => {
    axios
      .delete(`/api/usuarios/${id}`)
      .then((response) => {
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        console.log('Usuario eliminado con éxito');
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const irPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < Math.ceil(usuarios.length / usuariosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };


  return (
    <Container>
      <Title>
        Lista de Usuarios Field <Span>Market</Span>
      </Title>
      <SearchInput
        type="text"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
        placeholder="Buscar por nombre..."
      />
      <Button bgColor="#006400" onClick={() => setFiltroNombre('')}>
        Limpiar
      </Button>
      <Button bgColor="#006400">Buscar</Button>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Username</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosActuales.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.username}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.direccion}</td>
              <td>
                <Button bgColor="#ee2738" onClick={() => eliminarUsuario(usuario.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageButton onClick={irPaginaAnterior}>&laquo; Anterior</PageButton>
        {Array.from({ length: Math.ceil(usuarios.length / usuariosPorPagina) }, (_, index) => (
          <PageButton key={index + 1} onClick={() => cambiarPagina(index + 1)}>
            {index + 1}
          </PageButton>
        ))}
        <PageButton onClick={irPaginaSiguiente}>Siguiente &raquo;</PageButton>
      </Pagination>
    </Container>
  );
};

export default UserList;

const Container = styled.div`
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.h2`
  color: #fff;
  font-family: inherit;
  font-size: 25px;
  margin-top: 10px;
`;

const Span = styled.span`
  color: #1fc271;
`;

const SearchInput = styled.input`
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  margin-bottom: 10px;
  margin-left: 400px;
  margin-right: 2px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border: none;
  padding: 8px 11px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;

const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  background-color: #006400;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004d00;
  }
`;
