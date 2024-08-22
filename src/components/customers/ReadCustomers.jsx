import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect } from "react";
import Header from "../navbar/Header";
import CreateCustomer from "../customers/CreateCustomer";
import UpdateCustomer from "../customers/UpdateCustomer";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import { delCustomer, getCustomer } from "../../store/actions/customerAction";

const ReadCustomers = () => {
  const customers = useSelector((state) => state.customer.customer);
  const dispatch = useDispatch();

  const deleteCustomer = async (id) => {
    try {
      await dispatch(delCustomer(id));
      dispatch(getCustomer());
    } catch (error) {
      console.log("Error Deleting Customer", error);
    }
  };

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <Table aria-label="Customer List" className="w-3/5 h-4/5">
          <TableHeader className="text-lg font-semibold">
            <TableColumn>NAME</TableColumn>
            <TableColumn>PHONE NUMBER</TableColumn>
            <TableColumn>ADDRESS</TableColumn>
            <TableColumn>
              <div className="flex justify-end">
                <CreateCustomer />
              </div>
            </TableColumn>
          </TableHeader>

          <TableBody>
            {customers.map((customer) => {
              return (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <UpdateCustomer
                      id={customer.id}
                      name={customer.name}
                      phoneNumber={customer.phoneNumber}
                      address={customer.address}
                    />
                    <Button
                      onClick={() => deleteCustomer(customer.id)}
                      variant="light"
                      isIconOnly={true}
                      size="sm"
                      radius="sm"
                      aria-label={`Delete ${customer.name}`}
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

export default ReadCustomers;
