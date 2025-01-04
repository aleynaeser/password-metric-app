'use client';

import { useState } from 'react';
import { Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import PasswordInput from './PasswordInput';
import FeedbackAnalysis from './FeedbackAnalysis';

export default function PasswordWizardForm() {
  const [activeStage, setActiveStage] = useState(1);

  const onSubmit = (values: TPasswordForm) => {
    console.log('onSubmit', values);
    setActiveStage(activeStage + 1);
  };

  return (
    <Formik
      initialValues={{
        password1: '',
        password2: '',
        password3: '',
      }}
      onSubmit={onSubmit}
    >
      {({ values, resetForm }) => {
        console.log(values);

        return (
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeStage}
              initial={{ x: 5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {activeStage === 4 ? (
                <FeedbackAnalysis />
              ) : (
                <Form className='flex gap-4'>
                  <PasswordInput activeStage={activeStage} />

                  <motion.button
                    type='submit'
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]'
                  >
                    <Image src='/images/chevron-right.png' alt='İleri' width={20} height={20} />
                  </motion.button>
                </Form>
              )}
            </motion.div>

            {activeStage !== 4 && (
              <button
                type='reset'
                className='text-xs text-[var(--secondary)]'
                onClick={() => {
                  resetForm();
                  setActiveStage(1);
                }}
              >
                Sıfırla
              </button>
            )}
          </AnimatePresence>
        );
      }}
    </Formik>
  );
}
