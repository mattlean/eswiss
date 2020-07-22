import React, { useRef, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import Btn from '../Btn'
import Modal from './index'
import './_index.scss'
import '../Btn/_index.scss'

export default {
  title: 'Modal',
  component: Modal,
  decorators: [withKnobs],
}

export const BodyText = () => (
  <Modal isOpen={true} onClose={action('Triggered onClose event')}>
    <p>
      {text(
        'Body Text',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
      )}
    </p>
  </Modal>
)

export const Heading = () => (
  <Modal isOpen={true} onClose={action('Triggered onClose event')}>
    <h1 className="modal-heading heading4">
      {text('Heading Text', 'Lorem Ipsum')}
    </h1>
  </Modal>
)

export const HeadingAndText = () => (
  <Modal isOpen={true} onClose={action('Triggered onClose event')}>
    <h1 className="modal-heading heading4">
      {text('Heading Text', 'Lorem Ipsum')}
    </h1>
    <p>
      {text(
        'Body Text',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
      )}
    </p>
  </Modal>
)

const CompositeBtnAndModal = () => {
  const [focusEleOnClose, setFocusEleOnClose] = useState<HTMLElement>()
  const [isOpen, setIsOpen] = useState(false)
  const contentEle = useRef<HTMLDivElement>(null)

  let currContentEle
  if (contentEle && contentEle.current) {
    currContentEle = contentEle.current
  }

  return (
    <>
      <div ref={contentEle} id="content">
        <Btn
          type="button"
          onClick={() => {
            setFocusEleOnClose(document.activeElement as HTMLElement)
            setIsOpen(true)
          }}
        >
          {text('Button Text', 'Open Modal')}
        </Btn>
      </div>
      <Modal
        closeOnOverlayClick={true}
        focusEleOnClose={focusEleOnClose}
        hideEleWithAria={currContentEle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <h1 className="modal-heading heading4">
          {text('Modal Heading Text', 'Lorem Ipsum')}
        </h1>
        <p>
          {text(
            'Modal Body Text',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
          )}
        </p>
      </Modal>
    </>
  )
}

export const BtnAndModal = () => <CompositeBtnAndModal />
