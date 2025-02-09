/**@ThirdPartyLibraryImports */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

/**@AlaisImports */
/**@ShadcnComponentImports */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

/**@LocalComponentImports */
import { DottedSeparator } from "@/components/dotted-separator";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/useLogin";
const SignInCard = () => {
    const { mutate } = useLogin();
    const form = useForm<z.infer<typeof loginSchema>>(
        {
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "",
                password: "",
            }
         }
    );

    const onSubmit = (values:z.infer<typeof loginSchema>) => {
       mutate({ json: values });
    }
  return (
    <Card className="w-full h-full md:w-[500px] border-none shadow-none">
        <CardHeader className="text-center p-7">
            <CardTitle>Welcome back</CardTitle>
        </CardHeader>
        <div className="px-6 mb-4">
            <DottedSeparator />
        </div>
        <CardContent className="p-7">
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name={"email"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Enter email address"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={false} size={"lg"} className="w-full">Login</Button>
                </form>
            </Form>
        </CardContent>
        <div className="px-6 mb-4">
            <DottedSeparator />
        </div>
        <CardContent className="p-7 flex flex-col gap-4">
            <Button 
                disabled={false}
                variant={"secondary"}
                size={"lg"}
                className="flex items-center w-full"
            >
                <FcGoogle className="mr-2 size-5" />
                Login with Google
            </Button>
            <Button 
                disabled={false}
                variant={"secondary"}
                size={"lg"}
                className="flex items-center w-full"
            >
            <FaGithub className="mr-2 size-5" />
                Login with Github
            </Button>
        </CardContent>
    </Card>
  )
}

export default SignInCard