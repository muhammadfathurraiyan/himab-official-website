"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { loginAction } from "@/lib/actions";
import { LoginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signInAction(data: LoginForm) {
    const newData = new FormData();
    newData.append("email", data.email);
    newData.append("password", data.password);
    const result = await loginAction(newData);

    if (result) {
      toast({
        title: "Error!",
        description: `Terdapat kesalahan silahkan refresh halaman dan coba lagi.`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil login",
        description:
          "Anda berhasil login, selamat datang di menu dashboard admin.",
      });
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            // action={signInAction}
            onSubmit={form.handleSubmit(signInAction)}
          >
            <div className="space-y-2 mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="sabirin@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-2" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full">Sign in</Button>
      </CardFooter> */}
    </Card>
  );
}
