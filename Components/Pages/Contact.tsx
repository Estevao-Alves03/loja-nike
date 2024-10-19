import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Contact() {
    return(
       <div className="h-screen flex justify-center items-center">
        <div className="w-2/4 border-4 border-gray-900 rounded-lg">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold bg-gray-200 p-2 rounded border border-gray-300 m-2">Contate-nos</CardTitle>
                    <div className="flex items-center justify-center">
                        <hr className="w-96"/>
                    </div>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email:</Label>
                                <div>
                                    <Input 
                                    id="email"
                                    type="string"
                                    placeholder="digite seu e-mail"
                                    className="px-3 py-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="name">Name:</Label>
                                <div>
                                    <Input 
                                    id="name"
                                    type="string"
                                    placeholder="digite seu nome"
                                    className="px-3 py-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="phone">Contato:</Label>
                                <div>
                                    <Input 
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="(xx) xxxxx-xxxx"
                                    pattern="\(\d{2}\) \d{5}-\d{4}" required
                                    className="px-3 py-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="birthdate">Data de nascimento:</Label>
                                <div>
                                    <Input 
                                    id="birthdate"
                                    name="birthdate"
                                    type="date"
                                    required
                                    className="px-3 py-1"
                                    />
                                </div>
                            </div>

                            <div  className="grid col-span-2">
                                <Label htmlFor="message" className="mb-1">Sugestão:</Label>
                               <div>
                                <textarea 
                                id="message"
                                name="message"
                                placeholder="digite sua mensagem"
                                rows={5}
                                cols={60}
                                className="border-2 rounded-md placeholder:p-1"
                                />
                               </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    <Button className="w-10/12 hover:bg-blue-700">
                        Enviar
                    </Button>
                </CardFooter>
            </Card>
        </div>
       </div>
    )
}

export default Contact