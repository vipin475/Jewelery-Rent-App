import { Stack, Box, Flex, Center, Button } from "@chakra-ui/react";
import Jewellery from "./Jewellery";
import Jewellery1 from "../assets/jewellery1.png";
import Jewellery2 from "../assets/jewellery9.png";
import Jewellery3 from "../assets/jewellery3.png";
import Jewellery4 from "../assets/jewellery8.png";
import Jewellery5 from "../assets/jewellery9.png";
import Jewellery6 from "../assets/jewellery10.png";
import { useContext, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const BrowseJewellery = () => {
    const { renterExist, currentAccount } = useContext(BlockchainContext);
    let [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 10, md: 12 }}
            py={{ base: 20, md: 36 }}
        >
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Jewellery jewellery={Jewellery1} />
                <Jewellery jewellery={Jewellery2} />
                <Jewellery jewellery={Jewellery3} />
            </Flex>

            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                paddingTop={"100px"}
            >
                <Jewellery jewellery={Jewellery4} />
                <Jewellery jewellery={Jewellery5} />
                <Jewellery jewellery={Jewellery6} />
            </Flex>

            <Button
                onClick={() => handleClick("../dashboard")}
                colorScheme={"teal"}
                bg={"teal"}
                rounded={"full"}
                px={6}
                _hover={{
                    bg: "teal.500",
                }}
            >
                Go to Dashboard
            </Button>
        </Stack>
    );
};

export default BrowseJewellery;
