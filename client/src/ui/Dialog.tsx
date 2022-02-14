import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { styled } from '../stitches.config';
import { IconButton } from './IconButton';

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  inset: 0,
});

const StyledContent = styled(DialogPrimitive.Content, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray2',
  position: 'fixed',
  inset: 0,
  p: '$5',
  zIndex: 1,
});

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

export const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
};

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$6',
  right: '$5',
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
