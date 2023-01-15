import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';
//a documentacao para rotas mudou drasticamente e nao eh mais escrita assim como na versao 5.0.0
//o switch nessa epoca serve para nao deixar que a rota seja chamada varias vezes na mesma consulta ou seja na rota acessada se ele encontrar a que foi pedida nao vai carregar as outras
function App() { //aqueles :id eh a forma de acessar um parametro e diz ao react router doom que essa rota vai retornar o componenter room passando o parametro id

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>

    </BrowserRouter>
  );
}
export default App;