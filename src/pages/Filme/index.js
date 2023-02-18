import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../services/api';

import './filme-info.css'

export default function Filme() {
  const { id } =useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    async function loadfilm(){
      await api.get(`/movie/${id}`, {
      params:{
        api_key: "8a0278d19c3f376840f4e9258b59c306",
        language: "pt-BR",
      }
      }) 
      .then((response)=>{
        setFilme(response.data)
        setLoading(false)
      }) 
      .catch(()=>{
        navigate("/", {replace: true})
        return
      })    
    }

    loadfilm();    

  },[navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo)=> filmesSalvo.id === filme.id )

    if(hasFilme){
      alert("Esse Filme ja está na lista")
        return;      
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("Filme salvo com sucesso!")

  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return ( 
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>      
      <strong>Avaliação: {filme.vote_average} / 10 </strong>

      <div className='area-buttons'>
        <button onClick={salvarFilme} >Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  )
}