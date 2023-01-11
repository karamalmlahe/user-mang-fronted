export const errors = {
  required: (field: string) => `${field} is  mandatory`,
  minlength: (field: string, min: number) =>
    `${field} most be longer than ${min} chars`,
  email: () => `Enter a valid email `,
  containUpperCase: (field: string) =>
    `${field} most be contain uppercase char`,
  containLowerCase: (field: string) =>
    `${field} most be contain lowercase char`,
  containCustomSymbols: (field: string) => `${field} most be contain !,-,@`,
  containNumber: (field: string) => `${field} most be contain number`,
  PasswordsNotMatch: () => `Passwords do not match`,
  // username:{
  //     required:(params:string)=> `${params}This field is required`
  // }
};
