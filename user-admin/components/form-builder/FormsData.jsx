export const cardsData = [
  {
    id: 0,
    title: 'Drag here',
    fields: [],
  },
  {
    id: 1,
    title: 'Choose your fields',
    fields: [
      {
        id: 100,
        label: 'Full Name',
        placeholder: 'write your Full Name..',
        type: 'text',
        path: 'M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z',
        optional: false,
      },
      {
        id: 200,
        label: 'Email',
        placeholder: 'Ex: name@gmail.com',
        type: 'email',
        path: 'M2.24283 6.85435L11.4895 1.3086C11.8062 1.11865 12.2019 1.11872 12.5185 1.30878L21.7573 6.85433C21.9079 6.9447 22 7.10743 22 7.28303V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.28315C2 7.10748 2.09218 6.94471 2.24283 6.85435ZM18.3456 8.24383L12.0606 13.6829L5.64722 8.23769L4.35278 9.7623L12.0731 16.3171L19.6544 9.75615L18.3456 8.24383Z',
        optional: false,
      },
      {
        id: 300,
        label: 'Password',
        placeholder: 'Make it stronger....',
        type: 'password',
        path: 'M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM11 15.7324V18H13V15.7324C13.5978 15.3866 14 14.7403 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 14.7403 10.4022 15.3866 11 15.7324ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z',
        optional: false,
      },
      {
        id: 400,
        label: 'Phone Number',
        placeholder: 'Ex: +880 04324132',
        type: 'number',
        path: 'M6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3C5 2.44772 5.44772 2 6 2ZM12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17Z',
        optional: false,
      },
      {
        id: 500,
        label: 'Question-1?',
        placeholder: 'Write anything....',
        type: 'text',
        path: 'M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z',
        optional: false,
      },
      {
        id: 510,
        label: 'Question-2?',
        placeholder: 'Write anything....',
        type: 'text',
        path: 'M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z',
        optional: false,
      },
      {
        id: 520,
        label: 'Question-3?',
        placeholder: 'Write anything....',
        type: 'text',
        path: 'M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z',
        optional: false,
      },
      {
        id: 600,
        label: 'Date',
        type: 'date',
        path: 'M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z',
        optional: false,
      },
      {
        id: 700,
        label: 'URL',
        placeholder: 'Enter an URL...',
        type: 'url',
        path: 'M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z',
        optional: false,
      },
      {
        id: 800,
        label: 'Time',
        type: 'time',
        path: 'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z',
        optional: false,
      },
      {
        id: 900,
        label: 'Radio-1',
        type: 'radio',
        path: radioSVG(),
        options: [
          {
            label: 'Option 1',
            value: 'Option-1',
          },
          {
            label: 'Option 2',
            value: 'Option-2',
          },
          {
            label: 'Option 3',
            value: 'Option-4',
          },
        ],
      },
      {
        id: 1000,
        label: 'Radio-2',
        type: 'radio',
        path: radioSVG(),
        options: [
          {
            label: 'Option 1',
            value: 'Option-1',
          },
          {
            label: 'Option 2',
            value: 'Option-2',
          },
          {
            label: 'Option 3',
            value: 'Option-4',
          },
        ],
      },
      {
        id: 1100,
        label: 'Radio-3',
        type: 'radio',
        path: radioSVG(),
        options: [
          {
            label: 'Option 1',
            value: 'Option-1',
          },
          {
            label: 'Option 2',
            value: 'Option-2',
          },
          {
            label: 'Option 3',
            value: 'Option-4',
          },
        ],
      },
      {
        id: 1200,
        label: 'Checkbox-1',
        placeholder: 'Write anything',
        type: 'checkbox',
        path: checkboxSVG(),
        options: [
          {
            label: 'Option 1',
            value: 'Option-1',
          },
          {
            label: 'Option 2',
            value: 'Option-2',
          },
          {
            label: 'Option 3',
            value: 'Option-4',
          },
        ],
      },
      {
        id: 1300,
        label: 'Checkbox-2',
        placeholder: 'Write anything',
        type: 'checkbox',
        path: checkboxSVG(),
        options: [
          {
            label: 'Option 1',
            value: 'Option-1',
          },
          {
            label: 'Option 2',
            value: 'Option-2',
          },
          {
            label: 'Option 3',
            value: 'Option-4',
          },
        ],
      },
      {
        id: 1400,
        label: 'Checkbox-3',
        placeholder: 'Write anything',
        type: 'checkbox',
        path: checkboxSVG(),
        options: [
          {
            label: 'Option 1',
            value: 'Option-1',
          },
          {
            label: 'Option 2',
            value: 'Option-2',
          },
          {
            label: 'Option 3',
            value: 'Option-4',
          },
        ],
      },
    ],
  },
]

export function radioSVG() {
  return 'M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8'
}

export function checkboxSVG() {
  return 'M19 4H5V20H19V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H19.9997C20.5519 2 20.9996 2.44772 20.9997 3L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM11.2929 13.1213L15.5355 8.87868L16.9497 10.2929L11.2929 15.9497L7.40381 12.0607L8.81802 10.6464L11.2929 13.1213Z'
}
