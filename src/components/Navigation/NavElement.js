import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FiHome, FiEdit, FiImage, FiVideo } from 'react-icons/fi';
import './NavElement.css';

function NavElement() {

  const navItems = [
    { to: '/', icon: <FiHome />, label: 'Home' },
    { to: '/survey', icon: <FiEdit />, label: 'Survey' },
    { to: '/image', icon: <FiImage />, label: 'Image' },
    { to: '/video', icon: <FiVideo />, label: 'Video' },
  ];
  return (
    navItems.map(({ to, icon, label }) => (
      <Link key={label} to={to} className="nav-link">
        <Flex alignItems="center">
          <IconButton icon={icon} aria-label={label} className="icon-button" />
          <Text className='text'>{label}</Text>
        </Flex>
      </Link>
    ))
  );
}

export default NavElement;
