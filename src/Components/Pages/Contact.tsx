import { Card, CardContent, CardFooter, CardHeader, CardTitle , CardDescription} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";



const schema = z.object({
    name: z.string().min(1, 'este campo é obrigatório'),
    email: z.string().email('insira um email válido'),
    message: z.string().min(30, 'escreva no mínimo 30 caracteres'),
    phone: z.string()
        .min(10, 'insira um número de telefone válido')
        .max(15, 'o número de telefone não pode exceder 15 caracteres'),
    birthdate: z.string()
        .refine((value) => {
            const parsedDate = new Date(value); // Renomeado para evitar conflito
            return !isNaN(parsedDate.getTime());
        }, 'insira uma data de nascimento válida')
});

interface Contact {
    email: string;
    name: string;
    phone: string; 
    message: string;
    birthdate: string;
}

function Contact() {

    const {handleSubmit, register,  reset, formState: { errors } } = useForm<Contact>({
        resolver: zodResolver(schema)
    })

    function SendMessage(data: Contact) {
        const transformedData = {
            ...data,
            birth_date: data.birthdate // Transformando o campo para o formato esperado
        };

        fetch('http://localhost:3001/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transformedData) 
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            reset()
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-2/4 border border-black rounded-lg">
                <Card className="!bg-white border-none">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-extrabold px-2  text-black">Contate-nos</CardTitle>
                        <CardDescription className="text-zinc-900">no que podemos te ajudar? </CardDescription>
                        <div className="flex items-center justify-center">
                            <hr className="w-4/5 rounded-md"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form  onSubmit={handleSubmit(SendMessage)}>
                            <div className="grid grid-cols-2 gap-4 text-black">
                                <div>
                                    <Label htmlFor="email">Email:</Label>
                                    <div>
                                        <Input 
                                            id="email"
                                            {...register("email")} 
                                            type="email"
                                            placeholder="digite seu e-mail"
                                            className="px-3 py-1"
                                            
                                        />
                                        {errors.email && <span className="text-red-700 text-sm  flex items-center justify-center">{errors.email.message}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="name">Nome:</Label>
                                    <div>
                                        <Input 
                                            id="name"
                                            {...register("name")}
                                            type="text"
                                            placeholder="digite seu nome"
                                            className="px-3 py-1"
                                            
                                        />
                                        {errors.name && <span className="text-red-700 text-sm  flex items-center justify-center">{errors.name.message}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone">Contato:</Label>
                                    <div>
                                        <Input 
                                            id="phone"
                                            {...register("phone")}
                                            type="tel"
                                            placeholder="xx xxxxx-xxxx"
                                            className="px-3 py-1"
                                            
                                        />
                                        {errors.phone && <span className="text-red-700 text-sm  flex items-center justify-center">{errors.phone.message}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="birthdate">Data de nascimento:</Label>
                                    <div>
                                        <Input 
                                            id="birthdate"
                                            {...register("birthdate")}
                                            type="date"
                                            className="px-3 py-1 text-black"
                                            
                                        />
                                        {errors.birthdate && <span className="text-red-700 text-sm  flex items-center justify-center">{errors.birthdate.message}</span>}
                                    </div>
                                </div>

                                <div className="grid col-span-2 ">
                                    <Label htmlFor="message" className="mb-1">Sugestão:</Label>
                                    <div>
                                        <textarea 
                                            id="message"
                                            {...register("message")}    
                                            placeholder="digite sua mensagem"
                                            rows={5}
                                            cols={60}
                                            className="border-2 border-zinc-500 rounded-md placeholder:p-1 pl-1 pt-1"                                
                                        />
                                        {errors.message && <span className="text-red-700 text-sm flex items-center justify-center pb-1 pt-1">{errors.message.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <CardFooter className="flex items-center justify-center">
                                <button type="submit" className="w-10/12 mt-3 bg-black text-white hover:bg-zinc-900 py-2 px-4 rounded-md">
                                    Enviar
                                </button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
             </div>
        </div>
    );
}

export default Contact;
