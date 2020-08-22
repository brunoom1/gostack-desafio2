import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories').then( ({ data }) => {
      setRepositories(data);
    });

  }, []);

  async function handleAddRepository() {
    try {

      const { data } = await api.post('repositories', {
        "title": "New repo " + (new Date().getUTCMilliseconds()),
        "url": "http://newurl.com",
        "techs": []
      });

      setRepositories([...repositories, data]);

    } catch (err) {

    }
  }

  async function handleRemoveRepository(id) {
    try {

      const { status } = await api.delete(`repositories/${id}`);

      if (status === 204) {
        repositories.splice(repositories.findIndex(r => r.id === id), 1);
        setRepositories([...repositories]);
      }

    } catch (err) {

    }  
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
          <li key={ repository.id }>
            { repository.title } <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
