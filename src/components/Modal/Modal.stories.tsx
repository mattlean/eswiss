import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import Btn from '../Btn'
import Modal from './index'
import '../Btn/_index.scss'
import './_index.scss'

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

export const BodyFullscreen = () => (
  <Modal
    isFull={true}
    isOpen={true}
    onClose={action('Triggered onClose event')}
  >
    <p>
      {text(
        'Body Text',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
      )}
    </p>
  </Modal>
)

export const ModalWithWidth = () => (
  <Modal
    isOpen={true}
    onClose={action('Triggered onClose event')}
    modalStyle={{ maxWidth: 500 }}
  >
    <p>
      {text(
        'Body Paragraph',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
      )}
    </p>
  </Modal>
)

export const Heading = () => (
  <Modal isOpen={true} onClose={action('Triggered onClose event')}>
    <h1 className="modal-h disp-7">{text('Heading Text', 'Lorem Ipsum')}</h1>
  </Modal>
)

export const HeadingAndText = () => (
  <Modal isOpen={true} onClose={action('Triggered onClose event')}>
    <h1 className="modal-h disp-7">{text('Heading Text', 'Lorem Ipsum')}</h1>
    <p>
      {text(
        'Body Text',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
      )}
    </p>
  </Modal>
)

export const HeadingAndTextFullscreen = () => (
  <Modal
    isFull={true}
    isOpen={true}
    onClose={action('Triggered onClose event')}
  >
    <h1 className="modal-h disp-7">{text('Heading Text', 'Lorem Ipsum')}</h1>
    <p>
      {text(
        'Body Text',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.'
      )}
    </p>
  </Modal>
)

const BG = 'background'
const BTN = 'button'
const MODAL = 'modal'

