import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "@/services/Api";// <-- IMPORTANTE

interface Product {
  name: string;
  id: string;
  price: string;
  image: string;
  description: string;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        const productData = response.data;

        const adjustedProduct = {
          id: productData.cod_product,
          name: productData.name_product,
          description: productData.description,
          price: productData.price,
        };

        const sanitizeName = (name?: string) => {
          if (!name) return "produto-desconhecido";
          return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ /g, "")
            .replace(/ç/g, "c")
            .replace(/[^\w]/g, "");
        };

        const findImage = async () => {
          const sanitizedName = sanitizeName(adjustedProduct.name);
          const extensions = [".jpg", ".jpeg", ".png", ".webp"];

          for (const ext of extensions) {
            const path = `/img/${sanitizedName}${ext}`;
            const res = await fetch(path);
            if (res.ok) return path;
          }
          return "/img/default.jpg";
        };

        findImage().then((img) =>
          setProduct({ ...adjustedProduct, image: img })
        );
      })
      .catch((error) => console.error("Erro ao buscar produto:", error));
  }, [id]);

  if (!product) {
    return <div>Falhou</div>;
  }

  return (
    <ProductCard
      name={product.name}
      price={product.price}
      image={product.image}
      description={product.description}
      id={product.id}
    />
  );
}

export default ProductDetail;
