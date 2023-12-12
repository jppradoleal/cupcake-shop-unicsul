import {
  Box,
  Link as ChakraLink,
  Flex,
  HStack,
  Heading,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { CartItem } from "../components/Cart/CartItem";
import {
  CartOrderSummary,
  ShippingData,
} from "../components/Cart/CartOrderSummary";
import useCart from "../hooks/useCart";
import { CartActionKind } from "../reducers/cart.reducer";
import supabase from "../supabase";
import { Tables } from "../types/supabase";

export default function Cart() {
  const navigate = useNavigate();
  const {
    state: { products },
    dispatch,
  } = useCart();
  function handleDelete(product: Tables<"Cupcake">) {
    dispatch({ type: CartActionKind.REMOVE, payload: product });
  }

  function handleChangeQuantity(product: Tables<"Cupcake">, quantity: number) {
    dispatch({
      type: CartActionKind.UPDATE_QUANTITY,
      payload: { ...product, quantity },
    });
  }

  async function handleCheckout(shippingData: ShippingData) {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      navigate("/login");
      return;
    }

    try {
      const { data: orderData } = await supabase
        .from("Order")
        .insert({
          address: shippingData.address,
          phone: shippingData.phone,
          owner_id: data.session.user.id,
          status: "PROCESSING",
        })
        .select();

      if (!orderData) {
        throw new Error();
      }

      for (const product of products) {
        await supabase.from("OrderItem").insert({
          amount: product.quantity ?? 1,
          item_id: product.id,
          order_id: orderData[0].id,
        });
      }

      dispatch({ type: CartActionKind.CLEAR });

      navigate("/orders");
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
              products.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onChangeQuantity={(qty) => handleChangeQuantity(item, qty)}
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
            handleCheckout={handleCheckout}
            total={products.reduce(
              (total, item) => total + item.price * (item.quantity ?? 0),
              0
            )}
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
