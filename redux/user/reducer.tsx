// importou os tipos da açao do usuario
import UserActionTypes from "./action-types";

// criou uma variavel que informa que o estado inicial do usuario começa nulo, vazio para depois ir recebendo os dados
const initialState = {
    currentUser: null
}

interface UserAction {
    type: string,
    payload: any,
}

// sempre que criamos um reducer ele recebe dois parametros: o state(estado) e uma action(açao), nesse caso o state recebeu. e com base no tipo de ação ( action.type), ele decide como o estado deve ser atualizado

// nessa funçao caso receba a açao do tipo LOGIN, ele vai manter os dados que ja estao salvos dentro do nosso state, e vai adicionar a açao do payload, no caso os dados que viram do login, exemplo: name, email, password etc

// caso receba a açao do tipo LOGOUT, ele vai manter os dados que ja estao salvos dentro do nosso state, e vai definir o state como nulo indicando que o usuario fez logout e nao ha mais um usuario autenticado

// caso a ação despachada não corresponda a nenhum dos tipos definidos no switch(como LOGINou LOGOUT), o estado atual seja retornado inalterado. Isso é necessário para que o redutor não altere o estado de forma indesejada. (default)

const userReducer = (state = initialState, action: UserAction) => {
    switch(action.type){
        case UserActionTypes.LOGIN: 
            return{...state, currentUser: action.payload}
        case UserActionTypes.LOGOUT:
            return{...state, currentUser: null};
        default:
            return state
    }
}

export default userReducer