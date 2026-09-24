import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../components/UserList.css'; // novo arquivo

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="user-card-list">
      {users.map((u) => (
        <div key={u.id} className="user-card">
          <h4>{u.name}</h4>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
}
