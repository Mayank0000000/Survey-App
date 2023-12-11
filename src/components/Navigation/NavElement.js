import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FiHome, FiEdit, FiImage, FiVideo } from 'react-icons/fi';


// classname
function NavElement() {

  const icon = ({title}) => {
    return <><IconButton icon={<FiHome />} aria-label="Home" bg="transparent" color='#1E90FF' />
      <Text fontSize="md" ml='10px'>{title}</Text></>
  }

  return (
    <>
      <Link to='/'>
        <Flex alignItems="center" _hover={{ color: 'red' }} cursor='pointer' >
          {/* refactor */}
          <IconButton icon={<FiHome />} aria-label="Home" bg="transparent" color='#1E90FF' />
          <Text fontSize="md" ml='10px'>Home</Text>
        </Flex>
      </Link>
      <Link to='/survey'>
        <Flex alignItems="center" _hover={{ color: 'red' }} cursor='pointer' >
          <IconButton icon={<FiEdit />} aria-label="Survey" bg="transparent" color='#1E90FF' />
          <Text fontSize="md" ml='10px'>Survey</Text>
        </Flex>
      </Link>

      <Flex alignItems="center" _hover={{ color: 'red' }} cursor='pointer' >
        <IconButton icon={<FiImage />} aria-label="Image" bg="transparent" color='#1E90FF' />
        <Text fontSize="md" ml='10px'>Image</Text>
      </Flex>

      <Flex alignItems="center" _hover={{ color: 'red' }} cursor='pointer' >
        <IconButton icon={<FiVideo />} aria-label="Video" bg="transparent" color='#1E90FF' />
        <Text fontSize="md" ml='10px'>Video</Text>
      </Flex>
    </>
  )
}

export default NavElement;


