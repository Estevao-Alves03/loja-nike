import ProjectCard from "./ProductCard"
import { useState, useEffect} from "react"

interface Product {
    name: string;
    id: string;
    price: string;
    image: string;
}

function Products() {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('http://localhost:3000/product', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProducts(data)
        })
        .catch((err) => console.log(err))
    }, [])

    return(
      <div>
        {products.length > 0 && 
            products.map((product) => (
            <ProjectCard 
            name={product.name}
            price={product.price}
            image={product.image}
            key={product.id}
            /> 
            ))}
      </div>
    )
}

export default Products