import { Card, CardTitle, CardContent, CardDescription, CardFooter, CardHeader } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useUserStore } from "../../Zustand/UserStore"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"


const schema = z.object({
    email: z.string().email('email invalido'),
    password: z.string().min(6, 'a senha deve ter no minimo 6 caracteres')
})

function Login() {

    const login = useUserStore((state) => state.login)
    const currentUser = useUserStore((state) => state.currentUser)

    const navigate = useNavigate()
  

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);
   

    interface FormData { 
        email: string,
        password: string,
    }


    const {register, handleSubmit,  formState : { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: FormData) => {
        login(data)
    }

    function handleForgetPassword() {
        navigate('/forgetPassword')
    }


    return(
        <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-2/4 border border-gray-300 rounded-lg shadow-lg bg-white">      
        <Card className="p-6 shadow-md rounded-lg !bg-white">
        <CardHeader className="text-center mb-4">
                <CardTitle className="text-3xl font-extrabold px-2 text-black">Login</CardTitle>
                <CardDescription className="text-zinc-900">Bem-vindo de volta! Por favor, faça login.</CardDescription>
                <div className='flex items-center justify-center'>
                    <hr className='w-4/5' />
                </div>
        </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="email" className="text-sm ml-12 font-bold font-sans text-black">Email:</Label>
                    <div  className="flex flex-col items-center justify-center mb-6">
                        <Input 
                            id="email"
                            type="string"
                            placeholder="digite seu email"
                            {...register('email')}
                            className={`bg-gray-100 text-gray-800 w-10/12 cursor-text border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 ${
                              errors.email ? 'border-red-500' : ''
                            }`}
                            />
                            {errors.email && <span className="text-red-700 text-sm mt-1">{errors.email.message}</span>}
                    </div>
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-m ml-12 font-bold font-sans text-black">Senha:</Label>
                        <div className="flex flex-col items-center justify-center mb-4">
                            <Input 
                            id="password"
                            type="password"
                            placeholder="digite sua senha"
                            {...register('password')}                           
                            className={`bg-white text-black w-10/12 cursor-text ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <span className="text-red-700 text-sm mt-1">{errors.password.message}</span>}
                        </div>
                    </div>

                    <CardFooter className="flex items-center justify-center">
                        <button type="submit" className="w-10/12 p-3 mt-2 text-white bg-black rounded-md hover:bg-zinc-900">
                            Logar
                        </button>
                    </CardFooter>
                </form>

                <div className="flex items-center justify-center">
                    <button onClick={handleForgetPassword} className="bg-transparent text-black hover:bg-black hover:text-white border-2 py-2 px-4 rounded-md">
                        Esqueceu a senha?
                    </button>
                </div>
            </CardContent>
         </Card>
         </div>
       </div>
    )
}

export default Login