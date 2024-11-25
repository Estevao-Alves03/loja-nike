    import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
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
            <div className="w-2/4 border-4 border-gray-900 rounded-lg">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-extrabold bg-gray-200 p-2 rounded border-2 border-gray-400 m-2">Contate-nos</CardTitle>
                        <div className="flex items-center justify-center">
                            <hr className="w-4/5 rounded-md"/>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form  onSubmit={handleSubmit(SendMessage)}>
                            <div className="grid grid-cols-2 gap-4">
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
                                        {errors.email && <span className="text-red-500  flex items-center justify-center">{errors.email.message}</span>}
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
                                        {errors.name && <span className="text-red-500  flex items-center justify-center">{errors.name.message}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="phone">Contato:</Label>
                                    <div>
                                        <Input 
                                            id="phone"
                                            {...register("phone")}
                                            type="tel"
                                            placeholder="(xx) xxxxx-xxxx"
                                            pattern="\(\d{2}\) \d{5}-\d{4}"
                                            className="px-3 py-1"
                                            
                                        />
                                        {errors.phone && <span className="text-red-500  flex items-center justify-center">{errors.phone.message}</span>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="birthdate">Data de nascimento:</Label>
                                    <div>
                                        <Input 
                                            id="birthdate"
                                            {...register("birthdate")}
                                            type="date"
                                            className="px-3 py-1"
                                            
                                        />
                                        {errors.birthdate && <span className="text-red-500  flex items-center justify-center">{errors.birthdate.message}</span>}
                                    </div>
                                </div>

                                <div className="grid col-span-2">
                                    <Label htmlFor="message" className="mb-1">Sugestão:</Label>
                                    <div>
                                        <textarea 
                                            id="message"
                                            {...register("message")}    
                                            placeholder="digite sua mensagem"
                                            rows={5}
                                            cols={60}
                                            className="border-2 rounded-md placeholder:p-1"
                                            
                                        />
                                        {errors.message && <span className="text-red-500 flex items-center justify-center pb-3 pt-1">{errors.message.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <CardFooter className="flex items-center justify-center">
                                <Button type="submit" className="w-10/12 mt-2 hover:bg-blue-700">
                                    Enviar
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Contact;
