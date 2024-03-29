import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const HtmlTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const Message = ({ message, buttonStyles,auth }) => {
  return (
    <HtmlTooltip
      title={
        <Typography color="inherit">
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            <b>{auth}</b>
          </Link>
          &nbsp;to proceed
        </Typography>
      }
      arrow
    >
      <Button sx={buttonStyles}>{message}</Button>
    </HtmlTooltip>
  );
};

export default Message;
