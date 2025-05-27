import { Copy } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer>
      <div className="flex items-center justify-center w-full">
        <div className=" w-full text-white grid grid-cols-2 md:grid-cols-4 lg:grid-col-5 gap-4">
          <div>
            <ul className=" flex flex-col  gap-2">
              <li className="font-bold">CATEGORIES</li>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Footwear</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <ul className=" flex flex-col  gap-2">
              <li className="font-bold">CONTACT US</li>
              <li>urbanwave@gmail.com</li>
              <li>Support: +918927678560</li>
              <li>
                Farrukhnagar, near BR Ambedkar Park, The Urban Wave Merch Store,
                Gurugram, Haryana, 122506
              </li>
            </ul>
          </div>

          <div>
            <ul className=" flex flex-col  gap-2">
              <li className="font-bold">LEGAL</li>
              <li>Terms and conditions</li>
              <li>Privacy policy</li>
              <li>copyright</li>
            </ul>
          </div>

          <div>
            <ul className=" flex flex-col  gap-2">
              <li className="font-bold">POPULAR PAGES</li>
              <li>home</li>
              <li>men</li>
              <li>women</li>
              <li>kids</li>
            </ul>
          </div>

          <div>
            <ul className=" flex flex-col  gap-2">
              <li className="font-bold">CUSTOMER SERVICE</li>
              <li>FAQ</li>
              <li>size guide or fitting chart</li>
              <li>Shipping and delivery policies</li>
              <li>Return, refund, and exchange policies</li>
            </ul>
          </div>

          <div>
            <ul className=" flex flex-col ">
              <li className="font-bold">SOCIAL MEDIA LINKS</li>
              <li>facebook</li>
              <li>Instagram</li>
            </ul>
          </div>

          <div className="">
            <ul className=" flex flex-col  gap-2">
              <li className="font-bold">THE URBAN WAVE</li>
              <li>About us</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="flex items-center justify-center mt-3 ">
        <p className="text-white text-sm">
          Designed and developed by sandesh adhikari &copy; 2025
        </p>
      </div>
    </footer>
  );
}

export default Footer;
