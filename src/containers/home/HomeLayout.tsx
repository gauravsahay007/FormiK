import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React,{useState,useEffect} from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import {useData} from "./DataProvider"
const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0); 
  const {state}:any= useData();
  useEffect(()=>{
    setActiveTabIndex(state.tab.currentTab)
  },[state.tab])
  const handleTabChange = (index:any) => {
    setActiveTabIndex(index);
  };

  const selectTab = (index:any) => {
    setActiveTabIndex(index);
  };

  const currentTab = (no:any) =>{
    if(activeTabIndex<=no){
      return true;
    }
    return false;
  }

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={activeTabIndex} onChange={handleTabChange}>
          <TabList>
            <Tab isDisabled= {currentTab(0)}>Requistion Details</Tab>
            <Tab isDisabled= {currentTab(1)} >Job Details</Tab>
            <Tab isDisabled= {currentTab(2)}>Interview Settings</Tab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm />
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
