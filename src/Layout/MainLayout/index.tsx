import React, { useMemo, useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import navigation from '../../MenuItems';

import { Breadcrumbs } from 'Components/Extend/Breadcrumbs';
import { getCustomizationState, setOpenDrawerAction } from "Themes/Reducer/customizationActions";

import { drawerWidth } from 'Services/Store/GridConstant';
import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";

import image from 'Assets/Images/background-image.jpg';

const MainStyled = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, leftdraweropened = true }: { theme: any, leftdraweropened: boolean }) => ({
  ...theme.typography.body1,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  marginTop: 74,
  transition: theme.transitions.create(
    'margin',
    leftdraweropened
      ? {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }
      : {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: leftdraweropened ? 0 : -(drawerWidth),
    width: leftdraweropened ? `calc(100% - ${drawerWidth}px)` : '100%'
  },
  [theme.breakpoints.down('md')]: {
    width: leftdraweropened ? `calc(100% - ${drawerWidth}px)` : '100%',
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    width: `100%`,
    padding: '16px',
  }
}));

const Main = React.memo(({ leftdraweropened = true, content }: { leftdraweropened: boolean, content: React.ReactNode }) => {
  return (
    <MainStyled theme={useTheme()} leftdraweropened={leftdraweropened}>
      {content}
    </MainStyled>
  );
});

export const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useAppSelector(getCustomizationState);
  const dispatch = useAppDispatch();
  const leftdraweropened = customization?.opened;

  const handleLeftDrawerToggle = useCallback(() => {
    dispatch(setOpenDrawerAction(!leftdraweropened));
  }, [leftdraweropened])

  const content = useMemo(() => {
    return <>
      <Breadcrumbs separator={KeyboardArrowRightIcon} navigation={navigation} icon title rightAlign />
      <Outlet />
    </>
  }, [document.location.pathname])

  const sideBar = useMemo(() => (
    <Sidebar drawerOpen={!matchDownMd ? leftdraweropened : !leftdraweropened} drawerToggle={handleLeftDrawerToggle} />
  ), [leftdraweropened])

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftdraweropened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar sx={{ backgroundImage: `url(${image})` }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      {sideBar}

      <Main leftdraweropened={leftdraweropened || true} content={content} />

    </Box>
  );
};
