import { Button, Flex, Box } from "@chakra-ui/react";
import React,{useEffect,useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useData } from "./DataProvider";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC = () => {
  const { handleChange, errors, touched, handleBlur, handleSubmit, values,isValid } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
       
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),

      }),
      onSubmit: (values) => {
        setState((prevState: any) => ({
          ...prevState,
          tab: {
            currentTab: 2,
          },
        }));
      },
    });

 
    const previousButton = () => {
      setState((prevState:any) => ({
        ...prevState,
        tab:{
          currentTab : 0
        }
      }));
    }

    const {state,setState} = useData();
    const [reloadagain,setReloadAgain] = useState(true);
    const [number, setNumber]  = useState(0);

    useEffect(()=>{
      setState((prevState:any) => ({
        ...prevState,
        jobDetails: {
          ...prevState.jobDetails,
          jobDetails: values.jobDetails,
          jobLocation: values.jobLocation,
          jobTitle: values.jobTitle,
        }
      }));
      
    if(number<1) {
      setReloadAgain(!reloadagain); 
      setNumber(1)
    }
    else setNumber(0);
    },[values,reloadagain])

    // console.log(sta);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={()=>{
            previousButton();
          }}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
