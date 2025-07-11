import { useEffect } from 'react';

const PasswordStrengthInput = () => {
  useEffect(() => {
    import('preline');
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
      <div className="flex mb-2">
        <div className="flex-1">
          <input
            type="password"
            id="hs-strong-password-with-indicator-and-hint"
            className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-md sm:text-sm focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
          <div
            id="hs-strong-password"
            data-hs-strong-password={`{
              "target": "#hs-strong-password-with-indicator-and-hint",
              "hints": "#hs-strong-password-hints",
              "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1"
            }`}
            className="flex mt-2 -mx-1"
          ></div>
        </div>
      </div>

      <div id="hs-strong-password-hints" className="mb-3">
        <div>
          <span className="text-sm text-gray-800 dark:text-neutral-200">Level:</span>
          <span
            data-hs-strong-password-hints-weakness-text='["Empty", "Weak", "Medium", "Strong", "Very Strong", "Super Strong"]'
            className="text-sm font-semibold text-gray-800 dark:text-neutral-200"
          ></span>
        </div>

        <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
          Your password must contain:
        </h4>

        <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
          {[
            { rule: 'min-length', text: 'Minimum number of characters is 6.' },
            { rule: 'lowercase', text: 'Should contain lowercase.' },
            { rule: 'uppercase', text: 'Should contain uppercase.' },
            { rule: 'numbers', text: 'Should contain numbers.' },
            { rule: 'special-characters', text: 'Should contain special characters.' },
          ].map(({ rule, text }, i) => (
            <li
              key={i}
              data-hs-strong-password-hints-rule-text={rule}
              className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
            >
              <span className="hidden" data-check="">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span data-uncheck="">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthInput;
