import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "../../utils/price";
import { Link as ReactRouterLink } from "react-router-dom"

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

export interface ShippingData {
  address: string
  phone: string
}

interface CartOrderSummary {
  total: number;
  handleCheckout: (data: ShippingData) => Promise<void>;
  disabled: boolean;
}

export const CartOrderSummary = ({
  total,
  handleCheckout,
  disabled,
}: CartOrderSummary) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ShippingData>();

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(handleCheckout)}
      spacing="8"
      borderWidth="1px"
      rounded="lg"
      padding="8"
      width="full"
    >
      <Heading size="md">Detalhes do pedido</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(total)} />
        <OrderSummaryItem label="Frete + taxas">
          <ChakraLink as={ReactRouterLink} to="" textDecor="underline">
            Calcular o frete
          </ChakraLink>
        </OrderSummaryItem>
        <OrderSummaryItem label="Código do cupom">
          <ChakraLink as={ReactRouterLink} to="" textDecor="underline">
            Adicionar cupom
          </ChakraLink>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Text>
        </Flex>
        <FormControl isInvalid={!!errors.address}>
          <Input
            placeholder="Endereço"
            type="text"
            {...register("address", { required: true })}
          />
          <FormErrorMessage>
            { errors?.address?.message?.toString() }
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <Input
            placeholder="Telefone"
            type="tel"
            {...register("phone", { required: true })}
          />
          <FormErrorMessage>
            { errors?.phone?.message?.toString() }
          </FormErrorMessage>
        </FormControl>
      </Stack>
      <Button
        bg={"pink.400"}
        color={"white"}
        size="lg"
        fontSize="md"
        type="submit"
        rightIcon={<FaArrowRight />}
        disabled={disabled}
        _disabled={{
          bg: "pink.300",
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
