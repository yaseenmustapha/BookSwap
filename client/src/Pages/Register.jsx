import React, { useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthCookie from "../Utils/useAuthCookie";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function Register() {
  let navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [, setAuthCookie] = useAuthCookie();

  const handleChangeUsername = (e) => {
    e.preventDefault(); // prevent the default action
    setUsername(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeEmail = (e) => {
    e.preventDefault(); // prevent the default action
    setEmail(e.target.value); // set name to e.target.value (event)
  };

  const handleChangePassword = (e) => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  };

  const tryRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user", {
        username: username,
        email: email,
        password: password,
      });
      console.log("Register response: ", response);
      if (response.status === 201) {
        setAuthCookie(username, response.data.access_token); // logs in user
        navigate("/");
      }
    } catch (error) {
      console.log("Register error: ", error);
      if (error.response.status === 409) setError(true);
    }
  };

  return (
    <>
      <Header></Header>
      <Flex
        minH={"10vh"}
        align={"center"}
        justify={"center"}
      >
        <Stack spacing={8} mx={"auto"} w={"500px"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to start selling and trading games ✌️
            </Text>
          </Stack>
          <form onSubmit={tryRegister}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl
                  id="username"
                  onChange={handleChangeUsername}
                  isRequired
                >
                  <FormLabel>Username</FormLabel>
                  <Input type="username" />
                </FormControl>
                <FormControl id="email" onChange={handleChangeEmail} isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl
                  id="password"
                  onChange={handleChangePassword}
                  isRequired
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      User already exists
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link href={"/login"} color={"blue.400"}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </>
  );
}

export default Register;