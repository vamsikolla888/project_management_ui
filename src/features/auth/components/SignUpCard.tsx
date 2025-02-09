import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";


/**@ShadcnComponents */
import { FormControl, FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signUpSchema, TSignUp } from "../schemas";
import { useRegister } from "../api/useRegister";

export const SignUpCard = () => {
    const { mutate } = useRegister();
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });


    const onSubmit = (values: TSignUp) => {
        console.log("VALUES", values);
        mutate({ json : values  })
    } 

  return (
    <Card className="w-full h-full md:w-[500px] border-none shadow-none">
        <CardHeader className="text-center p-7">
            <CardTitle className="text-2xl py-2">Sign Up</CardTitle>
            <CardDescription>
                By signing up, you agree to our {" "}
                <Link href="/privary">
                    <span className="text-blue-700">Privary Policy</span>
                </Link> {" "} and {" "}
                <Link href="/terms">
                    <span className="text-blue-700">Terms of Service</span>
                </Link> {" "}

            </CardDescription>
        </CardHeader>
        <div className="px-6 mb-4">
            <DottedSeparator />
        </div>
        <CardContent className="p-7">
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name={"name"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter full name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name={"password"}
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