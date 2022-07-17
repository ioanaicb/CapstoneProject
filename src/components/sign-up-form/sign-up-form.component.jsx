import { useContext, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import {FormInput} from "../form-input/form-input.component"
import "./sign-up-form.style.scss"
import {Button} from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

const SignUpForm = () => {
    const defaultFormFields = {
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    };
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        // confirm that the pass match
        if(password !== confirmPassword){
            alert('Passwords do not match');
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();
        }catch(e){
            if(e.code === 'auth/email-already-in-use')
            {
                alert('cannot create user, email already in use');
            }
        }
    }
    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }
    return(
        <div className="sing-up-container">
            <h2>Don't have an account</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label = "Display name" type="text" required onChange={handleChange} name='displayName' value = {displayName}/>

                <FormInput label = "Email" type="email" required onChange={handleChange} name = 'email' value = {email}/>
                <FormInput label = "Password" type="password" required onChange={handleChange} name = 'password' value = {password}/>

                <FormInput label = "Confirm Password" type="password" required onChange={handleChange} name = 'confirmPassword' value = {confirmPassword}/>
                <Button buttonType="inverted" type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export {SignUpForm};