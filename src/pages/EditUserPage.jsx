import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../components/EditUserPage.css';
import Modal from '../components/Modal';

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`);
        setFormData({ name: data.name, email: data.email, role: data.role });
      } catch {
        setModalMessage('Erro ao carregar usuário');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, formData);
      setModalMessage('Usuário atualizado com sucesso!');
      setTimeout(() => navigate('/users'), 2000); // redireciona após 2s
    } catch {
      setModalMessage('Erro ao atualizar usuário');
    }
  };

  return (
    <div className="edit-container">
      <h2>Editar Usuário</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Salvar</button>
      </form>

      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage('')} />
      )}
    </div>
  );
}
