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
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../../features/user/userSlice.ts";
import {RootState} from "../../store/store.ts";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useNavigate} from "react-router-dom";

const ISignUpSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required(),
        email: yup.string().email().required(),
    }
)
const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        // watch,
        formState: {errors},
    } = useForm({resolver: yupResolver(ISignUpSchema)});
    const dispatch = useDispatch();

    const onSubmit = (data: {username: string, password: string, confirmPassword: string, email: string}) => {
        dispatch(signUp(data));
        navigate("/");
    }

    const users = useSelector((state: RootState) => state.user);
    console.log("All users:", users);
    return (
        <Card className="w-96"
              placeholder={undefined} onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="deep-orange"
                    className="mb-4 grid h-28 place-items-center"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}>
                    <Typography variant="h3" color="white"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        Sign Up
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4"
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}>
                    <Input
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                        {...register("username", {required: true, maxLength: 20})}
                        label="UserName"/>
                    {errors.username && <p className="text-red-900">{errors.username.message}</p>}

                    <div className="relative flex w-full">
                        <Input
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}
                            label="Password"
                            {...register("password", {required: true, maxLength: 10})}
                            type={showPassword ? "text" : "password"}/>
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            label="Show"
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}/>
                    </div>
                    {errors.password && <p className="text-red-900">{errors.password.message}</p>}

                    <Input
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                        label="Confirm Password"
                        {...register("confirmPassword", {required: true, maxLength: 10})}
                        type="password"/>
                    {errors.confirmPassword && <p className="text-red-900">{errors.confirmPassword.message}</p>}

                    <Input
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        crossOrigin={undefined}
                        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                        label="Email"/>
                    {errors.email && <p className="text-red-900">{errors.email.message}</p>}

                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me"
                                  onPointerEnterCapture={undefined}
                                  onPointerLeaveCapture={undefined}
                                  crossOrigin={undefined}/>
                    </div>

                </CardBody>
                <CardFooter className="pt-0"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                    <Button
                        variant="gradient"
                        color="deep-orange"
                        fullWidth
                        type="submit" // Trigger the onSubmit function
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>
                        Sign Up
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center"
                                placeholder={undefined} onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        Already have an account?
                        <Typography
                            as="a"
                            href="/auth/signin"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                            onClick={() => {
                                // navigate("");
                            }}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                            Sign In
                        </Typography>
                    </Typography>
                </CardFooter>
            </form>
        </Card>
    );
}

export default SignUpForm;