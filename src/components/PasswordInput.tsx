import { useState } from 'react';
import { motion } from 'framer-motion';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import Image from 'next/image';
import classNames from 'classnames';

interface IPasswordInput {
  activeStage: number;
}

export default function PasswordInput({ activeStage }: IPasswordInput) {
  const { setFieldValue } = useFormikContext<TPasswordForm>();

  let strength = 0;
  const [showPassword, setShowPassword] = useState(true);
  const [requirements, setRequirements] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const requirementLabels = {
    minLength: 'En az 8 karakter',
    lowercase: 'En az bir küçük harf',
    uppercase: 'En az bir büyük harf',
    number: 'En az bir rakam',
    special: 'En az bir özel karakter',
  };

  const passwordName = `password${activeStage}`;
  const placeholder = ['Parola oluştur', 'Parola gereksinimlerine göre oluştur', 'Parola güçlendir'];

  return (
    <div className='flex w-[350px] flex-col sm:w-[calc(100%-40px)]'>
      <div className='relative flex flex-col gap-2'>
        <Field
          name={passwordName}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder[activeStage - 1]}
          validate={(value: string) => !value && 'Parola alanı zorunludur.'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const minLength = value.length >= 8;
            const lowercase = /[a-z]/.test(value);
            const uppercase = /[A-Z]/.test(value);
            const number = /[0-9]/.test(value);
            const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

            setFieldValue(passwordName, value);
            setRequirements({ minLength, lowercase, uppercase, number, special });
          }}
          className='ease h-10 rounded-3xl border border-[var(--accent)] p-3 text-xs outline-none transition delay-150 focus:border-[var(--secondary)]'
        />

        <Image
          alt='eye'
          width={16}
          height={16}
          className='absolute right-4 top-3 cursor-pointer'
          src={`/images/${showPassword ? 'eye' : 'eye-off'}.png`}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <motion.div className='pl-3 pt-3 text-center text-xs text-[var(--error)]'>
        <ErrorMessage name={passwordName} />
      </motion.div>

      {(activeStage === 2 || activeStage === 4) && (
        <div className='mt-6 flex flex-col gap-2'>
          <div className='text-xs text-[var(--secondary)]'>
            Güçlü bir parola oluşturmak için şu gereksinimleri karşılayın:
          </div>

          {activeStage === 4 && (
            <div className='relative h-4 w-full rounded bg-gray-200'>
              <div
                className={classNames('h-4 rounded', {
                  'bg-[var(--error)]': strength === 0,
                  'bg-[var(--warning)]': strength === 1,
                  'bg-[var(--success)]': strength === 2,
                })}
                style={{ width: `${(strength + 1) * 33.33}%` }}
              />
            </div>
          )}

          <ul className='mt-4 space-y-2 text-xs'>
            {Object.keys(requirementLabels).map((key) => {
              const requirementKey = key as keyof typeof requirements;
              const isValid = requirements[requirementKey];

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
