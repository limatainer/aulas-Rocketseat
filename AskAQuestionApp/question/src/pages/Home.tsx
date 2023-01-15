//essa sintaxe eh possivel gracas ao webpack e hoje comum importart arquivos assim
//todas as importacoes passam pelo webpack e com o Module Bundler ele transforma o formato(a extensao) em algo que possa ser utilizado no js
import { useHistory } from 'react-router';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');

  async function navigateToNewRoom() {
    if (!user) {
      await singInWithGoogle()//o resto do codigo so vai executar se a resp for de sucesso se der erro vai cair no catch e nao roda
    }

    history.push('/rooms/new');//por isso esse push so vai acontecer caso o user tiver autenticado
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();//so que nesse caso eh para revificar se a sala existe entao a escrita precisa do get

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustration representing question" />
        <strong>Ask a Question</strong>
        <p>Be amazed in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Question" />
          <button onClick={navigateToNewRoom} className="create-room">
            <img src={googleIconImg} alt="Google" />
            Start asking questions using Google
          </button>
          <div className="separator">OR aswer a Question</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Room Code"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Enter</Button>
          </form>
        </div>
      </main>
    </div>
  )
}