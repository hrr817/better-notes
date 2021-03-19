import React from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectModals, removeModal } from '../../redux/features/modalSlice'
import {
  Modal,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/react"

import _ from 'lodash'

import './style.css'

const Modals = () => {
     const dispatch = useDispatch()
     const modals = useSelector(selectModals)

     if(_.isEmpty(modals)) return <> </>

     return createPortal(
     _.map(modals, ({ name, component, show }) => show && 
     <Modal 
          key={name}
          isOpen={show} 
          onClose={() => dispatch(removeModal(name))}
          trapFocus={false}
          closeOnOverlayClick={false}
          isCentered
     >
          <ModalOverlay background="blackAlpha.600"/>
          <ModalContent background="#dedede" color="#2e2e2e" mr="2" ml="2">{ component } </ModalContent>
      </Modal>
     )
     , document.getElementById('modals-root'))
}

export default Modals
