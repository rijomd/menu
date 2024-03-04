import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

import { NavItem } from '../NavItem';
import { NavCollapse } from '../NavCollapse';

import { TypeOfMenuPages } from "../../../../../MenuItems"

export const NavGroup = React.memo(({ item }: { item: TypeOfMenuPages }) => {
  const theme = useTheme();

  const items = item.children?.map((menu: TypeOfMenuPages) => {
    switch (menu.type) {
      case 'collapse':
        return menu?.permission ? <NavCollapse key={menu.id} menu={menu} level={1} /> : null;
      case 'item':
        return menu?.permission ? <NavItem key={menu.id} item={menu} level={1} /> : null;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.subtitle1 }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subtitle2 }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
});
