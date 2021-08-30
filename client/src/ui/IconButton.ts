import { styled } from '../stitches.config';

export const IconButton = styled('button', {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '$2',
  p: '$2',
  br: '$1',
  color: '$gray11',
  '&:hover': {
    backgroundColor: '$gray4',
  },
  '&:active': {
    backgroundColor: '$gray5',
  },
});
