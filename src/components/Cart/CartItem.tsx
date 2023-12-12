import {
  Button,
  CloseButton,
  Flex,
  HStack,
  Input,
  Link,
  useNumberInput
} from "@chakra-ui/react";
import { CartItem as CartItemType } from "../../reducers/cart.reducer";
import { PriceTag } from "../ProductCard/PriceTag";
import { CartProductMeta } from "./CartProductMeta";

type CartItemProps = {
  onClickDelete: () => void;
  onChangeQuantity: (quantity: number) => void;
} & CartItemType;

interface QuantitySelectProps {
  onChange: (valueAsString: string, valueAsNumber: number) => void
  value: number
}

const QuantitySelect = ({ onChange, value }: QuantitySelectProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: value,
      min: 1,
      onChange
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack>
      <Button
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"pink.400"}
        _hover={{
          bg: "pink.300",
        }}
        {...dec}
      >
        -
      </Button>
      <Input maxW={24} {...input} />
      <Button
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"pink.400"}
        _hover={{
          bg: "pink.300",
        }}
        {...inc}
      >
        +
      </Button>
    </HStack>
  );
};

export const CartItem = (props: CartItemProps) => {
  const {
    name,
    description,
    image,
    price,
    quantity,
    onClickDelete,
    onChangeQuantity,
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
        <QuantitySelect
          value={quantity ?? 0}
          onChange={(_, valueAsNumber) => {
            onChangeQuantity(valueAsNumber);
          }}
        />
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
        <QuantitySelect
          value={quantity ?? 0}
          onChange={(_, valueAsNumber) => {
            onChangeQuantity(valueAsNumber);
          }}
        />
        <PriceTag price={price} />
      </Flex>
    </Flex>
  );
};
