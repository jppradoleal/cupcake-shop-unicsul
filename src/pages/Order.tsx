import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import { formatPrice } from "../utils/price";

export interface APIOrderType {
  id: number;
  amount: number;
  order_id: {
    id: number;
    created_at: string;
    address: string;
    phone: string;
    status: string;
  };
  item_id: {
    id: number;
    name: string;
    price: number;
  };
}

export interface OrderType {
  id: number;
  created_at: string;
  address: string;
  phone: string;
  status: string;
  items: {
    amount: number;
    id: number;
    name: string;
    price: number;
  }[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export default function OrdersList() {
  const [orders, setOrders] = useState<OrderType[]>();

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("OrderItem")
        .select(
          `
        id,
        item_id (id, name, price),
        order_id (created_at, address, phone, status, id),
        amount 
      `
        )
        .returns<APIOrderType[]>();

      if (error) return;

      const parsedData: Record<number, OrderType> = {};

      for (const item of data) {
        if (item.order_id.id in parsedData) {
          parsedData[item.order_id.id].items.push({
            ...item.item_id,
            amount: item.amount,
          });
          continue;
        }

        parsedData[item.order_id.id] = {
          id: item.order_id.id,
          created_at: item.order_id.created_at,
          address: item.order_id.address,
          phone: item.order_id.phone,
          status: item.order_id.status,
          items: [{ ...item.item_id, amount: item.amount }],
        };
      }

      setOrders(Object.values(parsedData));
    }

    fetchOrders();
  }, []);

  return (
    <Box p={8}>
      <Stack rowGap={8}>
        {orders?.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <Heading as="h2" size="s" variant="muted">
                {formatDate(new Date(order.created_at))}
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                {order.items.map((item) => (
                  <HStack key={item.id}>
                    <Text size="xs">{item.name}</Text>
                    <p>x{item.amount}</p>
                    <Box width={"100%"} />
                    <Box justifySelf={"flex-end"} whiteSpace={"nowrap"}>
                      <p>{formatPrice(item.amount * item.price)}</p>
                    </Box>
                  </HStack>
                ))}
              </Stack>
            </CardBody>
            <CardFooter>
              <Flex justifyContent={"space-between"} w={"100%"}>
                <Text size="s" fontWeight={"bold"}>
                  Total:{" "}
                  {formatPrice(
                    order.items.reduce(
                      (acc, item) => item.amount * item.price + acc,
                      0
                    )
                  )}
                </Text>
                <Text>
                  {order.status}
                </Text>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
