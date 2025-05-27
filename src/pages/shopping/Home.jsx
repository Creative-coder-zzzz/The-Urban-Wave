import { React, useState, useEffect } from "react";
import bannerOne from "../../assets/images/bannerOne.jpg";
import bannerTwo from "../../assets/images/bannerTwo.jpg";
import bannerThree from "../../assets/images/bannerThree.jpg";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  Slack,
  UmbrellaIcon,
  Watch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "./product-tile";
import { SiNike, SiAdidas, SiPuma, SiZara } from "react-icons/si";
import { PiPantsFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetails from "./product-details";

function ShoppingHome() {
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

 

  const navigate = useNavigate();
  const { toast } = useToast();
  const categoriesWithIcons = [
    { id: "Men", label: "Men", icon: ShirtIcon },
    { id: "Women", label: "Women", icon: CloudLightning },
    { id: "Kids", label: "Kids", icon: BabyIcon },
    { id: "Accessories", label: "Accessories", icon: Watch },
    { id: "Footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandWithIcons = [
    { id: "Nike", label: "Nike", icon: SiNike },
    { id: "Adidas", label: "Adidas", icon: SiAdidas },
    { id: "Puma", label: "Puma", icon: SiPuma },
    { id: "Levi's", label: "Levi's", icon: ShirtIcon },
    { id: "Zara", label: "Zara", icon: SiZara },
    { id: "H&M", label: "H&M", icon: Slack },
  ];

  function handleNavigateToListPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/list");
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    console.log(getCurrentProductId, "cart clicked");
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
      }
      toast({
        title: "Product is added to cart",
      });
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(productList?.data, "product home");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-[100vw] h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute left-0 top-0 w-full h-full object-cover duration-1000 `}
          />
        ))}

        {/* Left Button */}
        <Button
          variant="outline"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-10"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>

        {/* Right Button */}
        <Button
          variant="outline"
          className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white/80 z-10"
          onClick={() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          }}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className=" container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            {" "}
            Shop by category
          </h2>

          <div className="grid cols-2 md: grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((categoryItem, index) => (
              <Card
                onClick={() =>
                  handleNavigateToListPage(categoryItem, "category")
                }
                className=" cursor-pointer hover:shadow-lg transition-shadow"
                key={index}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className=" container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            {" "}
            Shop by Brand
          </h2>

          <div className="grid cols-2 md: grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcons.map((brandItem, index) => (
              <Card
                onClick={() => handleNavigateToListPage(brandItem, "brand")}
                className=" cursor-pointer hover:shadow-lg transition-shadow"
                key={index}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className=" container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 "> Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mg:grid-cols-4 gap-6">
            {productList && productList?.data?.length > 0
              ? productList?.data?.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  ></ShoppingProductTile>
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddtoCart}
      />
    </div>
  );
}

export default ShoppingHome;
