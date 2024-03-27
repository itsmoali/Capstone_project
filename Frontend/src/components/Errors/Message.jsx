import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));


const Message = ({message}) => {
  return (
    <div>

    <HtmlTooltip
      title={
          <Typography color="inherit">
            <Link href="/login" >
                <b>Login</b>
              </Link>
              &nbsp; To Proceed
          </Typography>
      }
    >
      <Button sx={{bgcolor:'red',width:'10vw',p:'10px',mt:'20px'}}>{message}</Button>
    </HtmlTooltip>
  </div>
  )
}

export default Message