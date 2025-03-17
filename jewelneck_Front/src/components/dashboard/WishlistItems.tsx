
import React from 'react';
import { Wishlist } from '@/types/dashboard';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface WishlistItemsProps {
  wishlistItems: Wishlist[];
  onRemoveItem: (wishlistId: number) => void;
  onMoveToCart: (wishlistItem: Wishlist) => void;
}

const WishlistItems: React.FC<WishlistItemsProps> = ({ 
  wishlistItems, 
  onRemoveItem,
  onMoveToCart
}) => {
  if (wishlistItems.length === 0) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex justify-center">
            <Heart className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-medium">Your wishlist is empty</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Items you save to your wishlist will appear here. Browse our collections to find something you love.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">Your Wishlist ({wishlistItems.length} items)</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card key={item.wishlist_id} className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src={item.product.prod_img} 
                alt={item.product.prod_name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{item.product.prod_name}</CardTitle>
              <CardDescription>
                ${item.product.cost.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.product.prod_description}
              </p>
              {item.created && (
                <p className="text-xs text-muted-foreground mt-2">
                  Added {formatDistance(new Date(item.created), new Date(), { addSuffix: true })}
                </p>
              )}
            </CardContent>
            <CardFooter className="p-4 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onRemoveItem(item.wishlist_id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-gold hover:bg-gold/90"
                onClick={() => onMoveToCart(item)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistItems;
