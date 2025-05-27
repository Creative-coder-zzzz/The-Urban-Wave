import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartQuantity,
} from "@/store/shop/cart-slice";
import { MinusIcon, PlusIcon, Trash, TrashIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserCartContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  function handleCartItemDelete(userId, productId) {
    dispatch(deleteCartItem({ userId, productId })).then((data) => {
      if (data?.payload?.success) {
        // toast({
        //   title: "Cart Item is deleted",
        // });
      }
    });
  }

  function handleUpdateQuantity(cartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart Item is updated",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem.title}
        className="w-20 h-20 object-cover"
      />

      <div className="flex-1 ">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-6 mt-1 ">
          <Button
            variant="outline"
            className=""
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <MinusIcon className="w-4 h-4 " />
            <span className="sr-only">Decrease</span>
          </Button>

          <span className="font-semibold">{cartItem?.quantity}</span>

          <Button
            variant="outline"
            className=""
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <PlusIcon className="w-4 h-4 " />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(cartItem?.salePrice > 0
            ? cartItem?.salePrice * cartItem?.quantity
            : cartItem?.price * cartItem?.quantity
          ).toFixed(2)}
        </p>
        <TrashIcon
          className="cursor mt-1 cursor-pointer"
          size={20}
          onClick={() => handleCartItemDelete(user?.id, cartItem?.productId)}
        />
      </div>
    </div>
  );
}

export default UserCartContent;
