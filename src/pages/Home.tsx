import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import supabase from "../supabase";
import { Tables } from "../types/supabase";

export default function Home() {
  const [products, setProducts] = useState<Tables<"Cupcake">[] | null>([]);

  async function getProducts() {
    try {
      const { data } = await supabase
        .from("Cupcake")
        .select();
      setProducts(data);
    } catch {
      setProducts([]);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const columns = useMemo(() => {
    const count = products?.length || 0;
    return {
      base: Math.min(2, count),
      md: Math.min(3, count),
      lg: Math.min(4, count),
      xl: Math.min(5, count),
    };
  }, [products]);

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <SimpleGrid
        columns={columns}
        columnGap={{ base: "4", md: "6" }}
        rowGap={{ base: "8", md: "10" }}
      >
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
