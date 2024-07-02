import {
  Box,
  Code,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';

import CryptForm from '../components/cryptForm';
import passwords from '../passwords';

export default function Home() {
  const [isOpening, setIsOpening] = useState(false);
  const [password, setPassword] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    window.downloader = document.getElementById('downloader');
  }, []);

  return (
    <>
      <Head>
        <meta property='og:title' content={'EasySave3 Editor | Modify your favorite games\' save files!'} />
        <meta property='og:url' content='https://es3.lol/' />
        <meta
          name='og:description'
          content='EasySave3 Editor helps you empower your gaming journey with effortless save file editing. Seamlessly modify, and manage EasySave3 game saves with a user-friendly web application designed to enhance your gaming experience.'
        />
        <meta
          name='description'
          content='EasySave3 Editor helps you empower your gaming journey with effortless save file editing. Seamlessly modify, and manage EasySave3 game saves with a user-friendly web application designed to enhance your gaming experience.'
        />
      </Head>

      {currentYear && (
        <>
          <a id='downloader' style={{ display: 'none' }}></a>
          <Flex alignItems='center' justifyContent='center' mt='24' mb='14'>
            <Box
              direction='column'
              background='gray.700'
              rounded='6'
              p='12'
              position='relative'
            >
              <Heading mb='6'>EasySave3 Editor</Heading>

              <Text>Password</Text>
              <Input value={password} placeholder='a1bc2d3fghi4...' onChange={e => setPassword(e.target.value)} isDisabled={isOpening} isRequired />
              <Text mt='2'>Don't know the password for your game?</Text>
              <Text>Check if it is already known below.</Text>
              <Button mt='2' colorScheme='teal' onClick={onOpen}>Known game passwords</Button>

              <Divider mt='8' mb='3' />
              <Heading size='md' mb='3'>Decryption</Heading>
              <CryptForm isOpening={isOpening} setIsOpening={setIsOpening} password={password} />
              <Text mt='5'>If you are getting no errors after pressing the button</Text>
              <Text>and the decrypted file starts downloading, it means that the</Text>
              <Text>decryption was successful. For some games, the decrypted</Text>
              <Text>save file might look like it&apos;s still encrypted, but</Text>
              <Text>it can actually just be GZip compression. So, if your</Text>
              <Text>decrypted file still looks like it&apos;s encrypted, please</Text>
              <Text>try decompressing it with GZip.</Text>

              <Divider mt='5' mb='3' />
              <Heading size='md' mb='3'>Encryption</Heading>
              <CryptForm isOpening={isOpening} setIsOpening={setIsOpening} password={password} isEncryption />
              <Text mt='5'>If you had to decompress the save file after decryption,</Text>
              <Text>you will have to recompress it again before uploading it here</Text>
              <Text>and encrypt it again.</Text>
            </Box>
          </Flex>

          <Box position='fixed' bottom='5px' right='5px' textAlign='right'>
            <Link as={NextLink} href='/terms-of-service' color='blue.500' mr='6.5px'>Terms of Service</Link>
            <Link as={NextLink} href='/privacy-policy' color='blue.500'>Privacy Policy</Link>
            <Text>Copyright © {currentYear} <Link as={NextLink} href='https://alex.tusinean.ro' color='blue.500'>Alex Tușinean</Link></Text>
          </Box>

          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen} onClose={onClose}
            scrollBehavior='inside' isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Known game passwords</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {passwords.map(({ gameName, password }, index) => (
                  <Box key={index}>
                    {index !== 0 && <Divider my='2' />}
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Code>{password}</Code>
                      <Text ml='auto'>{gameName}</Text>
                      <Button
                        ml='3' colorScheme='teal'
                        onClick={() => {
                          setPassword(password);
                          onClose();
                        }}
                      >
                        Use
                      </Button>
                    </Box>
                  </Box>
                ))}
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
