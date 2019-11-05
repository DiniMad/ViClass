// This function will returns nameAndFamily if it's not null, otherwise returns email
export const nameOrEmail = ({nameAndFamily, email}) => nameAndFamily
                                                       ? nameAndFamily
                                                       : email;
