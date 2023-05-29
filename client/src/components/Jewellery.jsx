import { Button, Box, Image, Text, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
const Jewellery = ({ jewellery }) => {
    const { checkOut, checkIn } = useContext(BlockchainContext);
    return (
        <Box boxSize="lg" mx={2}>
            <Image src={jewellery} mb={10} />
            <Text>
                The design of the new Monster is exactly what you might expect
                from the sport naked par excellence, but in an even more
                cutting-edge and modern guise. Slinky yet aggressive curves.
                Classic details with a modern twist. A design that aims to offer
                pure Monster-style emotion. A real concentration of style, sport
                and fun that will make you want to get rid of the superfluous
                and focus only on what counts, sheer riding pleasure.
            </Text>
            <Stack
                spacing={0}
                direction={"row"}
                align={"center"}
                justify={"center"}
                mt={5}
            >
                <Button
                    onClick={checkOut}
                    m={2}
                    fontSize={"sm"}
                    fontWeight={600}
                    bg={"teal.500"}
                    color={"white"}
                    rounded={"full"}
                    _hover={{
                        bg: "teal.300",
                    }}
                >
                    Check Out
                </Button>

                <Button
                    onClick={checkIn}
                    m={2}
                    fontSize={"sm"}
                    fontWeight={600}
                    bg={"teal.500"}
                    color={"white"}
                    rounded={"full"}
                    _hover={{
                        bg: "teal.300",
                    }}
                >
                    Check In
                </Button>
            </Stack>
        </Box>
    );
};

export default Jewellery;
