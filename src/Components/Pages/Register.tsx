import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "este campo é obrigatorio"),
  lastname: z.string().min(1, "este campo é obrigatorio"),
  email: z.string().email("insira um email válido"),
  phone: z.string()
    .min(10, "o telefone deve ter no mínimo 10 caracteres")
    .max(15, "o telefone deve ter no máximo 15 caracteres"),
  birth: z.coerce.date({ message: "Insira uma data válida" }),
  cpf: z.string()
  .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF inválido"),
  password: z.string().min(6, "a senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string().min(6, "a confirmação de senha deve ter no mínimo 6 caracteres"),
  nameStreet: z.string().min(1, "este campo é obrigatorio"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "este campo é obrigatorio"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas devem coincidir",
  path: ["confirmPassword"],
});

interface Register {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  birth: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  nameStreet: string;
  complement?: string;
  neighborhood: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate()


  function SendMessage(data: Register) {
  console.log("Dados enviados:", data);

  const isValidDate = !isNaN(new Date(data.birth).getTime());
  if (!isValidDate) {
    console.error("Data de nascimento inválida", data.birth);
    return;
  }

  const formattedBirth = new Date(data.birth).toISOString().split("T")[0];

  const formData = {
    name: data.name,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    birth: formattedBirth,
    complement: data.complement,
    confirm_password: data.confirmPassword,
    cpf: data.cpf,
    password: data.password,
    name_street: data.nameStreet,
    neighborhood: data.neighborhood,
  };

  console.log("Formulário antes do envio:", formData);

  fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (resp) => {
      if (!resp.ok) {
        const error = await resp.json().catch(() => ({ message: "Erro no cadastro" }));
        throw new Error(error.message || "Erro no cadastro");
      }
      return resp.json();
    })
    .then((userData) => {
      console.log("Resposta da API (usuário criado):", userData);

      const user_id = userData?.id || userData?.data?.id;
      console.log("User ID recebido:", user_id);

      if (!user_id) {
        throw new Error("O ID do usuário não foi retornado corretamente.");
      }

      console.log("Enviando endereço com user_id:", user_id);

      const addressData = {
        user_id,
        name_street: formData.name_street,
        neighborhood: formData.neighborhood,
        complement: formData.complement,
      };

      console.log("Dados do endereço:", addressData);

      return fetch("http://localhost:3001/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });
    })
    .then(async (resp) => {
      if (!resp.ok) {
        const error = await resp.json().catch(() => ({ message: "Erro ao cadastrar endereço" }));
        throw new Error(error.message || "Erro ao cadastrar endereço");
      }
      return resp.json();
    })
    .then(() => {
      console.log("Usuário e endereço cadastrados com sucesso!");
      reset();
      navigate("/");
    })
    .catch((err) => {
      console.error("Erro:", err.message);
    });
}

  
  

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Usuário já autenticado!');
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl !bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold px-2 text-black">
            Cadastre-se
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2 text-gray-400">
            faça seu cadastro!
          </p>
          <div className="flex items-center justify-center">
            <hr className="w-4/5" />
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(SendMessage)}>
            {/* nome e sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black">Nome:</Label>
                <Input
                  id="name"
                  placeholder={errors.name ? "este campo é obrigatorio" : "Digite seu nome"}
                  {...register("name")}
                  className={`text-black ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <span className="text-red-700 text-sm">{errors.name.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname" className="text-black">Sobrenome:</Label>
                <Input
                  id="lastname"
                  placeholder={errors.lastname ? "este campo é obrigatorio" : "Digite seu sobrenome"}
                  {...register("lastname")}
                  className={`text-black ${errors.lastname ? "border-red-500" : ""}`}
                />
                {errors.lastname && <span className="text-red-700 text-sm">{errors.lastname.message}</span>}
              </div>
            </div>

            {/* email e cpf */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">Email:</Label>
              <Input
                id="email"
                type="email"
                placeholder={errors.email ? "este campo é obrigatorio" : "Digite seu email"}
                {...register("email")}
                className={`text-black ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <span className="text-red-700 text-sm">{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
            <Label htmlFor="cpf" className="text-black">CPF:</Label>
            <InputMask
              mask="999.999.999-99"
              placeholder="000.000.000-00"
              {...register("cpf")}
              className={`text-black ${errors.cpf ? "border-red-500" : ""}`}
            >
              {(inputProps) => <Input {...inputProps} />}
            </InputMask>
            {errors.cpf && <span className="text-red-700 text-sm">{errors.cpf.message}</span>}
            </div>
            </div>

            {/* telefone e data de nascimento  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black">Telefone:</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={errors.phone ? "insira um telefone válido" : "(xx) xxxxx-xxxx"}
                  {...register("phone")}
                  className={`text-black ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && <span className="text-red-700 text-sm">{errors.phone.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birth" className="text-black">Data de Nascimento:</Label>
                <Input
                  id="birth"
                  type="date"
                  {...register("birth")}
                  className={`text-black ${errors.birth ? "border-red-500" : ""}`}
                />
                {errors.birth && <span className="text-red-700 text-sm">{errors.birth.message}</span>}
              </div>
            </div>

            {/* nome da rua */}
            <div className="space-y-2">
              <Label htmlFor="nameStreet" className="text-black">Rua:</Label>
              <Input
                id="nameStreet"
                placeholder={errors.nameStreet ? "este campo é obrigatorio" : "Digite o nome da rua"}
                {...register("nameStreet")}
                className={`text-black ${errors.nameStreet ? "border-red-500" : ""}`}
              />
              {errors.nameStreet && <span className="text-red-700 text-sm">{errors.nameStreet.message}</span>}
            </div>

            {/* nome do bairro e complemento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complement" className="text-black">Complemento:</Label>
                <Input
                  id="complement"
                  placeholder="Digite o complemento"
                  {...register("complement")}
                  className="text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood" className="text-black">Bairro:</Label>
                <Input
                  id="neighborhood"
                  placeholder={errors.neighborhood ? "este campo é obrigatorio" : "Digite o bairro"}
                  {...register("neighborhood")}
                  className={`text-black ${errors.neighborhood ? "border-red-500" : ""}`}
                />
                {errors.neighborhood && <span className="text-red-700 text-sm">{errors.neighborhood.message}</span>}
              </div>
            </div>

            {/* senha e confirmaçao da senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">Senha:</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={errors.password ? "este campo é obrigatorio" : "Digite sua senha"}
                    {...register("password")}
                    className={`text-black w-full pr-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
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
                </div>
                {errors.password && <span className="text-red-700 text-sm">{errors.password.message}</span>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-black">Confirme sua senha:</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={errors.confirmPassword ? "As senhas devem ser iguais" : "Confirme sua senha"}
                    {...register("confirmPassword")}
                    className={`text-black w-full pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  >
                    {showConfirmPassword ? (
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
                </div>
                {errors.confirmPassword && <span className="text-red-700 text-sm">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full hover:bg-zinc-900 bg-black py-2 px-4 rounded-md text-white">
              Enviar
            </button>
            <div className="flex items-center justify-center  text-black text-center">
              <button className="w-40 bg-transparent rounded-md py-2 px-4 border-2 hover:bg-black hover:text-white" 
              onClick={() => navigate('/login')}>
                ja possui conta ?
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;