import { Button, Flex, Box } from "@chakra-ui/react";
import React,{useEffect,useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useData} from "./DataProvider"
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC = () => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
    onSubmit: (values) => {
      // console.log({ values });
      alert("Form successfully submitted");

    },
  });


  const previousButton = () => {
    setState((prevState:any) => ({
      ...prevState,
      tab:{
        currentTab : 1
      }
    }));
  }

  const {setState} = useData();
  const [reloadagain,setReloadAgain] = useState(true);
  const [number, setNumber]  = useState(0);

  useEffect(()=>{
    setState((prevState:any) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        interviewDuration: values.interviewDuration,
        interviewLanguage: values.interviewLanguage,
        interviewMode: values.interviewMode,
      }
    }));
    
  if(number<1) {
    setReloadAgain(!reloadagain); 
    setNumber(1)
  }
  else setNumber(0);
  },[values,reloadagain])

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={()=>{
            previousButton();
          }} >
            Previous
          </Button>
          <Button colorScheme="red" type="submit" >
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
