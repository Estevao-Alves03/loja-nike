import { Button } from "@/components/ui/button";

interface ProductCardProps{
    name: string;
    price: string;
    image: string;
}

function ProductCard({name, price, image}: ProductCardProps) {
    return(
        <div className="flex items-center justify-center h-screen">
            <div className="w-80 h-96 border-4 rounded-lg">
                <img src={image}/>
            </div>
            <div className="mb-80">
            <h1 className=" font-bold pl-2 text-3xl">{name}</h1>
            <p className=" pl-2 font-extralight text-ms">R$: {price}</p>
            <Button>Comprar</Button>
            </div>
        </div>
    )
}



export default ProductCard