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
    
          const adjustedProduct = {
            id: productData.codProduct,
            name: productData.nameProduct,
            description: productData.description,
            price: productData.price,
          };
    
          // const sanitizeName = (name: string) =>
          //   name.toLowerCase().replace(/ /g, "").replace(/[^\w]/g, "") 

          const sanitizeName = (name: string) =>
            name
              .toLowerCase()
              .normalize("NFD") // Remove acentos
              .replace(/[\u0300-\u036f]/g, "") // Remove marcas de acento
              .replace(/ /g, "") // Remove espaços
              .replace(/ç/g, "c") // Substitui 'ç' por 'c'
              .replace(/[^\w]/g, ""); // Remove caracteres especiais
          
    
          const findImage = async () => {
            const sanitizedName = sanitizeName(adjustedProduct.name);
            console.log("Nome sanitizado:", sanitizedName);
            const possibleExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    
            for (const ext of possibleExtensions) {
              const testPath = `/img/${sanitizedName}${ext}`;
              console.log(`Testando imagem no caminho: ${testPath}`); // Loga o caminho gerado
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
2    
      

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
