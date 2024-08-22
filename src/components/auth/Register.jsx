import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Divider,
  Button,
  Tooltip,
} from "@nextui-org/react";
import HomeIcon from "../../assets/icons/HomeIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../schema";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../store/actions/authAction";

const Register = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      role: "employee",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const dataRegister = async (data) => {
    try {
      dispatch(authRegister(data));
      console.log(data);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
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
        onSubmit={form.handleSubmit(dataRegister)}
        className="flex items-center justify-center h-screen"
      >
        <Card className="w-[400px] h-[500px]" radius="sm">
          <CardHeader className=" relative flex items-center justify-center font-semibold py-5 bg-[#61777F] text-slate-100 text-2xl">
            <div className="absolute top-3 left-2">
              <Link to={"/"}>
                <Tooltip content={"Home"} color="foreground">
                  <Button
                    isIconOnly
                    variant="light"
                    size="lg"
                    className="items-center justify-center"
                  >
                    <HomeIcon />
                  </Button>
                </Tooltip>
              </Link>
            </div>
            <div className="flex items-center justify-center">REGISTER</div>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center justify-center space-y-5 px-5">
            {renderController("name", "Name")}
            {renderController("email", "Email")}
            {renderController("username", "Username")}
            {renderController("password", "Password", "password")}
          </CardBody>
          <div className="flex items-center justify-end py-4 px-3 ">
            <Button variant="solid" color="warning">
              <Link
                to={"/auth/login"}
                className="text-slate-100 font-semibold ml-1"
              >
                Login
              </Link>
            </Button>
            <Button
              type="submit"
              color="primary"
              className="mx-2"
              variant="solid"
            >
              Register
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
};

export default Register;
