
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Cart } from '@/types/dashboard';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItemsProps {
  cartItems: Cart[];
  onRemoveItem?: (cartId: number) => void;
  onCheckout?: () => void;
}

const CartItems: React.FC<CartItemsProps> = ({ cartItems, onRemoveItem, onCheckout }) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.cost, 0).toFixed(2);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Shopping Cart
          <span className="ml-2 text-sm bg-gold-light/30 text-gold-dark px-2 py-0.5 rounded-full">
            {cartItems.length} items
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Your cart is empty
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Added On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.cart_id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden">
                          <img
                            src={item.product.prod_img}
                            alt={item.product.prod_name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.product.prod_name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item.product.prod_description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>${item.product.cost.toFixed(2)}</TableCell>
                    <TableCell>{formatDate(item.created)}</TableCell>
                    <TableCell className="text-right">
                      {onRemoveItem && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.cart_id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-medium">${calculateTotal()}</p>
              </div>
              <Button 
                className="bg-gradient-to-r from-gold-dark to-gold hover:opacity-90"
                onClick={onCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CartItems;
