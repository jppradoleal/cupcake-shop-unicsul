import {
  Box,
  Flex,
  HStack,
  Heading,
  Link as ChakraLink,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { CartItem } from "../components/Cart/CartItem";
import { CartOrderSummary } from "../components/Cart/CartOrderSummary";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { CartActionKind } from "../reducers/cart.reducer";
import { Tables } from "../types/supabase";
import supabase from "../supabase";
import { useState } from "react";

export default function Cart() {
  const navigate = useNavigate();
  const {
    state: { products },
    dispatch,
  } = useCart();
  const [address, setAddress] = useState("");

  function handleDelete(product: Tables<"Cupcake">) {
    dispatch({ type: CartActionKind.REMOVE, payload: product });
  }

  async function handleCheckout() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      navigate("/login");
    }

    try {
      const { data: orderData } = await supabase
        .from("Order")
        .insert({
          address,
          owner: data.session!.user.id,
          status: "PROCESSING",
        })
        .select();

      if (!orderData) {
        throw new Error();
      }

      for (const product of products) {
        await supabase.from("Order-Item").insert({
          amount: 1,
          item: product.id,
          order: orderData[0].id,
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao processar o pedido");
    }
  }

  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        spacing={{ base: "8", md: "16" }}
      >
        <Stack spacing={{ base: "8", md: "10" }} flex="2">
          <Heading fontSize="2xl" fontWeight="extrabold">
            Carrinho ({products.length} itens)
          </Heading>

          <Stack spacing="6">
            {products.length ? (
              products.map((item, idx) => (
                <CartItem
                  key={`${item.id}-${idx}`}
                  {...item}
                  onClickDelete={() => handleDelete(item)}
                />
              ))
            ) : (
              <p>Nenhum produto no carrinho</p>
            )}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary
            disabled={products.length <= 0}
            address={address}
            setAddress={setAddress}
            handleCheckout={handleCheckout}
            total={products.reduce((total, item) => total + item.price, 0)}
          />
          <HStack mt="6" fontWeight="semibold">
            <p>ou</p>
            <ChakraLink
              as={ReactRouterLink}
              to="/"
              color={mode("blue.500", "blue.200")}
            >
              Voltar as compras
            </ChakraLink>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
}
