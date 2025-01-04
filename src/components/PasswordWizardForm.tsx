'use client';

import { Form, Formik } from 'formik';
import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import PasswordInput from './PasswordInput';
import FeedbackAnalysis from './FeedbackAnalysis';
import DecisionNotification from './DecisionNotification';

export default function PasswordWizardForm() {
  const [activeStage, setActiveStage] = useState(1);
  const [stages, setStages] = useState<TStage[]>([]);
  const [acceptedPassword, setAcceptedPassword] = useState(false);

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
          <Fragment>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeStage}
                initial={{ x: 5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -5, opacity: 0 }}
                className='w-full'
                transition={{ duration: 0.15 }}
              >
                {activeStage === 3 ? (
                  stages[2].strength === 2 && acceptedPassword ? (
                    <FeedbackAnalysis />
                  ) : (
                    <DecisionNotification setActiveStage={setActiveStage} setAcceptedPassword={setAcceptedPassword} />
                  )
                ) : (
                  <Form className='flex justify-center gap-4'>
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
            </AnimatePresence>

            {activeStage !== 3 && (
              <button
                type='reset'
                className='py-16 text-xs text-[var(--secondary)]'
                onClick={() => {
                  resetForm();
                  setActiveStage(1);
                }}
              >
                Sıfırla
              </button>
            )}
          </Fragment>
        );
      }}
    </Formik>
  );
}
