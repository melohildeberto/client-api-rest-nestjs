import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../components/UsersPage.css';
import MenuPage from '../pages/MenuPage';
import ConfirmModal from '../components/ConfirmModal';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error.response?.data || error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setConfirmOpen(false);
      setSelectedUser(null);
    } catch {
      alert('Erro ao remover usuário');
    }
  };

  return (
    <div className="users-container">
      <MenuPage />
      <h2>Lista de Usuários</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => navigate(`/users/${user.id}/edit`)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteClick(user)}
                >
                  🗑️ Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmOpen && (
        <ConfirmModal
          message={`Deseja realmente remover ${selectedUser?.name}?`}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}
