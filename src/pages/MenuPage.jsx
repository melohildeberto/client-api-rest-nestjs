import { Link } from 'react-router-dom';
import '../components/MenuPage.css';

export default function MenuPage() {
  return (
    <div className="menu-container">
      <h2>Menu de Usuários</h2>
      <div className="menu-options">
        <Link to="/users" className="menu-card">
          <span className="menu-icon">👥</span>
          <span>Listar Usuários</span>
        </Link>
        <Link to="/register" className="menu-card">
          <span className="menu-icon">➕</span>
          <span>Registrar Usuário</span>
        </Link>
      </div>
    </div>
  );
}
