import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Main } from './components/Main';

import { api } from './services/api';

import './styles/global.scss';

import './components/SideBar/sidebar.scss';
import './components/Main/main.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar handleClickButton={handleClickButton} selectedGenreId={selectedGenreId}/>
      <Main selectedGenre={selectedGenre} selectedGenreId={selectedGenreId}/> 
    </div>
  )
}