const CompositeContentAndModal = () => {
  const [focusEleOnClose, setFocusEleOnClose] = useState<HTMLElement>()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div id="content">
        <p>
          {text(
            'Paragraph 1',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.',
            BG
          )}
        </p>
        <p>
          {text(
            'Paragraph 2',
            'In mattis vulputate est eget blandit. Nunc massa metus, efficitur sed leo vitae, imperdiet molestie sapien. Pellentesque dapibus fermentum arcu quis congue. Sed vestibulum nisl id ante tincidunt porta. Cras orci felis, faucibus eu venenatis sed, blandit at neque. In sodales lacinia posuere. Etiam nec interdum massa. Curabitur sit amet mi aliquam, commodo sapien ac, euismod neque. Sed porta lacus sem, non maximus ligula posuere ac. Integer a nulla facilisis, maximus erat nec, blandit dui. Maecenas id urna in turpis vestibulum rutrum. Praesent malesuada varius orci, vel laoreet sem faucibus eu. Nunc eu sem odio. Sed gravida tellus metus, sed fermentum diam rhoncus id. Donec id urna sodales, convallis nunc eu, venenatis felis.',
            BG
          )}
        </p>
        <p>
          {text(
            'Paragraph 3',
            'Etiam vel dictum mi. Integer massa nunc, dignissim nec congue nec, mattis nec ipsum. Ut condimentum felis libero, nec vehicula elit cursus sed. Vestibulum eget lectus nec nibh mollis ultrices. Cras odio justo, posuere sit amet faucibus et, ullamcorper id odio. Mauris mollis eget dolor sit amet malesuada. Vivamus a posuere tortor.',
            BG
          )}
        </p>
        <p>
          {text(
            'Paragraph 4',
            'Praesent porta, ipsum vel dictum vestibulum, dolor dui eleifend felis, vel hendrerit tortor est vel nulla. Ut pellentesque augue libero, blandit commodo massa cursus nec. In sagittis, purus eget faucibus sollicitudin, purus purus pretium metus, vitae mattis risus sapien ut sem. Morbi sit amet neque quis magna aliquam cursus ullamcorper ac elit. Nam enim diam, sollicitudin ut justo a, venenatis consectetur mi. Cras dolor massa, congue vel sem et, interdum dictum nibh. Aliquam eget mi cursus ante interdum iaculis ut vel felis. Curabitur convallis mi eu ante posuere commodo. Donec scelerisque elit ac dictum dictum.',
            BG
          )}
        </p>
        <Btn
          type="button"
          onClick={() => {
            setFocusEleOnClose(document.activeElement as HTMLElement)
            setIsOpen(true)
          }}
        >
          {text('Text', 'Open Modal', BTN)}
        </Btn>
        <p>
          {text(
            'Paragraph 5',
            'Cras laoreet est ut ex accumsan, in ornare elit feugiat. Donec lacinia ante at velit molestie iaculis. Curabitur luctus urna quis velit bibendum, vitae gravida odio rhoncus. Nunc felis sem, faucibus malesuada vestibulum eget, faucibus vitae enim. Maecenas ultrices dolor ut turpis faucibus, vulputate malesuada leo vehicula. Duis nec dui vitae mi euismod tristique. Donec rutrum ex ipsum. Donec non condimentum ipsum, eu varius ligula. Suspendisse nec ante purus. Maecenas aliquet, magna vitae varius placerat, purus urna ultrices elit, sed faucibus purus eros at magna. Integer rhoncus, metus sed facilisis suscipit, sem turpis tincidunt purus, id consectetur ipsum lorem et dolor. Aliquam scelerisque leo non tempus tincidunt. Nam nisi arcu, blandit tincidunt eros et, elementum dignissim diam. Pellentesque placerat scelerisque egestas.',
            BG
          )}
        </p>
        <p>
          {text(
            'Paragraph 6',
            'Curabitur sodales arcu enim, in feugiat lacus tincidunt eu. Nullam scelerisque, purus vitae posuere vulputate, nunc nisi cursus dui, nec cursus metus arcu non dui. Donec luctus, quam nec lobortis feugiat, orci tellus posuere ipsum, dapibus egestas mi justo eu turpis. Praesent ex odio, varius id arcu in, lobortis tempus libero. Integer nibh lorem, pretium lobortis dolor ut, pretium rutrum lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae nulla non urna mattis maximus.',
            BG
          )}
        </p>
        <p>
          {text(
            'Paragraph 7',
            'In hac habitasse platea dictumst. Fusce consectetur quis massa non scelerisque. Nam rhoncus commodo tortor, eget sollicitudin orci rutrum in. Nulla quis nisi ut tortor sagittis semper. Donec eu fermentum orci. In dapibus leo non risus consectetur sollicitudin. Suspendisse magna quam, porttitor ut ultrices sit amet, venenatis a urna. Etiam pulvinar mollis neque, nec fermentum lacus sagittis et. Aenean congue elit at scelerisque consectetur. Morbi ullamcorper efficitur dui, sit amet vehicula ante imperdiet eget. Proin auctor est vitae maximus malesuada. Nunc sit amet efficitur metus. Curabitur et nibh faucibus, tincidunt tellus eget, euismod lectus. Nam est libero, tempus at tincidunt non, iaculis a arcu. Fusce vulputate dui pulvinar felis pretium commodo.',
            BG
          )}
        </p>
      </div>
      <Modal
        autoCenterH={true}
        autoCenterV={true}
        closeOnOverlayClick={true}
        focusEleOnClose={focusEleOnClose}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        modalStyle={{ maxWidth: 800 }}
      >
        <h1 className="modal-h disp-7">
          {text('Heading', 'Lorem Ipsum', MODAL)}
        </h1>
        <p>
          {text(
            'Body',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue enim ac nibh dictum, eu hendrerit enim malesuada. Vivamus et magna dignissim ipsum viverra pretium quis interdum dui. Proin eget rhoncus arcu, ut feugiat est. Integer eget nulla sed orci gravida aliquet. Sed a luctus metus, ac porta ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non vestibulum quam. Vivamus porta vulputate ultrices. Ut et congue purus. Sed id tortor et sem cursus aliquet sed eget nibh. Sed scelerisque quam eleifend dolor pellentesque, eget ultricies justo aliquam. Praesent eu tortor sed diam dignissim accumsan. Cras sit amet ex mi.',
            MODAL
          )}
        </p>
      </Modal>
    </>
  )
}

export const ButtonAndLongTextAndModal = () => <CompositeContentAndModal />
