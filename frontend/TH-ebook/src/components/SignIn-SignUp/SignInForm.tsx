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
import {useEffect, useState} from "react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../features/user/userSlice.ts";
import {useNavigate} from "react-router-dom";
import {StateType} from "../../store/rootReducer.ts";
import { useLocalStorage } from "@uidotdev/usehooks";

const ISignInSchema = yup.object().shape({
        nameoremail: yup.string().required(),
        password: yup.string().required(),
    }
)
const SignInForm = () => {

    const user = useSelector((state: StateType) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({ resolver: yupResolver(ISignInSchema) });
    const onSubmit = (data: { nameoremail: string, password: string }) => {
        dispatch(signIn(data));
    }

    const [userLocalStorage, saveUserIDLocalStorage] = useLocalStorage("userid", null);
    const [userAvatarLocalStorage, saveUserAvatarLocalStorage] = useLocalStorage("useravatar", null);
    useEffect(() => {
        if (user.isLogin) {
            saveUserIDLocalStorage(user.data?.id);
            saveUserAvatarLocalStorage(user.data?.avatar);
            navigate('/');
        }
    }, [user.isLogin, navigate, saveUserIDLocalStorage, saveUserIDLocalStorage]);
    return (
        <Card className="w-96"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="deep-orange"
                    className="mb-4 grid h-28 place-items-center"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}                >
                    <Typography variant="h3" color="white"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        Sign In
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
                        {...register("nameoremail", {required: true, maxLength: 20})}
                        label="UserName"                    />
                    {errors.nameoremail && <p className="text-red-900">This field is required</p>}

                    <div className="relative flex w-full">
                        <Input
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}
                            label="Password"
                            {...register("password", {required: true, maxLength: 10})}
                            type={showPassword ? "text" : "password"}                        />
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            label="Show"
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}                        />
                    </div>
                    {errors.password && <p className="text-red-900">This field is required</p>}

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
                        onPointerLeaveCapture={undefined}                    >
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}>
                        Don&apos;t have an account?
                        <Typography
                            as="a"
                            href="/auth/signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                            onClick={() => {
                                // navigate("/auth/signup");
                            }}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}                        >
                            Sign Up
                        </Typography>
                    </Typography>
                </CardFooter>
            </form>
        </Card>
    );
}

export default SignInForm;