import { Card, CardTitle, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

const schema = z.object({
    email: z.string().email('email invalido'),
    password: z.string().min(6, 'a senha deve ter no minimo 6 caracteres')
})

function Login() {


    interface FormData {
        email: string;
        password: string;
    }

    const {register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data : FormData) => {
        console.log(data)
    }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('./Password.tsx')
    }

    return(
       <div className="h-screen flex items-center justify-center">
         <div className="w-2/4 border-4 border-gray-900 rounded-lg">
         <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-extrabold bg-gray-200 p-2 rounded border border-gray-300 m-2">Login</CardTitle>
                <CardDescription className="font-medium">Bem-Vindo de volta!</CardDescription>
                <div className='flex items-center justify-center'>
                    <hr className='w-96' />
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="email" className="text-sm ml-12 font-bold font-sans">Email:</Label>
                    <div className="flex flex-col items-center justify-center mb-4">
                        <Input 
                            id="email"
                            type="string"
                            placeholder={errors.email ? 'este campo é obrigatorio' : 'digite seu email:'}
                            {...register('email',{required: 'este campo é obrigatorio', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Email inválido' }})}
                            className={`bg-white text-black w-10/12 ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <span className="text-blaxk text-sm mt-1">{errors.email.message}</span>}
                    </div>
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-m ml-12 font-bold font-sans">Senha:</Label>
                        <div className="flex flex-col items-center justify-center mb-4">
                            <Input 
                            id="password"
                            type="password"
                            placeholder={errors.password ? 'este campo é obrigatorio' : 'digite sua senha:'}
                            {...register('password', {required: 'este campo é obrigatorio', minLength: {value: 6, message: 'a senha deve ter no minimo 6 caracteres'}})}
                            className={`bg-white text-black w-10/12 ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <span className="text-black text-sm mt-1">{errors.password.message}</span>}
                        </div>
                    </div>

                    <CardFooter className="flex items-center justify-center">
                        <Button className="w-10/12 mt-2 text-white hover:bg-blue-700">
                            Entrar
                        </Button>
                    </CardFooter>
                </form>

                <div className="flex items-center justify-center">
                    <Button onClick={handleClick} className="bg-transparent text-black border-2 border-gray-200 hover:bg-blue-600 hover:text-white">
                        Esqueceu a senha?
                    </Button>
                </div>
            </CardContent>
         </Card>
         </div>
       </div>
    )
}

export default Login