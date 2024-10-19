import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import {z} from 'zod'
import { Button } from "@/components/ui/button"

const schema = z.object({
    name: z.string().min(1, 'este campo é obrigatorio'),
    email: z.string().email('este campo é obrigatorio'),
    password: z.string().min(6, 'a senha deve ter no minimo 6 caracteres')
})

function Register() {

    interface FormData {
        name: string;
        email: string;
        password: string;
    }

    const {register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: FormData) => {
        try{
            const response = await fetch('http://localhost:3000/register',  {
                method: 'POST',
                headers: {
                 'Content-type': 'application/json'
                },
                body: JSON.stringify(data),
            })

            if(!response.ok) {
                throw new Error('erro ao enviar os dados')
            }

            const result = await response.json()
            console.log(result)
        }catch (error) {
            console.log('Erro', error)
        }
    }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('./Login')
    }

    return(
        <div className="h-screen flex items-center justify-center">
            <div className="w-2/4 border-4 border-gray-900 rounded-lg">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold bg-gray-200 p-2 rounded border border-gray-300 m-2">Cadastre-se</CardTitle>
                    <CardDescription className="font-medium">faça seu cadastro!</CardDescription>
                    <div className='flex items-center justify-center'>
                        <hr className='w-96' />
                    </div>
                  </CardHeader>
                  <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        {/* nome */}
                        <div>
                            <Label htmlFor="name" className="text-sm ml-12 font-bold font-sans">Nome:</Label>
                        <div className="flex flex-col items-center justify-center mb-4">
                            <Input 
                                id="name"
                                type="string"
                                placeholder={errors.name ? 'este campo é obrigatorio' : 'digite seu nome:'}
                                {...register('name',{required: 'este campo é obrigatorio'})}
                                className={`bg-white text-black w-10/12 ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <span className="text-blaxk text-sm mt-1">{errors.name.message}</span>}
                        </div>
                        </div>
                        {/* email */}
                        <div>
                            <Label htmlFor="email" className="text-sm ml-12 font-bold font-sans">Email:</Label>
                        <div className="flex flex-col items-center justify-center mb-4">
                            <Input 
                                id="email"
                                type="string"
                                placeholder={errors.email ? 'este campo é obrigatorio' : 'digite seu email:'}
                                {...register('email',{required: 'este campo é obrigatorio'})}
                                className={`bg-white text-black w-10/12 ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <span className="text-blaxk text-sm mt-1">{errors.email.message}</span>}
                        </div>
                        </div>
                        {/* senha */}
                        <div>
                            <Label htmlFor="password" className="text-sm ml-12 font-bold font-sans">Senha:</Label>
                        <div className="flex flex-col items-center justify-center mb-4">
                            <Input 
                                id="password"
                                type="password"
                                placeholder={errors.password ? 'este campo é obrigatorio' : 'digite sua senha:'}
                                {...register('password',{required: 'este campo é obrigatorio', minLength: {value: 6, message: 'a senha deve ter no minimo 6 caracteres'}})}
                                className={`bg-white text-black w-10/12 ${errors.password ? 'border-red-500' : ''}`}
                                />
                                {errors.password && <span className="text-blaxk text-sm mt-1">{errors.password.message}</span>}
                        </div>
                        </div>
                        {/* footer */}
                        <CardFooter className="flex items-center justify-center">
                            <Button className="w-10/12 mt-2 hover:bg-blue-700">
                                Enviar
                            </Button>
                        </CardFooter>
                        </form>
                        <div className="flex items-center justify-center">
                            <Button onClick={handleClick} className="bg-transparent text-black border-2 border-gray-200 hover:bg-blue-700 hover:text-white">
                                ja possui conta ?
                            </Button>
                        </div>
                  </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Register