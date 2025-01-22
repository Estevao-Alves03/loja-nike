// importando os tipos de açoes para serem usadas
import UserActionTypes from "./action-types";

interface UserPayload {
    email: string;
    password: string;
}

// variaves de açao (login e logout)
export const LoginUser = (payload: UserPayload) => ({
    type: UserActionTypes.LOGIN,
    payload,
})

export const LogoutUser = () => ({
    type: UserActionTypes.LOGOUT,
})

// 