import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import React from "react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            onClick={() => handleGetProductDetails(product?._id)}
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">
            {product?.title}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {categoryOptionsMap[product?.category.toLowerCase()]}
              </span>
              <span className="text-sm text-muted-foreground">
                {
                  brandOptionsMap[
                    product?.brand.toLowerCase().replace(/['\s]/g, "")
                  ]
                }
              </span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-bold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold text-primary">
                  ${product?.salePrice}
                </span>
              ) : null}
            </div>
          </h2>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => handleAddtoCart(product?._id)}
            className="w-full"
          >
            Add to cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
