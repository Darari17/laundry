import {
  useDisclosure,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { EditIcon } from "../../assets/icons/EditIcon";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, putProduct } from "../../store/actions/productAction";

//todo handling error
//todo toast
//todo loading

const UpdateProduct = ({ id }) => {
  const products = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const form = useForm({
    defaultValues: {
      id: id,
      name: "",
      price: "",
    },
  });

  const updateDataProduct = async (data) => {
    try {
      await dispatch(putProduct(data));
      dispatch(getProduct());
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        isIconOnly={true}
        size="sm"
        radius="sm"
      >
        <EditIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        radius="md"
      >
        <ModalContent>
          <form onSubmit={form.handleSubmit(updateDataProduct)}>
            <ModalHeader>Update Product</ModalHeader>

            <ModalBody>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      label="Change Product Name"
                      type="text"
                      size="sm"
                    />
                  );
                }}
              />
              <div className="grid-cols-3 grid ">
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        label="Price"
                        type="number"
                        className="col-span-2"
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
                <p className="text-center items-center flex justify-start font-semibold text-lg pl-3">
                  / Kg
                </p>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                className="flex items-center justify-end"
                color="primary"
              >
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProduct;
