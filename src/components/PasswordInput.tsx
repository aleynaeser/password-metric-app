import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { motion } from 'framer-motion';
import { requirementLabels } from '@constants/password-requirements';
import { ErrorMessage, Field, getIn, useFormikContext } from 'formik';
import { DiversityType, passwordStrength } from 'check-password-strength';
import { usePasswordWizard } from '@context/PasswordWizardContextProvider';
import PasswordStrengthBar from 'react-password-strength-bar';

export default function PasswordInput() {
  const { activeStage, userStats, startTime, metrics, updateStats, setMetrics, setStartTime } = usePasswordWizard();
  const { values, setFieldValue, setFieldTouched } = useFormikContext<TPasswordForm>();

  const passwordName = `password${activeStage}`;
  const currentPassword = useMemo(() => getIn(values, passwordName), [passwordName, values]);

  const placeholder = ['Parola oluştur', 'Parola gereksinimlerine göre oluştur', 'Parola güçlendir'];

  const handleFocus = () => {
    if (!startTime) {
      const start = DateTime.now();
      setStartTime(start);
    }
  };

  console.log(userStats);

  const handleBlur = () => {
    setFieldTouched(passwordName, true);

    updateStats({
      time: userStats.times[activeStage - 1],
      attempt: userStats.attempts[activeStage - 1] + 1,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFieldValue(passwordName, value);
    setMetrics(passwordStrength(value));

    if (value === '') {
      updateStats({
        time: userStats.times[activeStage - 1],
        attempt: userStats.attempts[activeStage - 1] + 1,
      });
    }
  };

  return (
    <div className='flex w-[350px] flex-col sm:w-[calc(100%-40px)]'>
      <Field
        type='text'
        name={passwordName}
        value={currentPassword ?? ''}
        placeholder={placeholder[activeStage - 1]}
        validate={(value: string) => !value && 'Parola alanı zorunludur.'}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        className='ease h-10 rounded-3xl border border-[var(--accent)] p-3 text-xs outline-none transition delay-150 focus:border-[var(--secondary)]'
      />

      <motion.div className='pl-3 pt-3 text-center text-xs text-[var(--error)]'>
        <ErrorMessage name={passwordName} />
      </motion.div>

      {(activeStage === 2 || activeStage === 4) && (
        <div className='mt-6 flex flex-col gap-2'>
          <div className='text-xs text-[var(--secondary)]'>
            Güçlü bir parola oluşturmak için şu gereksinimleri karşılayın:
          </div>

          {activeStage === 4 && (
            <PasswordStrengthBar password={currentPassword} scoreWords={['Zayıf', 'Orta', 'İyi', 'Güçlü']} />
          )}

          <ul className='mt-4 space-y-2 text-xs'>
            {Object.keys(requirementLabels).map((key) => {
              const requirementKey = key as DiversityType;
              const isValid = metrics?.contains.includes(requirementKey);

              return (
                <li
                  key={key}
                  className={`flex items-center gap-2 ${isValid ? 'text-[var(--success)]' : 'text-[var(--neutral)]'}`}
                >
                  <motion.span
                    initial={{ scale: 0.5 }}
                    animate={{ scale: isValid ? 1.2 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`inline-block h-3 w-3 rounded-full ${isValid ? 'bg-[var(--success)]' : 'border border-[var(--neutral)]'}`}
                  ></motion.span>
                  {requirementLabels[requirementKey]}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
