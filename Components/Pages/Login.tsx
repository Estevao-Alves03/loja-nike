import { Card, CardTitle, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useUserStore } from "@/Zustand/UserStore"
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
       <div className="h-screen flex items-center justify-center">
         <div className="w-2/4 border-4 border-gray-900 rounded-lg">
         <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-extrabold bg-gray-200 p-2 rounded border-2 border-gray-400 m-2">Login</CardTitle>
                <CardDescription className="font-medium">Bem-Vindo de volta!</CardDescription>
                <div className='flex items-center justify-center'>
                    <hr className='w-4/5' />
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
                            placeholder="digite seu email"
                            {...register('email')}
                            className={`bg-white text-black w-10/12 cursor-text ${errors.email ? 'border-red-500' : ''}`}
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
                            placeholder="digite sua senha"
                            {...register('password')}                           
                            className={`bg-white text-black w-10/12 cursor-text ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <span className="text-black text-sm mt-1">{errors.password.message}</span>}
                        </div>
                    </div>

                    <CardFooter className="flex items-center justify-center">
                        <Button type="submit" className="w-10/12 mt-2 text-white hover:bg-blue-700">
                            logar
                        </Button>
                    </CardFooter>
                </form>

                <div className="flex items-center justify-center">
                    <Button onClick={handleForgetPassword} className="bg-transparent text-black border-2 border-gray-200 hover:bg-blue-600 hover:text-white">
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