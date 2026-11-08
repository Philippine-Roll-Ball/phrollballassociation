// import { usePersonalDetails  } from "@/hook/usePersonalDetails";
// import { User } from "@/types/user";

// interface Props {
//     formData: User,
//     onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
//     setFormData: React.Dispatch<React.SetStateAction<User>>;
//     }

//  export const PersonalDetailsStep = ({ formData, onChange, setFormData }: Props) => {
//     const { handleBirthDateChange } = usePersonalDetails(setFormData);

//     return ( 
//         <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
//               <h2 className="text-lg font-semibold border-b pb-2">Step 1: Personal Details</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium">First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     required
//                     value={formData.firstName}
//                     onChange={onChange}
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                     placeholder="Juan"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">Middle Name</label>
//                   <input
//                     type="text"
//                     name="middleName"
//                     required
//                     value={formData.middleName}
//                     onChange={onChange}
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                     placeholder="Santos"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium">Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     required
//                     value={formData.lastName}
//                     onChange={onChange}
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                     placeholder="Dela Cruz"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">Birthdate</label>
//                   <input
//                     type="date"
//                     name="birthDate"
//                     required
//                     value={formData.birthDate}
//                     onChange={handleBirthDateChange}
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium">Age</label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={formData.age}
//                     readOnly
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium">Nationality</label>
//                   <input
//                     type="text"
//                     name="nationality"
//                     required
//                     value={formData.nationality}
//                     onChange={onChange}
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                     placeholder="Filipino"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">Sex</label>
//                   <select
//                     name="sex"
//                     required
//                     value={formData.sex}
//                     onChange={onChange}
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                   >
//                     <option value="" disabled>Select Sex</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium">Educational Attainment</label>
//                   <select
//                     name="educationalAttainment"
//                     required
//                     value={formData.educationalAttainment}
//                     onChange={onChange}
//                     className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
//                   >
//                     <option value="" disabled>Select</option>
//                     <option value="College Graduate">College Graduate</option>
//                     <option value="Undergraduate">Undergraduate</option>
//                     <option value="Senior High-School">Senior High-School</option>
//                     <option value="Junior High-School">Junior High-School</option>
//                     <option value="Elementary">Elementary</option>
//                     <option value="Not Applicable">Not Applicable</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//     );
//  }


    