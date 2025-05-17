import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
    Box, Button, Heading, HStack, IconButton, Image, Input,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Text, useColorModeValue, useDisclosure, useToast, VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFlowerStore } from '../store/flower'

export const FlowerCard = ({ flower }) => {
    const {updateFLower, setUpdatedProduct} = useState
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { deleteFlower } = useFlowerStore()
    const toast = useToast()

    const handleDeleteFlower = async (flower_id) => {
        const { success, message } = await deleteFlower(flower_id)
        if (!success) {
            toast({
                "title": "Error",
                description: message,
                status: "error",
                isColsable: true,
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            })
        }
    }

    return (
        <Box shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={flower.image_url} alt={flower.primary_name} h={48} w={'full'} objectFit='cover'></Image>
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {flower.primary_name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${flower.flower_price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen}></IconButton>
                    <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteFlower(flower._id)}></IconButton>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Update Flower </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder='Flower Name'
                                name='name'
                            // value={newFlower.primary_name}
                            // onChange={(e) => setNewFlower({ ...newFlower, primary_name: e.target.value })}
                            />
                            <Input placeholder='Price'
                                name='price'
                                type='number'
                            // value={newFlower.flower_price}
                            // onChange={(e) => setNewFlower({ ...newFlower, flower_price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                            // value={newFlower.image_url}
                            // onChange={(e) => setNewFlower({ ...newFlower, image_url: e.target.value })}
                            />
                            {/* <Button colorScheme='blue' onClick={handleAddFlower} w='full'>
                                Add Flower
                            </Button> */}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                        // onClick={() => handleUpdateFlower(flower._id, updatedFlower)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost'
                        onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </Box>
    )
}
