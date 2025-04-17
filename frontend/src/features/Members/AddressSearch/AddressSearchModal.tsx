import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  IconButton, // Import IconButton
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons"; // Import CloseIcon
import DaumPostcode from "react-daum-postcode";
import { AddressModalStyled } from "./styled";

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompletePost: (data: any) => void;
}

const AddressSearchModal: React.FC<AddressSearchModalProps> = ({
  isOpen,
  onClose,
  onCompletePost,
}) => {
  return (
    <>
      <AddressModalStyled>
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
          <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
          <ModalContent
            bg="white"
            color="gray.800"
            borderRadius="md"
            boxShadow="xl"
            maxWidth="400px"
          >
            <ModalHeader
              bg="teal.50"
              color="teal.600"
              fontWeight="semibold"
              padding={4}
              borderBottom="1px solid"
              borderColor="teal.200"
              display="flex" // Enable Flexbox
              justifyContent="flex-end" // Space out items
            >
              <IconButton
                aria-label="Close modal"
                icon={<CloseIcon />}
                size="sm"
                onClick={onClose} // Make sure your onClose function is correctly passed
                borderRadius="md"
              />
            </ModalHeader>
            <ModalBody padding={6}>
              <DaumPostcode onComplete={onCompletePost} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </AddressModalStyled>
    </>
  );
};

export default AddressSearchModal;
