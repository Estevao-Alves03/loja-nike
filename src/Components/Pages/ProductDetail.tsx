import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";


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
      axios
        .get(`http://localhost:3001/products/${id}`)
        .then((response) => {
          const productData = response.data;
          console.log("Dados do produto:", productData); // 🛠 Debugando
    
          // Ajustando os nomes corretamente
          const adjustedProduct = {
            id: productData.cod_product,  // Correção do nome da chave
            name: productData.name_product,  // Correção do nome da chave
            description: productData.description,
            price: productData.price,
          };
    
          if (!adjustedProduct.name) {
            console.warn("Produto sem nome, usando imagem padrão.");
            setProduct({ ...adjustedProduct, image: "/img/default.jpg" });
            return;
          }
    
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
            console.log("Nome sanitizado:", sanitizedName);
            const possibleExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    
            for (const ext of possibleExtensions) {
              const testPath = `/img/${sanitizedName}${ext}`;
              console.log(`Testando imagem no caminho: ${testPath}`);
              const response = await fetch(testPath);
              if (response.ok) {
                return testPath;
              }
            }
            console.warn("Nenhuma imagem encontrada. Usando a imagem padrão.");
            return "/img/default.jpg";
          };
    
          findImage().then((resolvedImage) => {
            setProduct({
              ...adjustedProduct,
              image: resolvedImage,
            });
          });
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
