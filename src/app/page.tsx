import Image from 'next/image';
import PasswordWizardForm from '@components/PasswordWizardForm';

export default async function PasswordMetricApp() {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-16 p-8'>
      <div className='flex flex-col items-center gap-6'>
        <Image src='/images/logo.png' alt='Password Metric' width={80} height={80} className='rounded-full' />

        <div className='text-2xl'>
          <strong>Password </strong>
          <span className='font-light'>Metric</span>
        </div>

        <div className='flex max-w-lg flex-col gap-2 text-center text-xs leading-6 text-[var(--secondary)]'>
          Bu uygulama, kullanıcıların bilişsel parola eğilimlerini analiz eden ve güçlü-zayıf şifre ayrımını değerlendirerek
          kullanıcıya öneriler sunan bir web tabanlı sistem geliştirmeyi amaçlamaktadır.
        </div>
      </div>

      <PasswordWizardForm />
    </div>
  );
}
