import CurrentTotals from "./CurrentTotals";
import { Stack, Box, Flex, Center } from "@chakra-ui/react";
import Jewellery from "./Jewellery";
import Jewellery1 from "../assets/jewellery1.png";
import Jewellery2 from "../assets/jewellery9.png";
import Jewellery3 from "../assets/jewellery3.png";
import Jewellery4 from "../assets/jewellery8.png";
import Jewellery5 from "../assets/jewellery9.png";
import Jewellery6 from "../assets/jewellery10.png";
import RenterForm from "./RenterForm";
import { useContext, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = () => {
    const { renterExist, currentAccount } = useContext(BlockchainContext);
    let [loading, setLoading] = useState(true);

    return (
        <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 10, md: 12 }}
            py={{ base: 20, md: 36 }}
        >
            {renterExist == null && currentAccount ? (
                <Center>
                    <ClipLoader loading={loading} size={75} />
                </Center>
            ) : renterExist ? (
                <CurrentTotals />
            ) : (
                <RenterForm />
            )}

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
        </Stack>
    );
};

export default Dashboard;
