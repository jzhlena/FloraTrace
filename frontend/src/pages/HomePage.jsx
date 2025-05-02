import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useFlowerStore } from '../store/flower'
import { FlowerCard } from '../components/FlowerCard'

const HomePage = () => {

  const { fetchFlowers, flowers } = useFlowerStore();

  useEffect(() => {
    fetchFlowers();
  }, [fetchFlowers]);
  console.log("flowers", flowers)

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}>
          Current Flowers
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          w={"full"}
          spacing={10}>
          {flowers.map((flower) => (
            <FlowerCard key={flower._id} flower={flower} />
          ))}
        </SimpleGrid>
        {flowers.length === 0 && (
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"gray.500"}
            textAlign={"center"}>
            No Flowers found {" "}
            <Link to={"/create"}>
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create a flower
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage