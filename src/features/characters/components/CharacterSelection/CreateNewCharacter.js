import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { style } from 'typestyle';

/* Context */
import { CharacterContext } from '../../characterContext';

/* Common Components */
import VStack from '../../../../components/common/VStack/VStack';

// Validation schema
const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 125;

const validationSchema = Yup.object({
    name: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, 'Name must be alphanumeric')
    .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters`)
    .max(125, `Name must not be over ${MAX_NAME_LENGTH} characters`)
    .required('Name is required')
});

const CreateNewCharacter = ({ onCharacterCreated }) => {
    const { characters, createCharacter } = useContext(CharacterContext);

    return (
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if(characters[values.name]) {
                alert("Character already exists")
                setSubmitting(false);
                return
            }
            createCharacter({ name: values.name })
            setSubmitting(false);

            alert(`Character ${values.name} created!`)

            onCharacterCreated && onCharacterCreated()
          }}
        >
          {({ isSubmitting }) => (
            <Form>
                <VStack gap={20}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <Field type="text" name="name" />
                        <ErrorMessage className={style({color: 'red', fontSize: "12px"})} name="name" component={'p'} />
                    </div>
            
                    <button type="submit" disabled={isSubmitting}>
                        Create
                    </button>
                </VStack>
            </Form>
          )}
        </Formik>
    );
}

export default CreateNewCharacter;