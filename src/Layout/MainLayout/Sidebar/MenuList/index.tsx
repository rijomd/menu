import React from 'react';
import { Typography } from '@mui/material';

import { NavGroup } from './NavGroup';
import menuItem from '../../../../MenuItems';

export const MenuList = React.memo(() => {
  const navItems = menuItem?.items?.map((item) => {
    switch (item.type) {
      case 'group':
        return item.permission ? <NavGroup key={item.id} item={item} /> : null;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
});
