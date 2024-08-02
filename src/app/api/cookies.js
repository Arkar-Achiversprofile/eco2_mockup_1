// "use server"
// import { cookies } from "next/headers";

// export async function GetCookies(name) {
//   const cookieStore = cookies();
//   const data = cookieStore.get(name)
//   console.log('data', data)
//   if (data) {
//     return data.value 
//   } else {
//     return ""
//   }
  
// }

// export async function SetCookies(name, value) {
//     cookies().set(name, value);
// }

// export async function DeleteCookies(name) {
//     cookies().delete(name);
// }