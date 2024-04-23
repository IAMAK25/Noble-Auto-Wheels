import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { FaUser } from "react-icons/fa";
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { TbGraphFilled } from "react-icons/tb";
import CssBaseline from '@mui/material/CssBaseline';
import { FaTachographDigital } from "react-icons/fa6";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { withRouter } from 'react-router-dom';
import { RiMotorbikeFill } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { auth, app, storage, database } from '../Firebase/firebase';

// import { useHistory } from 'react-router-dom';

// import {useNavigate} from "react-router-dom";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideNav = (props) => {
  const { history } = props;
  const id = props.id;

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setLoading(false);

      history.push('/');
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', function (event) {
        window.history.pushState(null, document.title, window.location.href);
      });
    } catch (error) {
      setLoading(false);
      console.error('Error logging out:', error);
    }
  };

  const handlePersonalDetailsToggle = () => {
    setPersonalDetailsOpen(!personalDetailsOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} >

            <div>
              Noble Auto Wheels
            </div>
            <div>
              <div style={{ cursor: 'pointer' }} onClick={handleLogout}>
                <RiLogoutBoxLine />
                Logout
              </div>
            </div>

          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />


        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/profile`) }} >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <FaUser style={{ height: '3rem', width: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary={"Profile"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>



        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/Report`) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <TbGraphFilled style={{ height: '3rem', width: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary={"Sales Report"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/addBikes`) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <RiMotorbikeFill style={{ height: '3rem', width: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary={"Add Bikes"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/addSales`) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <RiMotorbikeFill style={{ height: '3rem', width: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary={"Add Sales"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>



        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/addData`) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 5,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <FaTachographDigital style={{ height: '3rem', width: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary={"Add Data"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { history.push(`/DisplayData`) }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 5,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <FaTachographDigital style={{ height: '3rem', width: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary={"Display Data"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <Divider />



      </Drawer>

    </Box>
  );
}

export default withRouter(SideNav);