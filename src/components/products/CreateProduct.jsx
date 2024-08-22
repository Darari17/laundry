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
import { Controller, useForm } from "react-hook-form";
import AddIcon from "../../assets/icons/AddIcon";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, postProduct } from "../../store/actions/productAction";
import { useEffect } from "react";

//todo handling error
//todo taost
//todo loading

const CreateProduct = () => {
  const products = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
    },
  });

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const submitButton = async (data) => {
    await dispatch(postProduct(data));
    onOpenChange(false);
    form.reset();
  };

  return (
    <>
      <Tooltip content={"Create Product"}>
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
            <ModalHeader>Create Product</ModalHeader>
            <ModalBody>
              <Controller
                name={"name"}
                control={form.control}
                render={({ field }) => {
                  return (
                    <Input {...field} label="Name" type="text" size="sm" />
                  );
                }}
              />
              <div className="flex justify-around">
                <Controller
                  name={"price"}
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        label="Price"
                        type="number"
                        size="sm"
                        onChange={(e) => {
                          const valueAsNumber = parseInt(e.target.value, 10);
                          field.onChange(
                            isNaN(valueAsNumber) ? "" : valueAsNumber
                          );
                        }}
                      />
                    );
                  }}
                />
                <p className=" items-center justify-center flex px-2 font-semibold text-xl">
                  /Kg
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                className="flex items-center justify-end"
                color="primary"
                onPress={() => onOpenChange(false)}
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

export default CreateProduct;
