import { usePasswordWizard } from '@context/PasswordWizardContextProvider';

export default function DecisionNotification() {
  const { setActiveStage, setPasswordAccepted } = usePasswordWizard();

  return (
    <div>
      <div className='text-center text-sm leading-6'>
        Daha güçlü bir parola oluşturmak güvenliğinizi artırır. Devam etmek istiyor musunuz?
      </div>

      <div className='align-center mt-8 flex justify-center gap-12'>
        <button
          type='button'
          className='text-[var(--secondary)]'
          onClick={() => {
            setActiveStage(3);
            setPasswordAccepted(true);
          }}
        >
          Hayır
        </button>

        <button type='button' className='text-[var(--success)]' onClick={() => setActiveStage(4)}>
          Evet
        </button>
      </div>
    </div>
  );
}
