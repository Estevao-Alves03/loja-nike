import Api from "./Api";

export const getProducts = async () => {
    try {
        const response = await Api.get('/products')
        return response.data        
    } catch (error) {
        console.log("erro ao buscar os dados", error)
        throw error
    }
}

export const getProductsById = async(id: number) => {
    try {
        const response = await Api.get(`/products/${id}`)
        return response.data
    } catch (error) {
        console.log(`erro ao buscar o produto com o id ${id}`)
    }
}

export const createProducts = async(productsData: string) => {
    try {
        const response = await Api.post('/products', productsData)
        return response.data
    } catch (error) {
        console.log("erro ao criar o produto", error)
        throw error
    }
}

export const updateProducts = async(id: number, productsData: string) => {
    try {
        const response = await Api.put(`/products/${id}`, productsData)
        return response.data
    } catch (error) {
       console.log(`erro ao atualizar o produto com o id ${id}`) 
    }
}

export const deleteProducts = async(id: number) => {
    try {
        const response = await Api.delete(`/products/${id}`)
        return response.data
    } catch (error) {
        console.log("erro ao deletar o produto", error)
        throw error
    }
}

