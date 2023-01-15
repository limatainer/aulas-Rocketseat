import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import askImg from '../assets/images/ask.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
//import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory()
  const [newRoom, setNewRoow] = useState(''); //esse estado vai ajudar a pegar o input recebido no form e passar no handleCreateRoom function

  async function handleCreateRoom(event: FormEvent) {//essa tipagem formevent ja eh do react
    event.preventDefault();
    //console.log(newRoom);
    if (newRoom.trim() === '') {//le-se que se newroom recebeu valor vazio ele vai verificar com trim e evitar receber nomes vazios retornando nada
      return;
    }
    //essa const abaixo vai add uma ref como parametro rooms no database do firebase
    const roomRef = database.ref('rooms')//reference eh algo que existe dentro do firebase que eh a referencia de um registro de dado dentro do db
    //estou me referindo a uma linha do db tipo uma entidade que eu inserir dentro do banco
    //com o rooms eu digo que dentro do meu db eu vou ter uma categoria chamada rooms que posso incluir dados como nome da sala ou ate dados interativos como um array de perguntas
    //posso salvar vetor obj string bool o que eu quiser
    const firebaseRoom = await roomRef.push({//vai aguardar se foi criado a ref e dar push
      title: newRoom,
      authorId: user?.id, // a ? eh porque no primeiro momento o user vem como undefined e assim sim tem um id atribuido

    })//isso eh da propia doc do firebase essa const vai procurar a referencia chamada room e dentro dela eu faco o push ou seja eh assim que vai ficar inserido la
    history.push(`/rooms/${firebaseRoom.key}`);//assim eu vou redirecionar o usuario para a sala ja pegando o key que eh o id da sala
    //ou seja alem de me redirecionar para a sala criada a rota vai ter o id dessa sala na barra de enderecos
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustration representing question" />
        <h2><strong>Ask a Question</strong></h2>
        <p>Be amazed in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={askImg} alt="Question" />

          <h2>Ask new Question</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Room Name"
              onChange={event => setNewRoow(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Ask</Button>
          </form>
          <p>Want to answer a Question? <Link to="/">click here</Link></p>
        </div>
      </main>
    </div>
  )
}