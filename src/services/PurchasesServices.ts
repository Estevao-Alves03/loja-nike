import Api from "./Api";

export const getPurchases = async() => {
    try {
        const response = await Api.get('/purchases')
        return response.data
    } catch (error) {
       console.log("erro ao buscar os dados", error)
       throw error 
    }
}
export const getPurchasesById = async(id: number) => {
    try {
        const response = await Api.get(`/purchases/${id}`)
        return response.data
    } catch (error) {
       console.log("erro ao buscar os dados", error)
       throw error 
    }
}
export const createPurchases = async(purchasesData: string) => {
    try {
        const response = await Api.post('/purchases', purchasesData)
        return response.data
    } catch (error) {
       console.log("erro ao buscar os dados", error)
       throw error 
    }
}
export const updatePurchases = async(id: number, purchasesData: string) => {
    try {
        const response = await Api.put(`/purchases/${id}`, purchasesData)
        return response.data
    } catch (error) {
       console.log("erro ao buscar os dados", error)
       throw error 
    }
}
export const deletePurchases = async(id: number) => {
    try {
        const response = await Api.delete(`/purchases/${id}`)
        return response.data
    } catch (error) {
       console.log("erro ao buscar os dados", error)
       throw error 
    }
}