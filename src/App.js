import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";



function App() {

  const [repositories, setRepositories] = useState([])
  async function handleAddRepository() {
    const response =  await api.post('/repositories', {
      title: "React",
      url: "google.com",
      techs: ["tech 1", "tech 2"]
    })
    setRepositories([...repositories, response.data])
  }
  async function getRepositories() {
    try {
      const response = await api.get('/repositories')
      setRepositories(response.data)

    } catch (error) {
      console.log(error)
    }

  }
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))

  }
  useEffect(() => {
    getRepositories()
  }, [])
  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (
          <li key={repository.id}> {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
