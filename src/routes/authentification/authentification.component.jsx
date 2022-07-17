
import { 
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
 } from "../../utils/firebase/firebase.utils";
import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";
import { SignInForm } from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'


const Authentification = ()=>
{
    const logGoogleUser = async() =>{
        const {user} = await signInWithGooglePopup();
        const userDocREf = await createUserDocumentFromAuth(user);
        console.log(userDocREf);
    }
    const logWithGoogleRedirect = async () => {
    const {user} = await signInWithGoogleRedirect();
    console.log(user);
}
    return(
        <div className="authetication-container">
            <SignInForm/>
            <SignUpForm />
        </div>
    );
};
export {Authentification};