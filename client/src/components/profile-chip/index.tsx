import { useMenuPopover, useStores } from '@/hooks';
import { Avatar, Chip, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { observer } from 'mobx-react-lite';
import { LogoutRounded } from '@mui/icons-material';
import { styles } from './styles';

const ProfileChip = () => {
  const {
    authStore: { signOut },
    profileStore: { currentUser, isAdmin },
  } = useStores();

  const { anchorEl, open, closeMenu, openMenu } = useMenuPopover();

  return (
    <Box>
      <Chip
        sx={styles.chip}
        avatar={<Avatar sx={styles.avatar} />}
        label={`${currentUser?.name} ${isAdmin ? '(Admin)' : ''}`}
        onClick={openMenu}
      />
      <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={styles.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem onClick={signOut}>
          <LogoutRounded /> Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default observer(ProfileChip);
