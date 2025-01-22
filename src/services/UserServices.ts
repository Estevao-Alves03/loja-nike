import Api from "./Api";


// faz a requisiçao de todos os usarios
export const getUsers = async() => {
    try {
        const response = await Api.get('/users')
        return response.data
    } catch (error) {
        console.log('erro ao encontrar os dados', error)
        throw error
    }
}
// faz a requisiçao de um usuario especifico 
export const getUsersById = async (id: number) => {
    try {
        const response = await Api.get(`/users/${id}`) 
        return response.data     
    } catch (error) {
        console.log(`erro ao encontrar o usuario com o id ${id}`, error)
        throw error
    }
}
// faz a requisiçao para a criaçao de um novo usuario
export const createUser = async (userData: string) => {
    try {
        const response = await Api.post('/users', userData)
        return response.data        
    } catch (error) {
        console.log("erro ao criar o usuario", error)
        throw error
    }
}
// faz a requisiçao para a atualizar um usuario especifico
export const updateUser = async (id: number, userData: string) => {
    try {
        const response = await Api.put(`/users/${id}`, userData)
        return response.data
    } catch (error) {
        console.log("erro ao atualizar o usuario", error)
        throw error
    }
}

// faz a requisiçao para deletar um usuario 
export const deleteUser = async (id: number) => {
    try {
        const response = await Api.delete(`/users/${id}`)
        return response.data
    } catch (error) {
        console.log("erro ao tentar deletar o usuario", error)
        throw error
    }
}