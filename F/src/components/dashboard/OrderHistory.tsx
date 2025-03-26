
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Order } from '@/types/dashboard';
import { PackageCheck } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display flex items-center gap-2">
          <PackageCheck className="h-5 w-5" />
          Order History
          <span className="ml-2 text-sm bg-gold-light/30 text-gold-dark px-2 py-0.5 rounded-full">
            {orders.length} orders
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            You haven't placed any orders yet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>#{order.order_id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={order.product.prod_img}
                          alt={order.product.prod_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{order.product.prod_name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {order.product.prod_description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${order.product.cost.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(order.created)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
