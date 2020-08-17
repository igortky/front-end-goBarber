import React, {useState, useEffect} from 'react';
import Header from './src/components/Header'
import './src/components/App.css'
import api from './src/services/api'

function App(){
   const [projects, setProjects] = useState([]);
   //useState retorna um array com duas posições
   //
   // 1 Posição variavel com seu valor inicial
   //2 posiçao função para atualizar o valor
   useEffect(()=>{
       api.get('projects').then(response => {
           setProjects(response.data);
       });
   }, [])
   
   async function handleAddProject(){
    // projects.push(`Novo projeto ${Date.now()}`);
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
       const response = await api.post('projects',{
        title: `Novo projeto ${Date.now()}`,
        owner: "Igor"
    });

    const project = response.data;

    setProjects([...projects,project])
   }
    return (
    <>
        
        <Header title="React Projeto" />
        <ul>
            {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>
        <button type='button' onClick= {handleAddProject}> Adicionar</button>
    </>
    );
}


export default App;