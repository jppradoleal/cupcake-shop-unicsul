import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { Rating } from "./Rating";
import { Tables } from "../../types/supabase";
import useCart from "../../hooks/useCart";
import { CartActionKind } from "../../reducers/cart.reducer";

interface Props {
  product: Tables<"Cupcake">;
  rootProps?: StackProps;
}

export const ProductCard = (props: Props) => {
  const toast = useToast();
  const { dispatch } = useCart();
  const { product, rootProps } = props;
  const { name, image, price } = product;

  function handleAddToCart() {
    toast({
      title: `${name} adicionado ao carrinho.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    dispatch({ type: CartActionKind.ADD, payload: product });
  }

  return (
    <Stack spacing={{ base: "4", md: "5" }} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image ?? "https://picsum.photos/200/300"}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: "md", md: "xl" }}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}
          >
            {name}
          </Text>
          <PriceTag price={price} />
        </Stack>
        <HStack>
          <Rating defaultValue={5} size="sm" />
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            12 avaliações
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button
          onClick={handleAddToCart}
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          width="full"
          _hover={{
            bg: "pink.300",
          }}
        >
          Adicionar ao carrinho
        </Button>
      </Stack>
    </Stack>
  );
};
