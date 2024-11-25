import SubmitButton from "../Form/SubmitButton";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

function ProductCard({name, price, description, image }: ProductCardProps) {

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);


  return (
    <div className="flex items-center justify-center h-screen">

      <div
        className="w-80 h-96 border-8 border-black rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div>
        <h1 className="font-bold pl-4 text-3xl">{name}</h1>
        <p className="pl-4 font-extralight text-ms">R$: {price}</p>
        <p className="pl-4 mb-1">{description}</p>

        <section className="mb-32">
          <h3 className="pl-4 font-bold mt-3">Tamanhos:</h3>
          <div className="pl-4 flex">
            {["P", "M", "G"].map((size) => (
              <div key={size}>
                <label htmlFor={size} className="p-2">
                  {size}
                </label>
                <input
                  value={size}
                  id={size}
                  name="size"
                  type="radio"
                  onChange={() => setSelectedSize(size)}
                />
              </div>
            ))}
          </div>
          <h3 className="pl-4 font-bold mt-2">Quantidade:</h3>
          <div>
            <input
              type="number"
              id="quantidade"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="ml-4 mt-1 py-1 px-1 border-2 border-gray-700 rounded-md"
            />
          </div>
        </section>
        <SubmitButton selectedSize={selectedSize} quantity={quantity}/>
      </div>
    </div>
  );
}

export default ProductCard;
