
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/dashboard/ProfileCard';
import CartItems from '@/components/dashboard/CartItems';
import OrderHistory from '@/components/dashboard/OrderHistory';
import WishlistItems from '@/components/dashboard/WishlistItems';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { mockCustomer } from '@/data/mockCustomerData';
import { toast } from '@/components/ui/use-toast';
import { User, ShoppingCart, PackageCheck, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wishlist } from '@/types/dashboard';

const Dashboard = () => {
  const [customer, setCustomer] = useState(mockCustomer);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem('user');
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access your dashboard",
        variant: "destructive",
      });
      navigate('/sign-in');
    } else {
      setIsAuthenticated(true);
      try {
        // Update customer data with user data from localStorage
        const userData = JSON.parse(user);
        setCustomer(prev => ({
          ...prev,
          username: userData.username || prev.username,
          email: userData.email || prev.email
        }));
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, [navigate]);

  // Function to handle removing items from cart
  const handleRemoveCartItem = (cartId: number) => {
    const updatedCart = customer.cart.filter(item => item.cart_id !== cartId);
    setCustomer({ ...customer, cart: updatedCart });
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  // Function to handle removing items from wishlist
  const handleRemoveWishlistItem = (wishlistId: number) => {
    const updatedWishlist = customer.wishlist.filter(item => item.wishlist_id !== wishlistId);
    setCustomer({ ...customer, wishlist: updatedWishlist });
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    });
  };

  // Function to handle moving items from wishlist to cart
  const handleMoveToCart = (wishlistItem: Wishlist) => {
    // Create a new cart item
    const newCartItem = {
      cart_id: customer.cart.length > 0 ? Math.max(...customer.cart.map(item => item.cart_id)) + 1 : 1,
      cust_id: customer.cust_id,
      prod_id: wishlistItem.prod_id,
      created: new Date(),
      customers: customer,
      product: wishlistItem.product
    };
    
    // Remove from wishlist and add to cart
    const updatedWishlist = customer.wishlist.filter(item => item.wishlist_id !== wishlistItem.wishlist_id);
    
    setCustomer({
      ...customer,
      cart: [...customer.cart, newCartItem],
      wishlist: updatedWishlist
    });
    
    toast({
      title: "Added to cart",
      description: `${wishlistItem.product.prod_name} has been moved to your cart.`,
    });
  };

  // Function to handle checkout
  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  // Function to process the payment
  const handlePayment = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      // Create new orders from cart items
      const newOrders = customer.cart.map((cartItem, index) => ({
        order_id: customer.orders.length + index + 1,
        cust_id: customer.cust_id,
        prod_id: cartItem.prod_id,
        created: new Date(),
        customers: customer,
        product: cartItem.product
      }));
      
      // Update customer with new orders and empty cart
      setCustomer(prev => ({
        ...prev,
        orders: [...prev.orders, ...newOrders],
        cart: []
      }));
      
      // Close checkout dialog and reset processing state
      setProcessingPayment(false);
      setCheckoutOpen(false);
      
      // Show success message
      toast({
        title: "Payment successful!",
        description: `You've purchased ${newOrders.length} item${newOrders.length !== 1 ? 's' : ''}.`,
      });
      
      // Navigate to orders tab
      setActiveTab("orders");
    }, 1500); // Simulate a 1.5s payment processing time
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-28 pb-16 px-4 md:px-6">
        <DashboardHeader customer={customer} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {customer.cart.length > 0 && (
                <span className="ml-1 bg-gold-light/30 text-gold-dark text-xs px-2 py-0.5 rounded-full">
                  {customer.cart.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
              {customer.wishlist.length > 0 && (
                <span className="ml-1 bg-gold-light/30 text-gold-dark text-xs px-2 py-0.5 rounded-full">
                  {customer.wishlist.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4" />
              <span>Orders</span>
              {customer.orders.length > 0 && (
                <span className="ml-1 bg-gold-light/30 text-gold-dark text-xs px-2 py-0.5 rounded-full">
                  {customer.orders.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard customer={customer} />
              <div className="space-y-6">
                <div className="bg-gold-light/10 p-6 rounded-lg border border-gold/20">
                  <h3 className="font-display text-lg mb-3">Account Summary</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-soft">
                      <p className="text-sm text-muted-foreground">Items in Cart</p>
                      <p className="text-2xl font-medium">{customer.cart.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-soft">
                      <p className="text-sm text-muted-foreground">Wishlist</p>
                      <p className="text-2xl font-medium">{customer.wishlist.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-soft">
                      <p className="text-sm text-muted-foreground">Orders Placed</p>
                      <p className="text-2xl font-medium">{customer.orders.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cart" className="focus-visible:outline-none focus-visible:ring-0">
            <CartItems 
              cartItems={customer.cart} 
              onRemoveItem={handleRemoveCartItem} 
              onCheckout={handleCheckout}
            />
          </TabsContent>
          
          <TabsContent value="wishlist" className="focus-visible:outline-none focus-visible:ring-0">
            <WishlistItems 
              wishlistItems={customer.wishlist}
              onRemoveItem={handleRemoveWishlistItem}
              onMoveToCart={handleMoveToCart}
            />
          </TabsContent>
          
          <TabsContent value="orders" className="focus-visible:outline-none focus-visible:ring-0">
            <OrderHistory orders={customer.orders} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Enter your payment details to complete the order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input 
                id="card-number" 
                placeholder="4242 4242 4242 4242" 
                value="4242 4242 4242 4242"
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input 
                  id="expiry" 
                  placeholder="MM/YY" 
                  value="12/25"
                  readOnly
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input 
                  id="cvc" 
                  placeholder="123" 
                  value="123"
                  readOnly
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This is a demo checkout. No real payment will be processed.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCheckoutOpen(false)}
              disabled={processingPayment}
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-gold-dark to-gold hover:opacity-90"
              onClick={handlePayment}
              disabled={processingPayment}
            >
              {processingPayment ? "Processing..." : `Pay $${customer.cart.reduce((total, item) => total + item.product.cost, 0).toFixed(2)}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
