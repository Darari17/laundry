import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import myImage from "../../assets/icons/logo.png";
import { logout } from "../../store/actions/authAction";
import { toast } from "sonner";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("data"));

  const handleLogout = () => {
    try {
      dispatch(logout());
      confirm("Are You Sure?");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Navbar
        maxWidth="full"
        isBlurred={false}
        className="bg-[#61777F] text-slate-100 "
      >
        <NavbarContent justify="start">
          <NavbarItem className="font-semibold mx-5">
            <Link className="text-slate-100" to={"/"}>
              <Image src={myImage} className="w-[170px]" />
            </Link>
          </NavbarItem>
        </NavbarContent>

        {user ? (
          <>
            <NavbarContent justify="center">
              <NavbarItem className="font-semibold mx-5">
                <Link className="text-slate-100" to={"/products"}>
                  Products
                </Link>
              </NavbarItem>
              <NavbarItem className="font-semibold mx-5">
                <Link className="text-slate-100" to={"/customers"}>
                  Customers
                </Link>
              </NavbarItem>
              <NavbarItem className="font-semibold mx-5">
                <Link className="text-slate-100" to={"/bills"}>
                  Bills
                </Link>
              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    size="lg"
                    className="font-semibold text-slate-100"
                    radius="full"
                  >
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown Menu">
                  <DropdownItem
                    key={"logout"}
                    className="text-danger"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="font-semibold mr-5">
              <Link className="text-slate-100" to={"/auth/register"}>
                <Button
                  className="font-semibold font-sans text-slate-100 "
                  color="warning"
                  size="lg"
                >
                  GET STARTED
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
    </div>
  );
};

export default Header;
