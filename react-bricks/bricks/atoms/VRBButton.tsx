import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link, types, useAdminContext } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VButton, ButtonProps } from '@/components/atoms/VButton'
import { VText } from '@/components/atoms/VText'
import { AnimatePresenceModal } from '@/components/atoms/Modal'
import { ProgramModalEntry } from '@/components/organisms/ProgramModalEntry'


export interface IVRBButtonProps extends ButtonProps {
  background?: boolean
  btnLink?: string
}

const VRBButton: types.Brick<IVRBButtonProps> = ({
  children:text,
  primary=true,
  special,
  secondary,
  btnLink='https://team3d.io/',
  rounded,
  background,
  ...rest
}) => {
  const { isAdmin } = useAdminContext();
  const [showModal, setShowModal] = useState(false);
  const handleClickEvent = () => {
    if(isAdmin || !btnLink) return;
    if(btnLink === '!openModal') {
      setShowModal(true);
    }
    else {
      window.open(btnLink, '_blank');
    }
  }

  useEffect(() => {
    // disable scroll when modal is open
    if (showModal) {
      document.getElementById('root_html').style.overflow = 'hidden';
    }
    else {
      document.getElementById('root_html').style.overflow = 'auto';
    }
    
  }, [showModal]);

  if(isAdmin) {
    return (
      <>
      <Link {...rest}>
        <VButton onClick={handleClickEvent} primary={primary} special={special} secondary={secondary}  rounded={rounded}>
          {typeof(text) === 'string' ? <VText size='md' spacing="md" overrideTextColor={background || !secondary}>
            {text}
          </VText>
          :text  }
        </VButton>
      </Link>
      </>
    )
  }
  return (
    <>
    <AnimatePresenceModal>{showModal && <ProgramModalEntry onClose={() => setShowModal(false)}></ProgramModalEntry>}</AnimatePresenceModal>
    <VButton onClick={handleClickEvent} primary={primary} special={special} secondary={secondary} rounded={rounded}>
      {typeof(text) === 'string' ? <VText size='md' spacing="md" overrideTextColor={background || !secondary}>
        {text}
      </VText>
      :text  }
    </VButton>
    </>
  )
}

VRBButton.schema = {
  name: blockNames.Button,
  label: 'Button',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    children: 'Something',
    btnLink: 'https://team3d.io/',
    rounded: true,
    primary: true,
    special: false,
    secondary: false,
  }),
  sideEditProps: [
    {
      name: 'children',
      label: 'Button text',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'btnLink',
      label: 'Button link',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'primary',
      label: 'Primary',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'special',
      label: 'Special',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'secondary',
      label: 'Secondary',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'rounded',
      label: 'Rounded',
      type: types.SideEditPropType.Boolean,
    }
  ],
}

export default VRBButton