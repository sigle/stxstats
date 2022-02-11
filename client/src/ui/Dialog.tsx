import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { styled } from '../stitches.config';
import { IconButton } from './IconButton';

const StyledContent = styled(DialogPrimitive.Content, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray2',
  br: '$2',
  boxShadow: '0px 0px 33px rgba(0, 0, 0, 0.08)',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  px: '$6',
  pt: '$5',
  pb: '$5',
  overflow: 'scroll',
  zIndex: 1,
  '&:focus': { outline: 'none' },
});

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

export const Dialog = ({ children, ...props }: DialogProps) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$4',
  right: '$6',
});

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content>;

export function DialogContent({ children, ...props }: DialogContentProps) {
  return (
    <StyledContent {...props}>
      {children}
      <StyledCloseButton asChild>
        <IconButton>
          <Cross1Icon width={15} height={15} />
        </IconButton>
      </StyledCloseButton>
    </StyledContent>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
