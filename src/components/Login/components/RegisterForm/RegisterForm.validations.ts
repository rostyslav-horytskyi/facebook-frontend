import * as Yup from 'yup';

export const registerValidation = Yup.object({
  first_name: Yup.string()
    .required("What's your First name?")
    .min(2, 'First name must be between 2 and 16 characters.')
    .max(16, 'First name must be between 2 and 16 characters.')
    .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
  last_name: Yup.string()
    .required("What's your Last name?")
    .min(2, 'Last name must be between 2 and 16 characters.')
    .max(16, 'Last name must be between 2 and 16 characters.')
    .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email('Enter a valid email address.'),
  password: Yup.string()
    .required(
      'Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).'
    )
    .min(6, 'Password must be at least 6 characters.')
    .max(36, "Password can't be more than 36 characters"),
  bDay: Yup.number().required('Day is required'),
  bMonth: Yup.number().required('Month is required'),
  bYear: Yup.number()
    .required('Year is required')
    .test(
      'age',
      'You must be older than 14 and younger than 70 years',
      function checkAge() {
        const { bDay, bMonth, bYear } = this.parent;
        const birthDate = new Date(bYear, bMonth - 1, bDay);
        const today = new Date();
        const minAge = new Date(
          today.getFullYear() - 14,
          today.getMonth(),
          today.getDate()
        );
        const maxAge = new Date(
          today.getFullYear() - 70,
          today.getMonth(),
          today.getDate()
        );
        return birthDate <= minAge && birthDate >= maxAge;
      }
    ),
  gender: Yup.string().required(
    'Please choose a gender. You can change who can see this later.'
  ),
});
