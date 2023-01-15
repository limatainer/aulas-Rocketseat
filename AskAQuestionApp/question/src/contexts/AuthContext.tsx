import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

//vou tipar
type User = {
  id: string;
  name: string;
  avatar: string;
}

type authContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}
//vou exportar os contextos
export const authContext = createContext({} as authContextType); //para trabalhar o sign in e o contexto de usuario nas paginas quando logado


export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>(); //para trabalhar o sign in e o contexto de usuario nas paginas quando logado

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({ //se quando fizer o login pego as infos certinhas ele vai setar as infos dele nessas variaveis
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => { //boas praticas quando crio event listener como essa useEffect que eh uma hoook eh descadastrar para evitar que quando o usuario nao estiver mais nao fique dando erro
      unsubscribe();
    }
  }, [])

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();


    const result = await auth.signInWithPopup(provider)
    //vou chamar essa funcao la no authContext para que todas as paginas tenham acesso
    //console.log(result);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({ //se quando fizer o login pego as infos certinhas ele vai setar as infos dele nessas variaveis
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <authContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
    </authContext.Provider>
  );
}