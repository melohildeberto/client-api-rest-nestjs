import RegisterForm from '../components/RegisterForm';
import '../components/RegisterPage.css';
import MenuPage from '../pages/MenuPage'; // importa o menu

export default function RegisterPage() {
  return (
    <div className="register-container">
      {/* Menu no topo */}
      <MenuPage />
      <h2>Registrar Usuário</h2>
      <RegisterForm />
    </div>
  );
}
