// import { User } from "@/types/user";
// import { Eye, EyeOff } from "lucide-react";

// interface Props {
//     formData: User;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     showConfirmPassword: boolean;
//     showPassword: boolean;
//     setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
//     setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const AccountCredentialsStep = ({ formData, onChange, showPassword, showConfirmPassword, setShowPassword, setShowConfirmPassword } : Props) => {



//     return (
//         <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
//               <h2 className="text-lg font-semibold border-b pb-2">Step 4: Account Credentials</h2>
//               <div>
//                 <label className="text-sm font-medium">Password</label>
//                 <div className="relative mt-1">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     required
//                     value={formData.password}
//                     onChange={onChange}
//                     className="w-full px-3 py-2 pr-10 border rounded-lg bg-background"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium">Confirm Password</label>
//                 <div className="relative mt-1">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={onChange}
//                     className="w-full px-3 py-2 pr-10 border rounded-lg bg-background"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
//                     aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//     );
// }