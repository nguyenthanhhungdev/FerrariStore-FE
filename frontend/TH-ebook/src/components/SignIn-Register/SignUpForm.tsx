import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import {useForm, SubmitHandler} from "react-hook-form";
import {useState} from "react";

interface ISignUpSchema {
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
}

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        // watch,
        formState: {errors}
    } = useForm<ISignUpSchema>({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        }
    });
    const onSubmit: SubmitHandler<ISignUpSchema> = (data) => {
        console.log(data);
    }
    return (
        <Card className="w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="deep-orange"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        {...register("username", {required: true, maxLength: 20})}
                        label="UserName"
                    />
                    {errors.username && <p className="text-red-900">This field is required</p>}

                    <div className="relative flex w-full">
                        <Input
                            label="Password"
                            {...register("password", {required: true, maxLength: 10})}
                            type={showPassword ? "text" : "password"}
                        />
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            label="Show"
                        />
                    </div>
                    {errors.password && <p className="text-red-900">This field is required</p>}

                    <Input
                        label="Confirm Password"
                        {...register("confirmPassword", {required: true, maxLength: 10})}
                        type="password"
                    />
                    {errors.confirmPassword && <p className="text-red-900">This field is required</p>}

                    <Input
                        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                        label="Email"
                    />
                    {/*{errors.email && <p className="text-red-900">This field is required</p>}*/}
                    {errors.email?.type === "required" && <p className="text-red-900">This field is required</p>}
                    {errors.email?.type === "pattern" && <p className="text-red-900">Invalid email address</p>}

                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me"/>
                    </div>

                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        variant="gradient"
                        color="deep-orange"
                        fullWidth
                        type="submit" // Trigger the onSubmit function
                    >
                        Sign Up
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Already have an account?
                        <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                            onClick={() => {
                            }}
                        >
                            Sign In
                        </Typography>
                    </Typography>
                </CardFooter>
            </form>
        </Card>
    );
}

export default SignUpForm;