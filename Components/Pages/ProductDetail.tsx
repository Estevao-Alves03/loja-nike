import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

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
        fetch(`http://localhost:3000/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("nao foi localizado nenhum produto");
                }
                return response.json();
            })
            .then((data) =>{
                console.log(data)
                setProduct(data)
            })
            .catch((error) => console.error("Erro ao buscar produto:", error));
    }, [id]);

    if (!product) {
        return <div>DEU PAU NOJENTO</div>;
    }

    return (
        <ProductCard
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            key={product.id}
            id={product.id}
        />
    );
}

export default ProductDetail;
