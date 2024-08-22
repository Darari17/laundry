import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/icons/HomeIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../store/actions/authAction";

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const loginButton = (data) => {
    dispatch(authLogin(data));
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/products");
  };

  const renderController = (name, label, type = "text") => {
    return (
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label={label}
            type={type}
            size="sm"
            isInvalid={Boolean(fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    );
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(loginButton)}
        className="flex items-center justify-center h-screen"
      >
        <Card className="w-[400px] h-[350px]" radius="sm">
          <CardHeader className=" relativeflex items-center justify-center font-semibold py-4 bg-[#61777F] text-slate-100 text-2xl">
            <div className="absolute top-3.5 left-3">
              <Link to={"/"}>
                <Tooltip content={"Home"} color="foreground">
                  <Button isIconOnly variant="light">
                    <HomeIcon />
                  </Button>
                </Tooltip>
              </Link>
            </div>
            <div className="flex items-center justify-center">LOGIN</div>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center gap-6 px-7 ">
            {renderController("username", "Username")}
            {renderController("password", "Password", "password")}
          </CardBody>
          <div className="flex items-center justify-between pb-4 px-5">
            <p className="px-2 ">
              Belum punya akun?
              <Link
                to={"/auth/register"}
                className="ml-1 font-semibold text-primary"
              >
                Register
              </Link>
            </p>
            <Button
              type="submit"
              color="primary"
              className="mx-2"
              variant="solid"
            >
              Login
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
};

export default Login;
