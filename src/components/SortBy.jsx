import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';

const StyledMenu = styled((props) => (
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
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function SortBy({data, setData, setPickCountry, setCurrentSort,setPickRegion, currentSort}) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
 
  
   const handleClose = (cur) => {
    setCurrentSort(cur);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="primary"
        onClick={handleClick}
      >
        Sort By {currentSort&&currentSort}
        <KeyboardArrowDownIcon />
      </IconButton>
      <StyledMenu
     
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>(setPickCountry(false),handleClose("Name"),setPickRegion(false))} disableRipple>
          <FontDownloadIcon />
          Name
        </MenuItem>
        <MenuItem onClick={()=>(handleClose("Region"),setPickCountry(false),setPickRegion(true))} disableRipple>
          <SouthAmericaIcon />
          Region
        </MenuItem>
        <MenuItem onClick={()=>(handleClose("Area"),setPickCountry(true),setPickRegion(false))} disableRipple>
          <DonutLargeIcon />
          Area
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
