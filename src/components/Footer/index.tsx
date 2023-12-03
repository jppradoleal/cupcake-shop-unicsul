import { Box, Container, Stack, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"12xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          fontWeight={"bold"}
          color={useColorModeValue("pink.400", "white")}
        >
          Cupcake Shop
        </Text>
        <Text>© 2022 Chakra Templates. All rights reserved</Text>
      </Container>
    </Box>
  );
}
