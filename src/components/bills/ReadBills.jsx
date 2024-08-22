import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import DetailBill from "./DetailBill";
import CreateBill from "./CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { getBill } from "../../store/actions/billAction";
import Header from "../navbar/Header";

const ReadBills = () => {
  const bills = useSelector((state) => state.bill.bill);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBill());
  }, [dispatch]);

  return (
    <>
      <Header />

      <div className="flex justify-center items-center h-screen">
        <Table aria-label="Bills" className="w-3/5 h-4/5">
          <TableHeader className="text-lg font-semibold">
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn className="flex justify-center items-center">
              <div>TRANSAKSI</div>
              <div className="absolute right-5">
                <CreateBill />
              </div>
            </TableColumn>
          </TableHeader>

          <TableBody>
            {bills.map((bill) => {
              return (
                <TableRow key={bill.id}>
                  <TableCell>{bill.customer.id.slice(0, 8)}</TableCell>
                  <TableCell>{bill.customer.name}</TableCell>
                  <TableCell className="flex justify-center">
                    <DetailBill billDetails={bill.billDetails} />
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

export default ReadBills;
