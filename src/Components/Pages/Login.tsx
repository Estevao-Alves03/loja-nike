import { useState } from "react";
import { useUserStore } from "../../Zustand/UserStore";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardTitle, CardContent, CardDescription, CardFooter, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import api from "../../services/Api";
import Alert from "../Layout/Alert"; 
import { useAuthStore } from "../../Zustand/AuthStore";

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
});

function Login() {

    // const currentUser = useUserStore((state) => state.currentUser);
    const navigate = useNavigate();
    const [alert, setAlert] = useState<null | {message:string, type: "success" | "error" | "warning" | "info"}>(null)

    // const [message, setMessage] = useState<string | null>(null); // Estado para a mensagem de sucesso
    interface FormData { 
        email: string,
        password: string,
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

   const onSubmit = async (data: FormData) => {
    try {
        const response = await api.post('login', data);
        console.log("Resposta da API:", response.data);

        if (!response.data?.data?.user || !response.data?.data?.token) {
            console.error("Erro: Usuário ou token ausentes!", response.data);
            return;
        }
        

        if (!response.data?.data?.user || !response.data?.data?.token) {
            console.log("Erro: dados de usuário ou token ausentes.");
            return;
        }

        console.log("Antes do login Zustand:", useAuthStore.getState().isAuthenticated);
        
        useUserStore.getState().login(response.data.data.user, response.data.data.token, "Login realizado com sucesso!");
        
        localStorage.setItem('authToken', response.data.data.token); // 🔹 Salva o token
        

        console.log("Depois do login Zustand:", useAuthStore.getState().isAuthenticated);

        localStorage.setItem('authToken', response.data.data.token);
        setAlert({message: "login realizado com succeso!", type:"success"})

        setTimeout(() => {
            setAlert(null)
            navigate('/'); 
        }, 1500);

    } catch (error) {
        console.error("Erro ao tentar logar:", error);
    }
};

 
    // const { isAuthenticated } = useAuthStore();

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate('/');
    //     }
    // }, [isAuthenticated, navigate]);

    
    function handleForgetPassword() {
        navigate('/forgetPassword');
    }

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            {/* {message && <Alert message={message} type="success" />} Renderiza o Alert quando houver mensagem */}

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
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <Input 
                                        id="email"
                                        type="email"
                                        placeholder="Digite seu email"
                                        {...register('email')}
                                        className={`bg-gray-100 text-gray-800 w-10/12 cursor-text border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 ${
                                            errors.email ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.email && <span className="text-red-700 text-sm mt-1">{errors.email.message}</span>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm ml-12 font-bold font-sans text-black">Senha:</Label>
                                <div className="flex flex-col items-center justify-center mb-4 relative">
                                    <Input 
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        {...register('password')}                           
                                        className={`bg-white text-black w-10/12 cursor-text border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 ${
                                            errors.password ? 'border-red-500' : ''
                                        }`}
                                    />
                                    <button 
                                        type="button" 
                                        className="absolute inset-y-0 right-12 flex items-center px-3 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 01.358-1.956m.332-.984A10.032 10.032 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.032 10.032 0 01-.332.984m-4.088 4.018A3 3 0 0112 15m0 0a3 3 0 01-2.2-1.2m4.4 0A3 3 0 0112 15m0 0v.01" />
                                            </svg>
                                        )}
                                    </button>
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

            {alert && <Alert message={alert.message} type={alert.type}/>}
        </div>
    );
}

export default Login;
