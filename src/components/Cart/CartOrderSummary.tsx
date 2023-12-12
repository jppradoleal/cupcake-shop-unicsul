import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "../../utils/price";

type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

interface CartOrderSummary {
  address: string;
  setAddress: (s: string) => void;
  total: number;
  handleCheckout: () => void;
  disabled: boolean
}

export const CartOrderSummary = ({
  total,
  address,
  setAddress,
  handleCheckout,
  disabled
}: CartOrderSummary) => {
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Detalhes do pedido</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(total)} />
        <OrderSummaryItem label="Frete + taxas">
          <Link href="#" textDecor="underline">
            Calcular o frete
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Código do cupom">
          <Link href="#" textDecor="underline">
            Adicionar cupom
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Text>
        </Flex>
        <FormControl>
          <Input
            placeholder="Endereço"
            value={address}
            type="text"
            onChange={(event) => setAddress(event.target.value)}
          />
        </FormControl>
      </Stack>
      <Button
        bg={"pink.400"}
        color={"white"}
        size="lg"
        fontSize="md"
        onClick={handleCheckout}
        rightIcon={<FaArrowRight />}
        disabled={disabled}
        _disabled={{
          bg: "pink.300"
        }}
        _hover={{
          bg: "pink.300",
        }}
      >
        Finalizar compra
      </Button>
    </Stack>
  );
};
