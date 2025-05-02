import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export const FlowerCard = ({ flower }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    return (
        <Box shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image src={flower.image_url} alt={flower.primary_name} h={48} w={'full'} objectFit='cover'></Image>
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {flower.primary_name}
                </Heading>
            </Box>
            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${flower.flower_price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} colorScheme="blue"></IconButton>
                <IconButton icon={<DeleteIcon />} colorScheme="red"></IconButton>
            </HStack>
        </Box>
    )
}
