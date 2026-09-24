import { useState } from 'react';
import api from '../api/axiosConfig';
import './RegisterForm.css';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/', formData);
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      alert('Falha no registro: ' + (error.response?.data?.message || 'Erro desconhecido'));
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
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
      <input
        type="password"
        placeholder="Senha"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
