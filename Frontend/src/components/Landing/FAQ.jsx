import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useState } from 'react';

const faq = {
  "How do I start using your platform?": "Getting started is easy! Create an account or log in, then use our user-friendly interface to craft personalized courses and set study days.",
  "Can I sync my study schedule with my Google Calendar?": "Absolutely! Our platform offers a convenient integration feature that syncs your course schedule with your Google Calendar for seamless organization.",
  "Tell me more about the AI interaction. How does it enhance my learning?": "Our AI agent is your personal learning companion, providing tailored insights. Ask questions and seek clarifications for a more engaging and interactive learning experience.",
  "What if I miss a scheduled study day? Is there flexibility?": "Absolutely! Life happens, and you have the flexibility to catch up on missed material at your own pace. Our platform is designed to adapt to your schedule.",
  "Are there any hidden costs associated with using your platform?": "We believe in transparency. While basic services are free, we offer premium features with additional benefits at a reasonable subscription fee.",
  "How are assessments conducted, and how often can I expect them?": "Assessments are seamlessly integrated into each course, usually appearing upon completing a topic to reinforce your understanding.",
  "Can I showcase my progress and earned certificates to others?": "Certainly! Our comprehensive dashboard allows you to track progress, achievements, and earned certificates. Share your success with pride.",
  "What kind of support is available if I encounter technical issues?": "Our dedicated support team is here for you! Reach out via our contact form for prompt and helpful assistance to ensure a smooth learning experience.",
  "Are the certificates recognized in the professional world?": "Yes! Our certificates signify commitment to continuous learning and skill development, making them a valuable addition to your professional credentials.",
  "Can I access the platform on my smartphone or tablet?": "Absolutely! Our platform is designed to be mobile-friendly, allowing you to access courses and learning materials on the go from your smartphone or tablet."
};




const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{display:'flex',flexDirection:'column',minHeight:'90vh', width:'100vw', justifyContent:'center', alignItems:'center'}}>
      <Box sx={{width:'60vw',display:'flex',flexDirection:'column',mt:1}}>
    <Typography variant='h4' sx={{textAlign:'center',pb:'10px',fontWeight:'bold'}}>Frequently Asked Questions</Typography>
      {Object.keys(faq).map((question, index) => (
        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
            <Typography sx={{fontWeight:'bold'}}>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq[question]}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      </Box>
    </Box>
  );
}