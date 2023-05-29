import { useForm } from "react-hook-form";
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

export default function RenterForm() {
    const { addRenter, currentAccount } = useContext(BlockchainContext);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (values) => {
        values["canRent"] = true;
        values["active"] = false;
        values["balance"] = 0;
        values["due"] = 0;
        values["start"] = 0;
        values["end"] = 0;
        const newValuesObject = { walletAddress: currentAccount, ...values };
        const {
            walletAddress,
            firstname,
            lastname,
            canRent,
            active,
            balance,
            due,
            start,
            end,
        } = newValuesObject;
        await addRenter(
            walletAddress,
            firstname,
            lastname,
            canRent,
            active,
            balance,
            due,
            start,
            end
        );

        console.log(newValuesObject);
    };

    return (
        <>
            <Text fontFamily={"heading"} fontSize={"x-large"} fontWeight={600}>
                Welcome <br />
                Please enter your First and Last Name to register.
            </Text>
            <Flex justifyContent={"center"} alignItems={"center"} p={5} mt={10}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl
                        isInvalid={errors.firstname && errors.lastname}
                    >
                        <FormLabel htmlFor="firstname">First Name</FormLabel>
                        <Input
                            id="firstname"
                            placeholder="First Name"
                            {...register("firstname", {
                                required: "This is required",
                                minLength: {
                                    value: 4,
                                    message: "Minimum length should be 4",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.firstname && errors.firstname.message}
                        </FormErrorMessage>

                        <FormLabel mt={5} htmlFor="lastname">
                            Last Name
                        </FormLabel>
                        <Input
                            id="lastname"
                            placeholder="Last Name"
                            {...register("lastname", {
                                required: "This is required",
                                minLength: {
                                    value: 4,
                                    message: "Minimum length should be 4",
                                },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.lastname && errors.lastname.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button
                        mt={4}
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Flex>
        </>
    );
}
