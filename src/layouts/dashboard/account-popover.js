import { useCallback ,useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Magic } from "magic-sdk"
import { OAuthExtension } from '@magic-ext/oauth';
import { useMoralis } from 'react-moralis';
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
  const magic = new Magic('pk_live_8AC0D79F7D7C0E78', {
    extensions: [new OAuthExtension()],
  });
  const { logout, isLoggingOut, setUserData, isUserUpdating } = useMoralis();
  const [email,setEmail]=useState("")

  useEffect(
    () => {
async function init(){
  const userMetadata = await magic.user.getMetadata();
  setEmail(userMetadata.email)


 }


      init()
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  
  const handleLogout = async () => {
    await magic.user.logout();
    await logout()
    await onClose?.();
    await auth.signOut();
    router.push('/');
  };
  const handleSignOut = useCallback(
    () => {
      handleLogout();
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 250 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
        { email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
