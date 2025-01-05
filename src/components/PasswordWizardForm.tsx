'use client';

import { Fragment } from 'react';
import { Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { usePasswordMetric } from '@hooks/usePasswordMetric';
import { usePasswordWizard } from '@/context/PasswordWizardContextProvider';
import Image from 'next/image';
import PasswordInput from './PasswordInput';
import PasswordAnalysis from './PasswordAnalysis';
import DecisionNotification from './DecisionNotification';

export default function PasswordWizardForm() {
  const { extractFeatures } = usePasswordMetric();
  const { metrics, stages, activeStage, passwordAccepted, setStages, setActiveStage, setMetrics, setPasswordAccepted } =
    usePasswordWizard();

  const onSubmit = async (values: TPasswordForm) => {
    const currentPassword = values[`password${activeStage}` as keyof TPasswordForm];

    if (metrics) {
      if (activeStage === 4) {
        setPasswordAccepted(true);
        setActiveStage(3);
      } else {
        setActiveStage(activeStage + 1);
      }

      const result = await extractFeatures(currentPassword, metrics, activeStage);
      const newStages = [...stages, result];

      setStages(newStages);
      setMetrics(undefined);
    }
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
      {({ resetForm }) => {
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
                  passwordAccepted ? (
                    <PasswordAnalysis />
                  ) : (
                    <DecisionNotification />
                  )
                ) : (
                  <Form className='flex justify-center gap-4'>
                    <PasswordInput />

                    <motion.button
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
                  setStages([]);
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
