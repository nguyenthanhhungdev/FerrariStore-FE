import { useForm } from "react-hook-form";
import {Input, Typography} from "@material-tailwind/react";


const Test = () => {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        }
    });

    // console.log(watch("example")); // you can watch individual input by pass the name of the input

    return (
        <form
            onSubmit={handleSubmit((data) => {
                alert(JSON.stringify(data));
            })}
        >
            <Typography variant="h4" color="white">
                UserName
            </Typography>

            {errors.username && <p>This field is required</p>}

            <Typography variant="h4" color="white">
                Password
            </Typography>
            <Input
                {...register("password", { required: true, maxLength: 10 })}
            />
            {errors.password && <p>This field is required</p>}

            <Typography variant="h4" color="white">
                Confirm Password
            </Typography>
            <Input
                {...register("confirmPassword", { required: true, maxLength: 10 })}
            />
            {errors.confirmPassword && <p>This field is required</p>}

            <Typography variant="h4" color="white">
                Email
            </Typography>
            <Input
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>This field is required</p>}
            <input type="submit" />
        </form>
    );
}

export default Test;