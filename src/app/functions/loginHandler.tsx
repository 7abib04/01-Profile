'use client'




export const HandleLogin = async (e: React.FormEvent<HTMLFormElement> , router: ReturnType<typeof import("next/navigation").useRouter> , setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  e.preventDefault();
  
  const formData = new FormData(e.currentTarget);
  const user = formData.get('user') as string;
  const password = formData.get('password') as string;
  const credentials = btoa(`${user}:${password}`);
  try {
    const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    });
    if (!response.ok) {
      console.log(response.status);
      setError("Login failed. Check your username/e-mail or password.");
    } else {
      const token = await response.json();
      localStorage.removeItem("jwt")
      localStorage.setItem('jwt', token);
      router.push('/profile'); 
    }
  } catch (error) {
    console.error("error: ", error);
  }
};

