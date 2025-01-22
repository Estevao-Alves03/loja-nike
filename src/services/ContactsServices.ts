import Api from "./Api";

export const getContacts = async () => {
    try {
        const response = await Api.get('/contacts')
        return response.data
    } catch (error) {
       console.log("erro ao buscar os dados", error)
       throw error 
    }
}

export const getContactsById = async(id: number) => {
    try {
        const response = await Api.get(`/contacts/${id}`)
        return response.data
    } catch (error) {
        console.log(`erro ao buscar o contato com o id ${id}`)
        throw error
    }
}

export const createContacts = async(contactsData: string) => {
    try {
       const response = await Api.post('/contacts', contactsData)
       return response.data 
    } catch (error) {
        console.log("erro ao criar o produto", error)
        throw error
    }
}

export const updateContacts = async(id: number, contactsData: string) => {
    try {
        const response = await Api.put(`/contacts/${id}`, contactsData)
        return response.data
    } catch (error) {
       console.log(`erro ao atualizar o contato com o id ${id}`)
       throw error 
    }
}


export const deleteContacts = async(id: number) => {
    try {
        const response = await Api.delete(`/contacts/${id}`)
        return response.data
    } catch (error) {
        console.log("erro ao deletar o contato", error)
        throw error
    }
}