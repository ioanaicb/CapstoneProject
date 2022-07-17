import { useContext, useState } from "react";
import {signInWithGooglePopup,signInAuthWithEmailAndPassword, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import {FormInput} from "../form-input/form-input.component"
import "./sign-in-form.style.scss"
import {Button} from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

const SignInForm = () => {
    const defaultFormFields = {
        email:'',
        password:'',
    };
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const { setCurrentUser } = useContext(UserContext);
   
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        // confirm that the pass match
        try{
            const response = await signInAuthWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(e){
            switch(e.code){
                case 'auth/wrong-password':alert('incorrect password');
                    break;
                case 'auth/user-not-found':alert('No user associated with this email');
                    break;
                default:
                    console.log('No error');
                    break;
            }
          
        }
    }
    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }
    const singInWithGoogle = async() =>{
        const {user} = await signInWithGooglePopup();
        const userDocREf = await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }
    return(
        <div className="sing-up-container">
            <h2>Already have an account</h2>
            <form onSubmit={handleSubmit}>

                <FormInput label = "Email" type="email" required onChange={handleChange} name = 'email' value = {email}/>
                <FormInput label = "Password" type="password" required onChange={handleChange} name = 'password' value = {password}/>
                <div className="button-contain">
                <Button buttonType="inverted" type="submit">Sign In</Button>
                
                <Button type='button' buttonType="google" onClick={singInWithGoogle}>Sign In Google</Button>
                </div>
            </form>
        </div>
    )
}
export {SignInForm};