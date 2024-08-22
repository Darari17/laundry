import {
  useDisclosure,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import AddIcon from "../../assets/icons/AddIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomer, postCustomer } from "../../store/actions/customerAction";

const CreateCustomer = () => {
  const customers = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
  });

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  const submitButton = async (data) => {
    await dispatch(postCustomer(data));
    onOpenChange(false);
    form.reset();
  };

  return (
    <>
      <Tooltip content={"Create Customer"}>
        <Button
          onPress={onOpen}
          color="default"
          variant="light"
          className="font-semibold text-lg"
          isIconOnly
        >
          <AddIcon />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        radius="md"
      >
        <ModalContent>
          <form onSubmit={form.handleSubmit(submitButton)}>
            <ModalHeader>Create Customer</ModalHeader>
            <ModalBody>
              <Controller
                name={"name"}
                control={form.control}
                render={({ field }) => (
                  <Input {...field} label="Name" type="text" size="sm" />
                )}
              />
              <Controller
                name={"phoneNumber"}
                control={form.control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      label="Phone Number"
                      type="text"
                      size="sm"
                    />
                  );
                }}
              />
              <Controller
                name={"address"}
                control={form.control}
                render={({ field }) => (
                  <Input {...field} label="Address" type="text" size="sm" />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                className="flex items-center justify-end"
                color="primary"
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCustomer;
