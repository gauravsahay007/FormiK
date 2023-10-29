import { Box, Flex, Text, Grid } from "@chakra-ui/react";
import React,{useEffect} from "react";
import {useData} from "./DataProvider";

const DataCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Box mt="1rem" bg="white" width="100%" p="16px 24px" borderRadius="10px">
      <Text fontSize="1rem" as="h6" fontWeight="600" mb="12px">
        {title}
      </Text>
      <Grid gap="16px" templateColumns="1fr 1fr">
        {children}
      </Grid>
    </Box>
  );
};

const KeyValue: React.FC<{
  title: any;
  value?: any;
}> = ({ title, value }) => {
  
  return (
    <Box w="100%">
      <Text fontSize=".875rem" color="gray" mb="8px">
        {title}
      </Text>
      <Text fontSize=".875rem" mb="8px">
        {value || "-"}
      </Text>
    </Box>
  );
};

const PreviewCard: React.FC = () => {
  const {state,setState}:any = useData();
  useEffect(()=>{
    // console.log(state);
  },[state])
  // console.log(state);
  return (
    <Box p="1rem">
      <Box borderRadius="10px" bgColor="gray.100" height="fit-content">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontStyle="italic" m="0.4rem 2rem">
            Draft
          </Text>
          <Box
            bgColor="#EE5353"
            color="white"
            p="0.4rem 2rem"
            borderTopRightRadius="10px"
          >
            <Text fontStyle="italic">Preview</Text>
          </Box>
        </Flex>
        <Box w="100%" p="16px 24px">
          <Box
            width="100%"
            bgColor="#432B7D"
            color="white"
            p="1rem"
            borderRadius="10px"
            display="flex"
            flexDirection="row-reverse"
            justifyContent="space-between"
          >
            <Flex
              fontFamily="Poppins"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="0.9rem" fontWeight="500"></Text>
              <Flex justifyContent="space-around" alignItems="center">
             
                <Text  fontSize="0.8rem" mr="0.4rem" fontWeight="200" as="p">
                  OPENINGS <span style={{fontWeight:"900",position:"relative",left:"5px"}} >{state.requisitionDetails.noOfOpenings?state.requisitionDetails.noOfOpenings:"0"}</span>
                </Text>
                <Text fontSize="1rem" fontWeight="bold" as="span"></Text>
              </Flex>
            </Flex>

            <Flex
              fontFamily="Poppins"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="0.9rem" fontWeight="500"></Text>
              <Flex justifyContent="space-around" alignItems="center">
              <Text fontSize="0.8rem" mr="0.4rem" fontWeight="600" >
    {state.requisitionDetails.requisitionTitle ? state.requisitionDetails.requisitionTitle : ""}
  </Text>
                
                
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box maxH="50rem" overflowY="auto" px="24px" pb="24px">
          <DataCard title="Requisition Details">
            <KeyValue title="Urgency" value={state.requisitionDetails.urgency==''?"":state.requisitionDetails.urgency=='1'?"Immediate Joining":state.requisitionDetails.urgency=='0'?"Urgent":"Relaxed"} />
            <KeyValue title="Gender" value={state.requisitionDetails.gender=='m'?"Male":state.requisitionDetails.gender=='f'?"Female":state.requisitionDetails.gender==''?"":"Non Binary"} />
          </DataCard>
          <DataCard title="Job Detail">
            <KeyValue title="Job Title" value={state.jobDetails.jobTitle} />
            <KeyValue title="Job Details" value={state.jobDetails.jobDetails} />
            <KeyValue title="Job Location" value={state.jobDetails.jobLocation} />
          </DataCard>
          <DataCard title="Interview Settings">
            <KeyValue title="Interview Duration" value={state.interviewDuration} />
            <KeyValue title="Interview Language" value={state.interviewLanguage} />
            <KeyValue title="Interview Mode" value={state.interviewMode} />
          </DataCard>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewCard;
