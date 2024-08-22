import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useEffect } from "react";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";
import Header from "../navbar/Header";
import { useDispatch, useSelector } from "react-redux";
import { delProduct, getProduct } from "../../store/actions/productAction";

//todo handling error
//todo toast
//todo loading

const ReadProducts = () => {
  const products = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  const deleteProduct = async (id) => {
    try {
      await dispatch(delProduct(id));
      dispatch(getProduct());
    } catch (error) {
      console.log("Error Deleting Product:", error);
    }
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <Table aria-label="Product List" className="w-3/5 h-4/5">
          <TableHeader className="text-lg font-semibold">
            <TableColumn>NAME</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>
              <div className="flex justify-end">
                <CreateProduct />
              </div>
            </TableColumn>
          </TableHeader>

          <TableBody>
            {products.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>Kg</TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <UpdateProduct
                      id={product.id}
                      name={product.name}
                      price={product.price}
                    />
                    <Button
                      onClick={() => deleteProduct(product.id)}
                      variant="light"
                      isIconOnly={true}
                      size="sm"
                      radius="sm"
                      aria-label={`Delete ${product.name}`}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ReadProducts;
