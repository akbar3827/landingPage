import { Link, useParams } from "react-router";
import { useState, useMemo, useEffect } from "react";

export const DetailProduct = () => {
  type TypeProduct = {
    id: string;
    name: string;
    image: string;
    description: string;
    rating: number;
    price: number;
    stok: number;
    category: string;
  };

  const [produk, setProduk] = useState<TypeProduct[]>([]);

  const FunctionProduct = async () => {
    try {
      const Product = (await fetch("http://localhost:2000/product", {
        method: "GET",
      }).then((r) => r.json())) as TypeProduct[];
      setProduk(Product);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    FunctionProduct();
  });

  const { id } = useParams<{ id: string }>();

  const prodak = useMemo(
    () => produk.find((item) => item.id === id),
    [id, produk]
  );

  if (!produk) {
    return <p>Product not found</p>;
  }

  return (
    <>
      <div className="max-w-78 text-center">
        <p>
            {prodak ? 
              (
                <>
                <Link to={`/product/detailproduk/${prodak.id}`} >
              <p>{prodak.description}</p>
                <p>{prodak.category}</p>
                </Link>
                </>
                )  :  <p>Not found</p>
            }
        </p>
      </div>
    </>
  );
};
