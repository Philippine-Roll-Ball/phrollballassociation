// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { User } from "@/types/user";
// import { AddressStep } from "@/components/AddressStep";
// import { RoleStep } from "@/components/RoleStep";
// import { usePlayer, useLogin } from "@/hook/utilizeUser";;
// // import { usePlayer } from "@/hook/usePlayer";
// // import { useAuth } from "@/hook/useAuth";
// // import { registerUser } from "@/services/apiService"; 

// export default function Register() {
//   const [step, setStep] = useState(1);
  
//   const [error, setError] = useState<string | null>(null);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { registerPlayerAsync, isRegistering } = usePlayer();
//   const { loginUser } = useLogin();

//   // const { registerPlayer, isPending } = usePlayer();

//   const [formData, setFormData] = useState<User>({
//     Uid: "",
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     birthDate: "",
//     age: "",
//     nationality: "",
//     educationalAttainment: "",
//     occupation: "",
//     sex: "",
//     ContactNumber: "",
//     region: "",
//     province: "",
//     city: "",
//     barangay: "",
//     role: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     Address: "",
//   });


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
 

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     if (step < 4) {
//       nextStep();
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }
//     try {
//       // Replace with actual API Call
//       const {
//         region, province, city, barangay, ...rest
//       } = formData;

//       const fullAddress = [barangay, city, province, region].filter(Boolean).join(", ");  
//       const payload = {...rest, Address: fullAddress };
      
//       // Upon successful registration call the login service and issue a token to the user that will be check by the server
     
//       await registerPlayerAsync(payload as User);
//       console.log("Registered successfully!", payload);

      
//       await loginUser(payload.email, payload.password);
//       //NEED TO UNCOMMENT THIS IF AUTHENTICATION IS IMPLEMENTED
//       //window.location.href("/home")

//       // Redirect after success
//       // window.location.href = "/admin";
//     } catch (err) {
//       console.error("Registration failed", err);
//       setError("An error occurred during registration. Please try again.");
//     } 
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-muted/30 py-8 px-4">
//       <div className="w-full max-w-lg bg-card border border-border rounded-xl p-8 shadow-sm">

//         <div className="text-center mb-2">
//           <h1 className="font-display text-4xl">Be a Member</h1>
//           <p className="text-md text-muted-foreground mt-2">
//             Join the Roll Ball Federation and be part of our growing community!
//           </p>
//         </div>

//         <div className="flex justify-between items-center mb-4 px-2">
//           {[1, 2, 3, 4].map((item) => (
//             <div key={item} className="flex items-center">
//               <div
//                 className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold transition-colors duration-300 ${step >= item
//                     ? "bg-primary text-primary-foreground border-primary"
//                     : "border-muted text-muted-foreground"
//                   }`}
//               >
//                 {item}
//               </div>
//               {item < 4 && (
//                 <div
//                   className={`h-1 w-10 sm:w-16 mx-2 rounded transition-colors duration-300 ${step > item ? "bg-primary" : "bg-muted"
//                     }`}
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         {error && (
//           <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {step === 1 && ( <PersonalDetailsStep formData={formData}  onChange={handleChange} setFormData={setFormData}/> )}
//           {step === 2 && ( <AddressStep formData={formData} setFormData={setFormData} onChange={handleChange}/> )}
//           {step === 3 && ( <RoleStep formData={formData} onChange={handleChange} /> )}
//           {step === 4 && ( <AccountCredentialsStep formData={formData} onChange={handleChange} showPassword={showPassword} showConfirmPassword={showConfirmPassword} setShowPassword={setShowPassword} setShowConfirmPassword={setShowConfirmPassword} /> )}
//           <div className="flex gap-4 pt-4">
//             {step > 1 && (
//               <Button type="button" variant="outline" className="w-full" onClick={prevStep}>
//                 Back
//               </Button>
//             )}
//             <Button type="submit" className="w-full" disabled={isRegistering}>
//               {step < 4 ? "Next Step" : (isRegistering ? "Submitting..." : "Complete Registration")}
//             </Button>
//           </div>
//         </form>

//         <p className="text-xs text-muted-foreground text-center mt-6">
//           Already have an Account? <a href="/login" className="text-primary underline hover:text-primary/90">Login here</a>
//         </p>
//       </div>
//     </div>
//   );
// }