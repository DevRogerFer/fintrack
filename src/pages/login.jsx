import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/contexts/auth';

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'O email deve ser válido!',
    })
    .trim()
    .min(1, {
      message: 'O email é obrigatório!',
    }),
  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres!',
  }),
});

const LoginPage = () => {
  const { user, login } = useAuthContext();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data) => login(data);

  if (user) {
    return <div>Bem-vindo(a), {user.first_name}!</div>;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* E-MAIL */}
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SENHA */}
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup">Crie uma conta</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
