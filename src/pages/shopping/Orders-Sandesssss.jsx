import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import ShoppingOrderDetails from "./OrderDetails";
import { Dialog } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "@/store/shop/order-slice";

function ShoppingOrders() {
  const { user } = useSelector((state) => state.auth);
  const [openDetailsialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const userId = user?.id;
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    dispatch(fetchAllOrders({ userId })).then((action) => {
      if (action.payload) {
        setOrders(action?.payload?.orders);
      } else {
        console.error("failed to fetch orders", action.error);
      }
    });
  }, [dispatch]);

 

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders && orders.length > 0
            ? orders.map((items, index) => {
                const orderDate = new Date(items?.orderDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                );

                return (
                  <TableRow key={index}>
                    <TableCell>{items?._id}</TableCell>
                    <TableCell>{orderDate}</TableCell>
                    <TableCell>{items.orderStatus}</TableCell>
                    <TableCell>₹{items.totalAmount}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleViewDetails(items)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>

      {selectedOrder && (
        <Dialog open={openDetailsialog} onOpenChange={setOpenDetailsDialog}>
          <ShoppingOrderDetails order={selectedOrder} />
        </Dialog>
      )}
    </Card>
  );
}

export default ShoppingOrders;
