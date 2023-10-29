import { Button, Flex, Box } from "@chakra-ui/react";
import React,{useEffect,useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useData} from "./DataProvider"
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC = () => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      setState((prevState:any) => ({
        ...prevState,
        requisitionDetails: {
          ...prevState.requisitionDetails,
          requisitionTitle: values.requisitionTitle,
          noOfOpenings: values.noOfOpenings,
          urgency: values.urgency,
          gender: values.gender,
        },
        tab:{
          currentTab : 1
        }
      }));

    },
  });

  

  const [reloadagain,setReloadAgain] = useState(true);
    const [number, setNumber]  = useState(0);

  useEffect(()=>{
    setState((prevState:any) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        requisitionTitle: values.requisitionTitle,
        noOfOpenings: values.noOfOpenings,
        urgency: values.urgency,
        gender: values.gender,
      }
    }));
    if(number<1) {
      setReloadAgain(!reloadagain); 
      setNumber(1)
    }
    else setNumber(0);

    // console.log(state);
    },[values,reloadagain])

  const {setState} = useData();

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit" >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
