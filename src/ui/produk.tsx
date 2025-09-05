import { Link } from "react-router"; 
import { useEffect, useState } from "react";

type TypeProduct = {
  id: string,
  name: string,
  image: string,
  description: string,
  rating: number,
  price: number,
  stok: number,
  category: string
}

export const Produk = () => {
  const [Produk, setProduk] = useState<TypeProduct[]>([]);
  
  const FunctionProduct = async () => {
    try {
      const Product = (await fetch('http://localhost:2000/product').then(r => r.json())) as TypeProduct[];
      setProduk(Product);
    } catch(err) {
      alert(err)
    }
  }

  useEffect(() => {
    FunctionProduct();
  }, []);
  
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-3.5"> 
        {Produk.map(product => {
          return (
            <>
              <div
              key={product.id}
              className="flex text-center items-center justify-center w-48 bg-gray-900 p-2"
              id={product.id}>
                <Link to={`/product/detailproduk/${product.id}`}>
                  <h1><b>
                    Name : </b>{product.name}</h1>
                  <p><b>Price : </b>{product.price}</p>
                  <p><b>Rate : </b>{product.rating}</p>
                </Link>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}