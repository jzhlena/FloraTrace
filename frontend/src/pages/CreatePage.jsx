import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { useFlowerStore } from '../store/flower';

const CreatePage = () => {
  const [newFlower, setNewFlower] = useState({
    primary_name: "",
    flower_price: "",
    image_url: "",
  });

  const toast = useToast()

  const { createFlower } = useFlowerStore();
  const handleAddFlower = async () => {
    const { success, message } = await createFlower(newFlower)
    if(!success){
      toast({
        "title": "Error",
        description: message,
        status: "error",
        duration: 3000,
        isColsable: true,
      });
    }
    else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Flower
        </Heading>
        <Box
          w={"full"} bg={useColorModeValue("white", "gray.500")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input placeholder='Flower Name'
              name='name'
              value={newFlower.primary_name}
              onChange={(e) => setNewFlower({ ...newFlower, primary_name: e.target.value })}
            />
            <Input placeholder='Price'
              name='price'
              type='number'
              value={newFlower.flower_price}
              onChange={(e) => setNewFlower({ ...newFlower, flower_price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newFlower.image_url}
              onChange={(e) => setNewFlower({ ...newFlower, image_url: e.target.value })}
            />
            <Button colorScheme='blue' onClick={handleAddFlower} w='full'>
              Add Flower
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage