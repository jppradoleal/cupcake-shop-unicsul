import {
  CloseButton,
  Flex,
  Link
} from "@chakra-ui/react";
import { PriceTag } from "../ProductCard/PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { Tables } from "../../types/supabase";

type CartItemProps = {
  onClickDelete?: () => void;
} & Tables<"Cupcake">;

export const CartItem = (props: CartItemProps) => {
  const {
    name,
    description,
    image,
    price,
    onClickDelete,
  } = props;

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name} description={description!} image={image!} />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <PriceTag price={price} />
        <CloseButton
          aria-label={`Excluir ${name} do carrinho`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Link fontSize="sm" textDecor="underline">
          Excluir
        </Link>
        <PriceTag price={price} />
      </Flex>
    </Flex>
  );
};
