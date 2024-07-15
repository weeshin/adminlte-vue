export interface FormField {
    type: string;
    label: string;
    model: string;
    options?: { value: string | number; text: string }[];
}
  
export interface FormConfig {
    title: string;
    fields: FormField[];
}
  
// Example configuration
export const userFormConfig: FormConfig = {
    title: 'User Form',
    fields: [
        { type: 'text', label: 'Username', model: 'username' },
        { type: 'email', label: 'Email', model: 'email' },
        { type: 'password', label: 'Password', model: 'password' },
        {
            type: 'select',
            label: 'Role',
            model: 'role',
            options: [
                { value: 'admin', text: 'Admin' },
                { value: 'user', text: 'User' }
            ]
        }
    ]
};
  